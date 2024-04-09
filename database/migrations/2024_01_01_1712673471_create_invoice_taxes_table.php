<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvoiceTaxesTable extends Migration
{
    public function up()
    {
        if(!Schema::hasTable('invoice_taxes')) {
            Schema::create('invoice_taxes', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('invoice_id');
                $table->string('item',40);
                $table->double('amount');
                $table->text('notes');
            });
        }
    }

    public function down()
    {
        Schema::dropIfExists('invoice_taxes');
    }
}