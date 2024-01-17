<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Warehouse extends Model
{
    use HasFactory;

    public function inventories(): HasMany
    {
        return $this->hasMany(Inventory::class);
    }

    public function transferSources(): HasMany
    {
        return $this->hasMany(Transfer::class, 'source');
    }

    public function transferDestinations(): HasMany
    {
        return $this->hasMany(Transfer::class, 'destination');
    }

    public function productPrices(): HasMany
    {
        return $this->hasMany(ProductPrice::class);
    }
}
