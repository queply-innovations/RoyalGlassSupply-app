<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductPrice extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'product_id',
        'type',
        'unit',
        'stocks_quantity',
        'stocks_unit',
        'capital_price',
        'markup_price',
        'tax_amount',
        'cost',
        'on_sale',
        'sale_discount',
        'price',
        'warehouse_id',
        'created_by',
        'approval_status',
        'approved_by',
        'active_status'
    ];

    protected $with = [
        'product:id,name,serial_no,brand,size,color',
        'createdBy:id,firstname,lastname',
        'approvedBy:id,firstname,lastname',
        'warehouse:id,code,name'
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function approvedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function warehouse(): BelongsTo
    {
        return $this->belongsTo(Warehouse::class);
    }

    public function invoiceItems(): HasMany
    {
        return $this->hasMany(InvoiceItem::class);
    }

    public function inventoryProduct() {
        return $this->belongsTo(InventoryProduct::class, 'id', 'product_price_id');
    }
}
