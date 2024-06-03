<?php

namespace App\Http\Controllers;

use App\Models\TransferProduct;
use App\Http\Resources\TransferProductCollection;
use App\Http\Resources\TransferProductResource;
use App\Models\Transfer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransferProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //return all transfer products in json
        return new TransferProductCollection(TransferProduct::all());
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

            $create = $this->createTransferProduct($request);

            DB::commit();
            return new TransferProductResource($create);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendError($e->getMessage());
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(TransferProduct $transferProduct)
    {
        return new TransferProductResource($transferProduct);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TransferProduct $transferProduct)
    {
        return new TransferProductResource($transferProduct);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TransferProduct $transferProduct)
    {
        try {
            DB::beginTransaction();

            $update = $this->updateTransferProduct($request, $transferProduct);

            DB::commit();
            return new TransferProductResource($update);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendError($e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TransferProduct $transferProduct)
    {
        try {
            DB::beginTransaction();
            
            $this->removeTransferProduct($transferProduct);

            DB::commit();
            return $this->sendSuccess('Removed successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendError($e->getMessage());
        }
    }

    /**
     * Display a listing of the filtered collection.
     */
    public function searchFilterAndSort(Request $request)
    {

        //returns a filtered list of products of a particular transfer
        $query = TransferProduct::where('transfer_id', $request->transfer_id);

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

        return new TransferProductCollection($query->get());
    }

    private function createTransferProduct($request) {
        $check = Transfer::where('id', $request->transfer_id)->exists();

        if(!$check) {
            throw new \Exception('Transfer record does not exists');
        }

        $product = TransferProduct::create([
            'transfer_id' => $request->transfer_id,
            'product_id' => $request->product_id,
            'capital_price' => $request->capital_price,
            'bundles_count' => 0,
            'bundles_unit' => '',
            'quantity_per_bundle' => 0,
            'total_quantity' => $request->total_quantity,
            'unit' => $request->unit,
            'source_inventory' => $request->id
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
        
        return $product;
    }

    private function updateTransferProduct($request, $transferProduct) {
        $stocks = $transferProduct->total_quantity - $request->total_quantity;
        $transferProduct->inventoryProduct->update([
            'stocks_count' => $transferProduct->inventoryProduct->stocks_count + $stocks,
            'total_count' => ($transferProduct->inventoryProduct->stocks_count + $stocks) - $transferProduct->inventoryProduct->damage_count,
            'approved_stocks' => $transferProduct->inventoryProduct->approved_stocks + $stocks
        ]);

        $transferProduct->update($request->all());

        return $transferProduct;
    }

    private function removeTransferProduct($transferProduct) {
        $transferProduct->inventoryProduct->update([
            'stocks_count' => $transferProduct->inventoryProduct->stocks_count + $transferProduct->total_quantity,
            'total_count' => ($transferProduct->inventoryProduct->stocks_count + $transferProduct->total_quantity) - $transferProduct->damage_count,
            'approved_stocks' => $transferProduct->inventoryProduct->approved_stocks + $transferProduct->total_quantity
        ]);

        $transferProduct->delete();
    }
}
