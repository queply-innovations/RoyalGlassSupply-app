<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSuppliersTable extends Migration
{
    public function up()
    {
        Schema::create('suppliers', function (Blueprint $table) {
            $table->id();
            $table->string('name',40);
            $table->string('contact_no',40);
            $table->string('address',100);
        });
    }

    public function down()
    {
        Schema::dropIfExists('suppliers');
    }
}