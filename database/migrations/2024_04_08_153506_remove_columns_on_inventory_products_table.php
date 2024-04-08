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
            $table->dropColumn(['bundles_count', 'bundles_unit', 'quantity_per_bundle']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('inventory_products', function (Blueprint $table) {
            $table->double('bundles_count')->after('capital_price');
            $table->string('bundles_unit')->after('bundles_count');
            $table->double('quantity_per_bundle')->after('bundles_unit');
        });
    }
};
