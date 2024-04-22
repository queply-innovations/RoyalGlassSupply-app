<?php

namespace App\Http\Controllers;

use App\Models\InventoryProduct;
use App\Http\Resources\InventoryProductCollection;
use App\Http\Resources\InventoryProductResource;
use App\Models\ProductPrice;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

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
        try {
            DB::beginTransaction();

            $inventoryProduct = $this->createInventoryProduct($request);

            DB::commit();
            return new InventoryProductResource($inventoryProduct);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => $e->getMessage()], 422);
        }
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

    /**
     * Display a listing of the filtered collection.
     */
    public function searchFilterAndSort(Request $request)
    {

        //returns a filtered list of products of a particular inventory
        $filterByInventory = $request->exists('inventory_id') ? $request->inventory_id : null;

        if($filterByInventory) {
            $query = InventoryProduct::where('inventory_id', $request->inventory_id);
        } else {
            $query = InventoryProduct::query();
        }

        if(!empty($request->search)){
            foreach($request->search as $search_key => $search_value){
                $query->where($search_key, 'like', '%'.$search_value.'%');
            }
        }
        
        if(!empty($request->filter)){
            foreach($request->filter as $filter_key => $filter_value){
                $query->where($filter_key, $filter_value);
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

        return new InventoryProductCollection($query->get());
    }

    /**
     * Display a listing of the filtered collection.
     */
    public function searchFilterAndSortByWarehouse(Request $request)
    {

        //returns a filtered list of products of a particular warehouse and product name
        $query = InventoryProduct::whereHas('inventory', function (Builder $query) use ($request) {
                                    $query->where('warehouse_id', $request->warehouse_id);
                                })
                                ->whereHas('product', function (Builder $query) use ($request) {
                                    $query->where('name', 'like', '%'.$request->product_name.'%');
                                });

        if(!empty($request->search)){
            foreach($request->search as $search_key => $search_value){
                $query->where($search_key, 'like', '%'.$search_value.'%');
            }
        }
        
        if(!empty($request->filter)){
            foreach($request->filter as $filter_key => $filter_value){
                $query->where($filter_key, $filter_value);
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

        return new InventoryProductCollection($query->get());
    }

    private function createInventoryProduct($request) {
        $inventoryProduct = InventoryProduct::create($request->all());

        $capitalPrice = $inventoryProduct->capital_price;
        $markupPrice = $capitalPrice * 0.10;
        $cost = $capitalPrice + $markupPrice;

        $productPriceData = [
            'product_id' => $inventoryProduct->product_id,
            'type' => ' ',
            'unit' => $inventoryProduct->unit,
            'stocks_quantity' => $inventoryProduct->stocks_count,
            'capital_price' => $capitalPrice,
            'markup_price' => $markupPrice,
            'tax_amount' => 0,
            'cost' => $cost,
            'on_sale' => 0,
            'sale_discount' => 0,
            'price' => $cost,
            'warehouse_id' => $inventoryProduct->inventory->warehouse_id,
            'created_by' => auth()->user()->id,
            'approval_status' => $request->status ? 'approved' : 'pending',
            'active_status' => $request->status ? 'active' : 'disabled'
        ];

        $productPrice = ProductPrice::create($productPriceData);

        $inventoryProduct->update([
            'product_price_id' => $productPrice->id
        ]);

        return $inventoryProduct;
    }
}
