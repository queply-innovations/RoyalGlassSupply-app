<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Warehouse extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'location'
    ];
    
    public $timestamps = false;

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
