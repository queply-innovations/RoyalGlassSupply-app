<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use App\Http\Resources\InventoryCollection;
use App\Http\Resources\InventoryResource;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //return all inventories in json
        return new InventoryCollection(Inventory::all());
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
        $inventory = Inventory::create($request->all());

        return new InventoryResource($inventory);
    }

    /**
     * Display the specified resource.
     */
    public function show(Inventory $inventory)
    {
        return new InventoryResource($inventory);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Inventory $inventory)
    {
        return new InventoryResource($inventory);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Inventory $inventory)
    {
        $inventory->update($request->all());

        return new InventoryResource($inventory);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Inventory $inventory)
    {
        $inventory->delete();
        
        return new InventoryCollection(Inventory::all());
    }

    /**
     * Display the specified resource.
     */
    public function showItems($id)
    {
        return new InventoryResource(
            Inventory::with('inventoryProducts')->findOrFail($id));
    }
}
