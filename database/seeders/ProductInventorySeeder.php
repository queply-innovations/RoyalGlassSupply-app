<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\InventoryProduct;
use App\Models\Supplier;
use App\Models\ProductPrice;
use App\Models\Inventory;

class ProductInventorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = Product::get();
        $inventory = new Inventory();
        $inventory->code = 'INV-CDO-2024-5';
        $inventory->warehouse_id = 1;
        $inventory->created_by = 1;
        $inventory->date_received = now();
        $inventory->type = 'supplier';
        $inventory->notes = 'data dump';
        $inventory->save();
        foreach($products as $product) {
            $product_price = new ProductPrice();
            $product_price->product_id = $product->id;
            $product_price->unit = 'pcs';
            $product_price->type = '';
            $product_price->stocks_quantity = 100;
            $product_price->stocks_unit = '';
            $product_price->capital_price = 100;
            $product_price->markup_price = 10; // 10% of capital_price
            $product_price->tax_amount = 0;
            $product_price->cost = 110; // capital_price + markup_price
            $product_price->on_sale = 0;
            $product_price->sale_discount = 0;
            $product_price->price = 100;
            $product_price->warehouse_id = 1;
            $product_price->created_by = 1;
            $product_price->approval_status = 'approved';
            $product_price->active_status = 'active';
            $product_price->save();
            $inventory_product = new InventoryProduct();
            $inventory_product->product_id = $product->id;
            $inventory_product->inventory_id = $inventory->id;
            $inventory_product->product_price_id = $product_price->id;
            $inventory_product->supplier_id = Supplier::where('address', 'LIKE', '%Cagayan De Oro%')->get()->first()->id;
            $inventory_product->capital_price = 100;
            $inventory_product->stocks_count = 100;
            $inventory_product->total_count = 100;
            $inventory_product->damage_count = 0;
            $inventory_product->approved_stocks = 100;
            $inventory_product->purchased_stocks = 0;
            $inventory_product->unit = 'pcs';
            $inventory_product->status = 1;
            $inventory_product->save();
        }
    }
}
