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
        Schema::table('inventory_products', function (Blueprint $table) {
            $table->bigInteger('approved_stocks')->default(0)->after('total_count')->change();
            $table->bigInteger('purchased_stocks')->default(0)->after('approved_stocks');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('inventory_products', function (Blueprint $table) {
            $table->dropColumn('purchased_stocks');
            $table->integer('approved_stocks')->default(0)->after('stocks_count')->change();
        });
    }
};
