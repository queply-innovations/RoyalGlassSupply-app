<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOperationExpensesTable extends Migration
{
    public function up()
    {
        Schema::create('operation_expenses', function (Blueprint $table) {
            $table->id();
            $table->string('title',100)->default('');
            $table->date('date_of_operation');
            $table->double('amount');
            $table->text('notes');
            $table->unsignedBigInteger('created_by');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('operation_expenses');
    }
}