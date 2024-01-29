<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class InvoiceItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_id',
        'product_id',
        'product_price_id',
        'quantity',
        'unit',
        'price',
        'source_inventory'
    ];
    
    public $timestamps = false;

    public function returnTransactionItems(): HasMany
    {
        return $this->hasMany(ReturnTransacionItem::class);
    }

    public function invoice(): BelongsTo
    {
        return $this->belongsTo(Invoice::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function productPrice(): BelongsTo
    {
        return $this->belongsTo(ProductPrice::class);
    }

    public function inventoryProduct(): BelongsTo
    {
        return $this->belongsTo(InventoryProduct::class, 'source_inventory');
    }
}
