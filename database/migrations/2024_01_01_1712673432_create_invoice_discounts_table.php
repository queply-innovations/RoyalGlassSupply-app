<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvoiceDiscountsTable extends Migration
{
    public function up()
    {
        if(!Schema::hasTable('invoice_discounts')) {
            Schema::create('invoice_discounts', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('invoice_id');
                $table->string('item',40);
                $table->unsignedBigInteger('voucher_id')->nullable();
                $table->double('amount');
                $table->string('discount_approval_status',40)->default('');
                $table->unsignedBigInteger('approved_by')->nullable();
                $table->text('notes');
            });
        }
    }

    public function down()
    {
        Schema::dropIfExists('invoice_discounts');
    }
}