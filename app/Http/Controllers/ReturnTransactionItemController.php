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
}
