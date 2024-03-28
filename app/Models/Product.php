<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'serial_no',
        'brand',
        'size',
        'color',
        'notes'
    ];

    public $timestamps = false;

    public function inventoryProducts(): HasMany
    {
        return $this->hasMany(InventoryProduct::class);
    }

    public function transferProducts(): HasMany
    {
        return $this->hasMany(TransferProduct::class);
    }

    public function productPrices(): HasMany
    {
        return $this->hasMany(ProductPrice::class);
    }

    public function invoiceItems(): HasMany
    {
        return $this->hasMany(invoiceItem::class);
    }
}
