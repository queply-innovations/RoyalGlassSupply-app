<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInventoryProductsTable extends Migration
{
    public function up()
    {
        if(!Schema::hasTable('inventory_products')) {
            Schema::create('inventory_products', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('inventory_id');
                $table->unsignedBigInteger('product_id');
                $table->unsignedBigInteger('supplier_id');
                $table->float('capital_price');
                $table->double('bundles_count');
                $table->string('bundles_unit');
                $table->double('quantity_per_bundle');
                $table->float('stocks_count');
                $table->float('damage_count');
                $table->float('total_count');
                $table->string('unit',40);
            });
        }
    }

    public function down()
    {
        Schema::dropIfExists('inventory_products');
    }
}