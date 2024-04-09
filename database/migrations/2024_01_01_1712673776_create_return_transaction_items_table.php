<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReturnTransactionItemsTable extends Migration
{
    public function up()
    {
        if(!Schema::hasTable('return_transaction_items')) {
            Schema::create('return_transaction_items', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('return_transaction_id');
                $table->unsignedBigInteger('invoice_item_id');
                $table->double('quantity');
                $table->string('unit',40);
                $table->double('price');
                $table->text('reason');
            });
        }
    }

    public function down()
    {
        Schema::dropIfExists('return_transaction_items');
    }
}