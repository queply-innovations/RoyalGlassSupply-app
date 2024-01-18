<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

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
