<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInventoriesTable extends Migration
{
    public function up()
    {
        Schema::create('inventories', function (Blueprint $table) {
			$table->id();
			$table->string('code', 50)->default('');
			$table->unsignedBigInteger('warehouse_id');
			$table->unsignedBigInteger('created_by');
			$table->date('date_received');
			$table->string('type', 40);
			$table->unsignedBigInteger('transfer_id')->nullable();
			$table->text('notes');
			$table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('inventories');
    }
}