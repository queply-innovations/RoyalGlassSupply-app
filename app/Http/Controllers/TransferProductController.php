<?php

namespace App\Http\Controllers;

use App\Models\TransferProduct;
use App\Http\Resources\TransferProductCollection;
use App\Http\Resources\TransferProductResource;
use Illuminate\Http\Request;

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
        $transferProduct->update($request->all());

        return new TransferProductResource($transferProduct);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TransferProduct $transferProduct)
    {
        $transferProduct->delete();

        return new TransferProductCollection(TransferProduct::all());
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
}
