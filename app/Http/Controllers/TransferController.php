<?php

namespace App\Http\Controllers;

use App\Models\Transfer;
use App\Http\Resources\TransferCollection;
use App\Http\Resources\TransferResource;
use Illuminate\Http\Request;

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
        $transfer = Transfer::create($request->all());

        return new TransferResource($transfer);
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
}
