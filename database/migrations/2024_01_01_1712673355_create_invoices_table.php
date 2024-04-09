<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvoicesTable extends Migration
{
    public function up()
    {
		if(!Schema::hasTable('invoices')) {
			Schema::create('invoices', function (Blueprint $table) {
				$table->id();
				$table->string('code', 50)->default('');
				$table->unsignedBigInteger('customer_id');
				$table->unsignedBigInteger('warehouse_id');
				$table->unsignedBigInteger('issued_by');
				$table->string('type', 40)->default('');
				$table->string('payment_method', 40)->default('');
				$table->string('reference_no', 40)->nullable();
				$table->double('subtotal');
				$table->double('total_tax');
				$table->double('total_discount');
				$table->double('delivery_charge');
				$table->double('total_amount_due');
				$table->double('paid_amount');
				$table->double('change_amount');
				$table->string('or_no', 40)->default('');
				$table->timestamps();
			});
		}
    }

    public function down()
    {
        Schema::dropIfExists('invoices');
    }
}