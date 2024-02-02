<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\InventoryProductController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\InvoiceDiscountController;
use App\Http\Controllers\InvoiceItemController;
use App\Http\Controllers\InvoiceTaxController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductPriceController;
use App\Http\Controllers\ReturnTransactionController;
use App\Http\Controllers\ReturnTransactionItemController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\RolePermissionController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\TransferController;
use App\Http\Controllers\TransferProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserRoleController;
use App\Http\Controllers\VoucherController;
use App\Http\Controllers\WarehouseController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::group(['middleware' => 'auth:sanctum'], function() {
    Route::resources([
        'customers' => CustomerController::class,
        'inventories' => InventoryController::class,
        'inventory-products' => InventoryProductController::class,
        'invoices' => InvoiceController::class,
        'invoice-discounts' => InvoiceDiscountController::class,
        'invoice-items' => InvoiceItemController::class,
        'invoice-taxes' => InvoiceTaxController::class,
        'permissions' => PermissionController::class,
        'products' => ProductController::class,
        'product-prices' => ProductPriceController::class,
        'return-transactions' => ReturnTransactionController::class,
        'return-transaction-items' => ReturnTransactionItemController::class,
        'roles' => RoleController::class,
        'role-permissions' => RolePermissionController::class,
        'suppliers' => SupplierController::class,
        'transfers' => TransferController::class,
        'transfer-products' => TransferProductController::class,
        'user' => UserController::class,
        'user-roles' => UserRoleController::class,
        'vouchers' => VoucherController::class,
        'warehouses' => WarehouseController::class,
    ]);

    Route::post('/logout', [UserController::class, 'logout']);

    Route::get('/inventories/{inventory}/show-items', [InventoryController::class, 'showItems']);
    Route::get('/invoices/{invoice}/show-items', [InvoiceController::class, 'showItems']);
    Route::get('/return-transactions/{returnTransaction}/show-items', [ReturnTransactionController::class, 'showItems']);
    Route::get('/transfers/{transfer}/show-items', [TransferController::class, 'showItems']);

    Route::post('/customers/searches-filters-sorts', [CustomerController::class, 'searchFilterAndSort']);
    Route::post('/inventories/searches-filters-sorts', [InventoryController::class, 'searchFilterAndSort']);
});