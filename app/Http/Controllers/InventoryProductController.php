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

            if($request->has('data') && is_array($request->data)) {
                $createdIds = [];
                foreach($request->data as $row) {
                    $inventoryProduct = $this->createInventoryProduct($row);
                    $createdIds[] = $inventoryProduct->id;
                }

                $inventoryProducts = InventoryProduct::whereIn('id', $createdIds)->get();

                $resource = new InventoryProductCollection($inventoryProducts);
            } else {
                $inventoryProduct = $this->createInventoryProduct($request->all());

                $resource = new InventoryProductResource($inventoryProduct);
            }

            DB::commit();
            return $resource;
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
        try {
            DB::beginTransaction();

            $update = $this->updateInventoryProduct($request, $inventoryProduct);
            
            DB::commit();

            return new InventoryProductResource($update);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendError($e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(InventoryProduct $inventoryProduct)
    {
        $inventoryProduct->productPrice->delete();
        $inventoryProduct->delete();

        return $this->sendSuccess('Product successfully removed.');
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
        $inventoryProduct = InventoryProduct::create($request);

        $capitalPrice = $inventoryProduct->capital_price;
        $markupPrice = $capitalPrice * 0.10;
        $cost = $capitalPrice + $markupPrice;

        if(floor($cost) != $cost) {
            $oldCost = $capitalPrice + $markupPrice;
            $cost = round($cost);
            $markupPrice = $markupPrice + ($cost - $oldCost);
        }

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
            'approval_status' => 'approved',
            'active_status' => 'active'
        ];

        $productPrice = ProductPrice::create($productPriceData);

        $inventoryProduct->update([
            'product_price_id' => $productPrice->id
        ]);

        return $inventoryProduct;
    }

    private function updateInventoryProduct($request, $inventoryProduct) {

        if($request->has('capital_price')) {
            $oldCapitalPrice = $inventoryProduct->capital_price;
            $markupPercent = $inventoryProduct->productPrice->markup_price / $oldCapitalPrice;
    
            $inventoryProduct->update($request->all());
    
            $markupPrice = $inventoryProduct->capital_price * $markupPercent;
            $cost = $inventoryProduct->capital_price + $markupPrice;

            if(floor($cost) != $cost) {
                $oldCost = $inventoryProduct->capital_price + $markupPrice;
                $cost = round($cost);
                $markupPrice = $markupPrice + ($cost - $oldCost);
            }

            $price = $cost - $inventoryProduct->productPrice->sale_discount;
    
            $inventoryProduct->productPrice->update([
                'capital_price' => $inventoryProduct->capital_price,
                'markup_price' => $markupPrice,
                'cost' => $cost,
                'price' => $price,
                'approval_status' => 'approved',
                'active_status' => 'active'
            ]);
        } else if($request->has('approved_stocks') && $request->input('approved_stocks') > 0) {
            $approvedStockCount =  $inventoryProduct->approved_stocks + $request->approved_stocks;

            if($approvedStockCount > $inventoryProduct->stocks_count) {
                throw new \Exception('Approved stocks cannot be higher than remaining unapproved stocks count');
            }

            $inventoryProduct->update([
                'approved_stocks' => $approvedStockCount
            ]);
        } else {
            $inventoryProduct->update($request->all());
        }

        return $inventoryProduct;
    }
}
