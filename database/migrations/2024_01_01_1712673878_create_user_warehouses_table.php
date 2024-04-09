<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserWarehousesTable extends Migration
{
    public function up()
    {
        Schema::create('user_warehouses', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->index();
            $table->unsignedBigInteger('warehouse_id')->index();
        });
    }

    public function down()
    {
        Schema::dropIfExists('user_warehouses');
    }
}