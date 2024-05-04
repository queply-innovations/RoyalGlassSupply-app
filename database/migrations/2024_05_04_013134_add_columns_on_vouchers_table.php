<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('vouchers', function (Blueprint $table) {
            $table->unsignedBigInteger('customer_id')->nullable()->after('code');
            $table->unsignedBigInteger('return_transaction_id')->nullable()->after('customer_id');
            $table->double('discounted_price')->default(0)->after('return_transaction_id');
            $table->boolean('is_claimed')->default(false)->after('discounted_price');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('vouchers', function (Blueprint $table) {
            $table->dropColumn('customer_id');
            $table->dropColumn('return_transaction_id');
            $table->dropColumn('discounted_price');
            $table->dropColumn('is_claimed');
        });
    }
};
