<?php

namespace App\Http\Controllers;

use App\Models\InventoryProduct;
use App\Http\Resources\InventoryProductCollection;
use App\Http\Resources\InventoryProductResource;
use Illuminate\Http\Request;

class InventoryProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //return all inventory products in json
        return new InventoryProductCollection(InventoryProduct::all());
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
        $inventoryProduct = InventoryProduct::create($request->all());
        return new InventoryProductResource($inventoryProduct);
    }

    /**
     * Display the specified resource.
     */
    public function show(InventoryProduct $inventoryProduct)
    {
        return new InventoryProductResource($inventoryProduct);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(InventoryProduct $inventoryProduct)
    {
        return new InventoryProductResource($inventoryProduct);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, InventoryProduct $inventoryProduct)
    {
        $inventoryProduct->update($request->all());

        return new InventoryProductResource($inventoryProduct);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(InventoryProduct $inventoryProduct)
    {
        $inventoryProduct->delete();

        return new InventoryProductCollection(InventoryProduct::all());
    }
}
