<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvoiceItemsTable extends Migration
{
    public function up()
    {
        Schema::create('invoice_items', function (Blueprint $table) {
			$table->id();
			$table->unsignedBigInteger('invoice_id');
			$table->unsignedBigInteger('product_id');
			$table->unsignedBigInteger('product_price_id');
			$table->double('product_price');
			$table->double('quantity');
			$table->string('unit',40);
			$table->double('item_discount');
			$table->string('discount_approval_status',40)->nullable();
			$table->unsignedBigInteger('approved_by')->nullable();
			$table->double('total_price');
			$table->unsignedBigInteger('source_inventory');
        });
    }

    public function down()
    {
        Schema::dropIfExists('invoice_items');
    }
}