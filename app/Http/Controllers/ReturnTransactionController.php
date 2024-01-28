<?php

namespace App\Http\Controllers;

use App\Models\ReturnTransaction;
use App\Http\Resources\ReturnTransactionCollection;
use Illuminate\Http\Request;

class ReturnTransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //return all return transactions in json
        return new ReturnTransactionCollection(ReturnTransaction::all());
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
        return ReturnTransaction::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(ReturnTransaction $returnTransaction)
    {
        return $returnTransaction;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ReturnTransaction $returnTransaction)
    {
        return $returnTransaction;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ReturnTransaction $returnTransaction)
    {
        $returnTransaction->update($request->all());

        return $returnTransaction;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ReturnTransaction $returnTransaction)
    {
        $returnTransaction->delete();

        return new ReturnTransactionCollection(ReturnTransaction::all());
    }
}
