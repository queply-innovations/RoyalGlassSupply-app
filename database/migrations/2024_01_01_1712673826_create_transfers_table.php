<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransfersTable extends Migration
{
    public function up()
    {
        Schema::create('transfers', function (Blueprint $table) {
			$table->id();
			$table->string('code', 50)->default('');
			$table->unsignedBigInteger('created_by');
			$table->unsignedBigInteger('source');
			$table->unsignedBigInteger('destination');
			$table->timestamp('transfer_schedule')->default('0000-00-00 00:00:00');
			$table->string('approval_status', 40);
			$table->unsignedBigInteger('approved_by')->nullable();
			$table->string('transfer_status',40)->nullable();
			$table->timestamp('date_received')->nullable();
			$table->unsignedBigInteger('received_by')->nullable();
			$table->text('notes');
			$table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('transfers');
    }
}