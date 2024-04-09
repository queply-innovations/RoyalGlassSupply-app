<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransferProductsTable extends Migration
{
    public function up()
    {
        Schema::create('transfer_products', function (Blueprint $table) {
			$table->id('id');
			$table->unsignedBigInteger('transfer_id');
			$table->unsignedBigInteger('product_id');
			$table->double('capital_price');
			$table->double('bundles_count');
			$table->string('bundles_unit',40)->default('');
			$table->double('quantity_per_bundle');
			$table->double('total_quantity');
			$table->string('unit',40)->default('');
			$table->unsignedBigInteger('source_inventory');
        });
    }

    public function down()
    {
        Schema::dropIfExists('transfer_products');
    }
}