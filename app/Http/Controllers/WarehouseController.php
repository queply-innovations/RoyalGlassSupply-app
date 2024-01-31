<?php

namespace App\Http\Controllers;

use App\Models\Warehouse;
use App\Http\Resources\WarehouseCollection;
use App\Http\Resources\WarehouseResource;
use Illuminate\Http\Request;

class WarehouseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //return all warehouses in json
        return new WarehouseCollection(Warehouse::all());
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
        $warehouse = Warehouse::create($request->all());

        return new WarehouseResource($warehouse);
    }

    /**
     * Display the specified resource.
     */
    public function show(Warehouse $warehouse)
    {
        return new WarehouseResource($warehouse);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Warehouse $warehouse)
    {
        return new WarehouseResource($warehouse);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Warehouse $warehouse)
    {
        $warehouse->update($request->all());

        return new WarehouseResource($warehouse);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Warehouse $warehouse)
    {
        $warehouse->delete();

        return new WarehouseCollection(Warehouse::all());
    }
}
