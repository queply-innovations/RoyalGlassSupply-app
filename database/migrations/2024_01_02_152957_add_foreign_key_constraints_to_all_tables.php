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
        // Schema::table('inventories', function (Blueprint $table) {
        //     $table->foreign('warehouse_id')->references('id')->on('warehouses')->onDelete('cascade');
        //     $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');
        //     $table->foreign('transfer_id')->references('id')->on('transfers')->onDelete('cascade');
        // });

        // Schema::table('inventory_products', function (Blueprint $table) {
        //     $table->foreign('inventory_id')->references('id')->on('inventories')->onDelete('cascade');
        //     $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
        //     $table->foreign('supplier_id')->references('id')->on('suppliers')->onDelete('cascade');
        // });

        // Schema::table('invoices', function (Blueprint $table) {
        //     $table->foreign('customer_id')->references('id')->on('customers')->onDelete('cascade');
        //     $table->foreign('warehouse_id')->references('id')->on('warehouses')->onDelete('cascade');
        //     $table->foreign('issued_by')->references('id')->on('users')->onDelete('cascade');
        // });

        // Schema::table('invoice_discounts', function (Blueprint $table) {
        //     $table->foreign('invoice_id')->references('id')->on('invoices')->onDelete('cascade');
        //     $table->foreign('voucher_id')->references('id')->on('vouchers')->onDelete('cascade');
        //     $table->foreign('approved_by')->references('id')->on('users')->onDelete('cascade');
        // });

        // Schema::table('invoice_items', function (Blueprint $table) {
        //     $table->foreign('invoice_id')->references('id')->on('invoices')->onDelete('cascade');
        //     $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
        //     $table->foreign('product_price_id')->references('id')->on('product_prices')->onDelete('cascade');
        //     $table->foreign('source_inventory')->references('id')->on('inventory_products')->onDelete('cascade');
        //     $table->foreign('approved_by')->references('id')->on('users')->onDelete('cascade');
        // });

        // Schema::table('invoice_taxes', function (Blueprint $table) {
        //     $table->foreign('invoice_id')->references('id')->on('invoices')->onDelete('cascade');
        // });

        // Schema::table('operation_expenses', function (Blueprint $table) {
        //     $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');
        // });

        // Schema::table('product_prices', function (Blueprint $table) {
        //     $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
        //     $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');
        //     $table->foreign('approved_by')->references('id')->on('users')->onDelete('cascade');
        //     $table->foreign('warehouse_id')->references('id')->on('warehouses')->onDelete('cascade');
        // });

        // Schema::table('return_transactions', function (Blueprint $table) {
        //     $table->foreign('invoice_id')->references('id')->on('invoices')->onDelete('cascade');
        //     $table->foreign('issued_by')->references('id')->on('users')->onDelete('cascade');
        //     $table->foreign('voucher_id')->references('id')->on('vouchers')->onDelete('cascade');
        // });

        // Schema::table('return_transaction_items', function (Blueprint $table) {
        //     $table->foreign('return_transaction_id')->references('id')->on('return_transactions')->onDelete('cascade');
        //     $table->foreign('invoice_item_id')->references('id')->on('invoice_items')->onDelete('cascade');
        // });

        // Schema::table('role_permissions', function (Blueprint $table) {
        //     $table->foreign('role_id')->references('id')->on('roles')->onDelete('cascade');
        //     $table->foreign('permission_id')->references('id')->on('permissions')->onDelete('cascade');
        // });

        // Schema::table('transfers', function (Blueprint $table) {
        //     $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');
        //     $table->foreign('source')->references('id')->on('warehouses')->onDelete('cascade');
        //     $table->foreign('destination')->references('id')->on('warehouses')->onDelete('cascade');
        //     $table->foreign('approved_by')->references('id')->on('users')->onDelete('cascade');
        //     $table->foreign('received_by')->references('id')->on('users')->onDelete('cascade');
        // });

        // Schema::table('user_roles', function (Blueprint $table) {
        //     $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        //     $table->foreign('role_id')->references('id')->on('roles')->onDelete('cascade');
        // });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('inventories', function (Blueprint $table) {
            $table->dropForeign(['warehouse_id']);
            $table->dropForeign(['created_by']);
            $table->dropForeign(['transfer_id']);
        });

        Schema::table('inventory_products', function (Blueprint $table) {
            $table->dropForeign(['inventory_id']);
            $table->dropForeign(['product_id']);
            $table->dropForeign(['supplier_id']);
        });

        Schema::table('invoices', function (Blueprint $table) {
            $table->dropForeign(['customer_id']);
            $table->dropForeign(['warehouse_id']);
            $table->dropForeign(['issued_by']);
        });

        Schema::table('invoice_discounts', function (Blueprint $table) {
            $table->dropForeign(['invoice_id']);
            $table->dropForeign(['voucher_id']);
            $table->dropForeign(['approved_by']);
        });

        Schema::table('invoice_items', function (Blueprint $table) {
            $table->dropForeign(['invoice_id']);
            $table->dropForeign(['product_id']);
            $table->dropForeign(['product_price_id']);
            $table->dropForeign(['source_inventory']);
            $table->dropForeign(['approved_by']);
        });

        Schema::table('invoice_taxes', function (Blueprint $table) {
            $table->dropForeign(['invoice_id']);
        });

        Schema::table('operation_expenses', function (Blueprint $table) {
            $table->dropForeign(['created_by']);
        });

        Schema::table('product_prices', function (Blueprint $table) {
            $table->dropForeign(['product_id']);
            $table->dropForeign(['created_by']);
            $table->dropForeign(['approved_by']);
            $table->dropForeign(['warehouse_id']);
        });

        Schema::table('return_transactions', function (Blueprint $table) {
            $table->dropForeign(['invoice_id']);
            $table->dropForeign(['issued_by']);
            $table->dropForeign(['voucher_id']);
        });

        Schema::table('return_transaction_items', function (Blueprint $table) {
            $table->dropForeign(['return_transaction_id']);
            $table->dropForeign(['invoice_item_id']);
        });

        Schema::table('role_permissions', function (Blueprint $table) {
            $table->dropForeign(['role_id']);
            $table->dropForeign(['permission_id']);
        });

        Schema::table('transfers', function (Blueprint $table) {
            $table->dropForeign(['created_by']);
            $table->dropForeign(['source']);
            $table->dropForeign(['destination']);
            $table->dropForeign(['approved_by']);
            $table->dropForeign(['received_by']);
        });

        Schema::table('user_roles', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropForeign(['role_id']);
        });
    }
};
