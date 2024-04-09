<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductPricesTable extends Migration
{
    public function up()
    {
		if(!Schema::hasTable('product_prices')) {
			Schema::create('product_prices', function (Blueprint $table) {
				$table->id();
				$table->unsignedBigInteger('product_id');
				$table->string('type',40);
				$table->string('unit',40)->default('');
				$table->double('stocks_quantity');
				$table->string('stocks_unit',40)->default('');
				$table->double('capital_price');
				$table->double('markup_price');
				$table->double('tax_amount');
				$table->double('cost');
				$table->boolean('on_sale');
				$table->double('sale_discount');
				$table->double('price');
				$table->unsignedBigInteger('warehouse_id');
				$table->unsignedBigInteger('created_by');
				$table->string('approval_status',40);
				$table->unsignedBigInteger('approved_by')->nullable();
				$table->string('active_status',40)->default('');
				$table->timestamps();
			});
		}
    }

    public function down()
    {
        Schema::dropIfExists('product_prices');
    }
}