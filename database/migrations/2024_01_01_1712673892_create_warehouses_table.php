<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWarehousesTable extends Migration
{
    public function up()
    {
        Schema::create('warehouses', function (Blueprint $table) {
            $table->id();
            $table->string('code', 3)->default('');
            $table->string('name', 40);
            $table->string('location', 100);
        });
    }

    public function down()
    {
        Schema::dropIfExists('warehouses');
    }
}