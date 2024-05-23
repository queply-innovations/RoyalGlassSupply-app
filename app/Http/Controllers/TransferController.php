<?php

namespace App\Http\Controllers;

use App\Models\Transfer;
use App\Http\Resources\TransferCollection;
use App\Http\Resources\TransferResource;
use App\Models\InventoryProduct;
use App\Models\TransferProduct;
use Illuminate\Http\Request;
use Carbon\Carbon;
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
        $transfer->update($request->all());

        return new TransferResource($transfer);
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
                        'stocks_count' => $inventoryProduct->stocks_count - $product->total_quantity
                    ]);
                } else {
                    if(($inventoryProduct->stocks_count - $product->total_quantity) < $inventoryProduct->purchased_stocks) {
                        throw new \Exception("Product: {$product->product->name} has exceeded the purchased stocks.");
                    }

                    $inventoryProduct->update([
                        'stocks_count' => $inventoryProduct->stocks_count - $product->total_quantity,
                        'approved_stocks' => $inventoryProduct->stocks_count - $product->total_quantity
                    ]);
                }
            } else {
                $inventoryProduct->update([
                    'stocks_count' => $inventoryProduct->stocks_count - $product->total_quantity,
                    'approved_stocks' => $inventoryProduct->approved_stocks - $product->total_quantity
                ]);
            }
        }

        return $transfer;
    }
}
