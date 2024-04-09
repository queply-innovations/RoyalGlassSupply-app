<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    public function up()
    {
        if(!Schema::hasTable('products')) {
            Schema::create('products', function (Blueprint $table) {
                $table->id();
                $table->string('serial_no',100)->default('');
                $table->string('name',500)->default('');
                $table->string('brand',100)->default('');
                $table->string('size',100);
                $table->string('color',40);
                $table->text('notes')->nullable();
            });
        }
    }

    public function down()
    {
        Schema::dropIfExists('products');
    }
}