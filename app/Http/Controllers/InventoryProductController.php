<?php

namespace App\Http\Controllers;

use App\Models\InventoryProduct;
use App\Http\Resources\InventoryProductCollection;
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
        return InventoryProduct::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(InventoryProduct $inventoryProduct)
    {
        return $inventoryProduct;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(InventoryProduct $inventoryProduct)
    {
        return $inventoryProduct;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, InventoryProduct $inventoryProduct)
    {
        $inventoryProduct->update($request->all());

        return $inventoryProduct;
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
