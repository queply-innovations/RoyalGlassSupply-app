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
        Schema::table('return_transactions', function (Blueprint $table) {
            $table->boolean('is_cash_refund')->default(0)->after('refund_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('return_transactions', function (Blueprint $table) {
            $table->dropColumn('is_cash_refund');
        });
    }
};
