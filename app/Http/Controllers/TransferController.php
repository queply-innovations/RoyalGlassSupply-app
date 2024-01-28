<?php

namespace App\Http\Controllers;

use App\Models\Transfer;
use App\Http\Resources\TransferCollection;
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
        return Transfer::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(Transfer $transfer)
    {
        return $transfer;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Transfer $transfer)
    {
        return $transfer;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Transfer $transfer)
    {
        $transfer->update($request->all());

        return $transfer;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transfer $transfer)
    {
        $transfer->delete();

        return new TransferCollection(Transfer::all());
    }
}
