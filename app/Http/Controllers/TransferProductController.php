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
}
