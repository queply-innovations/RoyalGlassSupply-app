<?php

namespace App\Http\Controllers;

use App\Models\TransferProduct;
use App\Http\Resources\TransferProductCollection;
use App\Http\Resources\TransferProductResource;
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
        $transferProduct = TransferProduct::create($request->all());

        return new TransferProductResource($transferProduct);
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
