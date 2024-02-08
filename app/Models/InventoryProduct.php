<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class InventoryProduct extends Model
{
    use HasFactory;

    protected $fillable = [
        'inventory_id',
        'product_id',
        'supplier_id',
        'capital_price',
        'stocks_count',
        'damage_count',
        'total_count',
        'unit'
    ];

    public $timestamps = false;

    protected $with = [
        'product:id,name,size,color',
        'supplier:id,name'
    ];

    public function transferProducts(): HasMany
    {
        return $this->hasMany(TransferProduct::class, 'source_inventory');
    }

    public function invoiceItems(): HasMany
    {
        return $this->hasMany(InvoiceItem::class, 'source_inventory');
    }

    public function inventory(): BelongsTo
    {
        return $this->belongsTo(Inventory::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }
}
