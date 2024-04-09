<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomersTable extends Migration
{
    public function up()
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('firstname', 40);
            $table->string('lastname', 40);
            $table->string('address', 100);
            $table->string('contact_no', 40);
        });
    }

    public function down()
    {
        Schema::dropIfExists('customers');
    }
}