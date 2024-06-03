<?php

namespace App\Http\Controllers;

use App\Models\Transfer;
use App\Http\Resources\TransferCollection;
use App\Http\Resources\TransferResource;
use App\Models\Inventory;
use App\Models\InventoryProduct;
use App\Models\TransferProduct;
use App\Models\ProductPrice;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TransferController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //return all transfers in json
        return new TransferCollection(Transfer::all());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            $transfer = $this->createTransfer($request);

            DB::commit();
            return new TransferResource($transfer);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendError($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Transfer $transfer)
    {
        return new TransferResource($transfer);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Transfer $transfer)
    {
        return new TransferResource($transfer);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Transfer $transfer)
    {
        try {
            DB::beginTransaction();

            $update = $this->updateTransfers($request, $transfer);

            DB::commit();
            return new TransferResource($update);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendError($e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transfer $transfer)
    {
        $transfer->delete();

        return new TransferCollection(Transfer::all());
    }

    /**
     * Display the specified resource.
     */
    public function showItems($id)
    {
        return new TransferResource(Transfer::with('transferProducts')->findOrFail($id));
    }

    /**
     * Display a listing of the filtered collection.
     */
    public function searchFilterAndSort(Request $request)
    {
        $query = Transfer::whereNotNull('id');

        if(!empty($request->search)){
            foreach($request->search as $search_key => $search_value){
                $query->where($search_key, 'like', '%'.$search_value.'%');
            }
        }
        
        if(!empty($request->filter)){
            foreach($request->filter as $filter_key => $filter_value){
                $query->where($filter_key, $filter_value);
            }
        }

        if(!empty($request->date_range)){
            foreach($request->date_range as $date_range_key => $date_range_value){
                $query->whereBetween($date_range_key, [$date_range_value['from'].' 00:00:00', $date_range_value['to'].' 23:59:59']);
            }
        }

        if(!empty($request->sort)){
            foreach($request->sort as $sort_key => $sort_value){
                $query->orderBy($sort_key, $sort_value);
            }
        }

        return new TransferCollection($query->get());
    }

    private function createTransfer($request) {
        $transfer = Transfer::create([
            ...$request->except(['transferItems']),
            'approval_status' => 'pending'
        ]);
        $transfer->update([
            'code' => 'TRN-'.Carbon::now()->format('Ymd').'-'.str_pad($transfer->id, 6, 0, STR_PAD_LEFT),
        ]);

        foreach($request->transferItems as $item) {
            $product = TransferProduct::create([
                ...$item,
                'source_inventory' => $item['id'],
                'transfer_id' => $transfer->id
            ]);

            $inventoryProduct = $product->inventoryProduct;

            $remaining_total_stocks = $inventoryProduct->stocks_count - $inventoryProduct->purchased_stocks;

            if($remaining_total_stocks <= 0) {
                throw new \Exception("Product: {$product->product->name} has no available stocks.");
            }

            if($remaining_total_stocks < $product->total_quantity) {
                throw new \Exception("Product: {$product->product->name} has exceeded the available stocks.");
            }

            if($inventoryProduct->stocks_count > $inventoryProduct->approved_stocks) {
                $allowance = $inventoryProduct->stocks_count - $inventoryProduct->approved_stocks;

                if($allowance >= $product->total_quantity ) {
                    $inventoryProduct->update([
                        'stocks_count' => $inventoryProduct->stocks_count - $product->total_quantity,
                        'total_count' => ($inventoryProduct->stocks_count - $product->total_quantity) - $inventoryProduct->damage_count
                    ]);
                } else {
                    if(($inventoryProduct->stocks_count - $product->total_quantity) < $inventoryProduct->purchased_stocks) {
                        throw new \Exception("Product: {$product->product->name} has exceeded the purchased stocks.");
                    }

                    $inventoryProduct->update([
                        'stocks_count' => $inventoryProduct->stocks_count - $product->total_quantity,
                        'total_count' => ($inventoryProduct->stocks_count - $product->total_quantity) - $inventoryProduct->damage_count,
                        'approved_stocks' => $inventoryProduct->stocks_count - $product->total_quantity
                    ]);
                }
            } else {
                $inventoryProduct->update([
                    'stocks_count' => $inventoryProduct->stocks_count - $product->total_quantity,
                    'total_count' => ($inventoryProduct->stocks_count - $product->total_quantity) - $inventoryProduct->damage_count,
                    'approved_stocks' => $inventoryProduct->approved_stocks - $product->total_quantity
                ]);
            }
        }

        return $transfer;
    }

    private function updateTransfers($request, $transfer) {
        if($transfer->approval_status != 'pending') {
            throw new \Exception("Transfer already {$transfer->approval_status}");
        }

        if($request->has('approval_status')) {
            switch($request->approval_status) {
                case 'pending':
                    $transfer->update($request->all());
                    $updateTransfer = $transfer;
                break;
                case 'approved':
                    $updateTransfer = $this->approveTransfer($transfer);
                break;
                case 'denied':
                    $updateTransfer = $this->denyTransfer($transfer);
                break;
                default:
                    throw new \Exception('Invalid approval status');
            }
        } else {
            throw new \Exception('Invalid data.');
        }

        return $updateTransfer;
    }

    private function approveTransfer($transfer) {
        $transfer->update([
            'approval_status' => 'approved',
            'approved_by' => Auth::id(),
            'transfer_status' => 'arrived', // need to clarify
            'date_received' => Carbon::now(), // need to clarify
            'received_by' => Auth::id() // need to clarify
        ]);

        $this->createInventoryProduct($transfer);

        return $transfer;
    }

    private function denyTransfer($transfer) {
        $transfer->update([
            'approval_status' => 'denied',
        ]);

        foreach($transfer->transferProducts as $item) {
            $item->inventoryProduct->update([
                'stocks_count' => $item->inventoryProduct->stocks_count + $item->total_quantity,
                'approved_stocks' => $item->inventoryProduct->stocks_count + $item->total_quantity
            ]);
        }

        return $transfer;
    }

    private function createInventoryProduct($transfer) {
        $destination = $transfer->destinationWarehouse;

        $inventory = Inventory::create([
            'warehouse_id' => $destination->id,
            'created_by' => Auth::id(),
            'date_received' => Carbon::now(), // need to clarify
            'type' => 'transfer',
            'notes' => $transfer->notes,
            'transfer_id' => $transfer->id
        ]);
        $inventory->update([
            'code' => 'INV-'.$destination->code.'-TRA-'.Carbon::now()->format('Ymd').'-'.str_pad($inventory->id, 6, 0, STR_PAD_LEFT)
        ]);

        foreach($transfer->transferProducts as $item) {
            $inventoryProduct = InventoryProduct::create([
                'inventory_id' => $inventory->id,
                'product_id' => $item->product_id,
                'supplier_id' => $item->inventoryProduct->supplier_id,
                'capital_price' => $item->capital_price,
                'stocks_count' => $item->total_quantity,
                'approved_stocks' => $item->total_quantity,
                'damage_count' => 0,
                'total_count' => $item->total_quantity,
                'purchased_stocks' => 0,
                'unit' => $item->unit,
                'status' => true
            ]);

            $capitalPrice = $inventoryProduct->capital_price;
            $markupPrice = round($capitalPrice * ($destination->code == 'ILI' ? 0.15 : 0.10));
            $cost = $capitalPrice + $markupPrice;

            $productPriceData = [
                'product_id' => $inventoryProduct->product_id,
                'type' => ' ',
                'unit' => $inventoryProduct->unit,
                'stocks_quantity' => $inventoryProduct->stocks_count,
                'capital_price' => $capitalPrice,
                'markup_price' => $markupPrice,
                'tax_amount' => 0,
                'cost' => $cost,
                'on_sale' => 0,
                'sale_discount' => 0,
                'price' => $cost,
                'warehouse_id' => $destination->id,
                'created_by' => Auth::id(),
                'approval_status' => 'approved',
                'active_status' => 'active'
            ];
    
            $productPrice = ProductPrice::create($productPriceData);

            $inventoryProduct->update([
                'product_price_id' => $productPrice->id
            ]);
        }
    }
}
