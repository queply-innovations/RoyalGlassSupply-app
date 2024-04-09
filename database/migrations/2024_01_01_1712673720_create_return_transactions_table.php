<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReturnTransactionsTable extends Migration
{
    public function up()
    {
        if(!Schema::hasTable('return_transactions')) {
            Schema::create('return_transactions', function (Blueprint $table) {
                $table->id();
                $table->string('code',50)->default('');
                $table->unsignedBigInteger('invoice_id');
                $table->unsignedBigInteger('issued_by');
                $table->double('refundable_amount');
                $table->unsignedBigInteger('voucher_id')->nullable();
                $table->string('refund_status',40);
                $table->timestamps();
            });
        }
    }

    public function down()
    {
        Schema::dropIfExists('return_transactions');
    }
}