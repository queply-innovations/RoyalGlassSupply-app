<?php

namespace App\Http\Controllers;

use App\Models\ReturnTransactionItem;
use App\Http\Resources\ReturnTransactionItemCollection;
use Illuminate\Http\Request;

class ReturnTransactionItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //return all return transaction items in json
        return new ReturnTransactionItemCollection(ReturnTransactionItem::all());
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
        return ReturnTransactionItem::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(ReturnTransactionItem $returnTransactionItem)
    {
        return $returnTransactionItem;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ReturnTransactionItem $returnTransactionItem)
    {
        return $returnTransactionItem;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ReturnTransactionItem $returnTransactionItem)
    {
        $returnTransactionItem->update($request->all());

        return $returnTransactionItem;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ReturnTransactionItem $returnTransactionItem)
    {
        $returnTransactionItem->delete();

        return new ReturnTransactionItemCollection(ReturnTransactionItem::all());
    }

    /**
     * Display a listing of the filtered collection.
     */
    public function searchFilterAndSort(Request $request)
    {

        //returns a filtered list of items of a particular return transaction
        $query = ReturnTransactionItem::where('return_transaction_id', $request->return_transaction_id);

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

        return new ReturnTransactionItemCollection($query->get());
    }
}
