<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductCollection;
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
        $markupPrice = $request->markup_price;
        $capitalPrice = $request->capital_price ?? $productPrice->capital_price;
        $cost = $capitalPrice + $markupPrice;

        if(floor($cost) != $cost) {
            $oldCost = $capitalPrice + $markupPrice;
            $cost = round($cost);
            $markupPrice = $markupPrice + ($cost - $oldCost);
        }
        
        $price = $cost - $productPrice->sale_discount;

        $data = [
            ...$request->except(['capital_price', 'markup_price', 'price']),
            'markup_price' => $markupPrice,
            'cost' => $cost,
            'price' => $price
        ];

        $productPrice->update($data);

        return new ProductPriceResource($productPrice);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductPrice $productPrice)
    {
        $productPrice->inventoryProduct->delete();
        $productPrice->delete();
        
        return $this->sendSuccess('Product removed successfully');
    }

    /**
     * Display a listing of the filtered collection.
     */
    public function searchFilterAndSort(Request $request)
    {
        $query = ProductPrice::query()
            ->with(['inventoryProduct.inventory'])
            ->when($request->has('filter.warehouse_id'), function($q) use($request) {
                $q->whereHas('inventoryProduct.inventory', function($q) use($request) {
                    $q->where('warehouse_id', $request->filter['warehouse_id']);
                });
            });

        if(!empty($request->search)){
            foreach($request->search as $search_key => $search_value){
                $query->where($search_key, 'like', '%'.$search_value.'%');
            }
        }
        
        if(!empty($request->filter)){
            foreach($request->filter as $filter_key => $filter_value){
                if($filter_key != 'warehouse_id') {
                    $query->where($filter_key, $filter_value);
                }
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

        $data = $query->paginate($request->input('pageSize', '10'));

        return response()->json($data);
    }

    public function testPaginatePOS(Request $request) {
        $data = ProductPrice::paginate($request->pageSize ?? 10);

        return response()->json($data);
    }
}
