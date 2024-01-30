<?php

namespace App\Http\Controllers;

use App\Models\ProductPrice;
use App\Http\Resources\ProductPriceCollection;
use App\Http\Resources\ProductPriceResource;
use Illuminate\Http\Request;

class ProductPriceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //return all product prices in json
        return new ProductPriceCollection(ProductPrice::all());
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
        $productPrice = ProductPrice::create($request->all());

        return new ProductPriceResource($productPrice);
    }

    /**
     * Display the specified resource.
     */
    public function show(ProductPrice $productPrice)
    {
        return new ProductPriceResource($productPrice);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProductPrice $productPrice)
    {
        return new ProductPriceResource($productPrice);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ProductPrice $productPrice)
    {
        $productPrice->update($request->all());

        return new ProductPriceResource($productPrice);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductPrice $productPrice)
    {
        $productPrice->delete();
        
        return new ProductPriceCollection(ProductPrice::all());
    }
}
