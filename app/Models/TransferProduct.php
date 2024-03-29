<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TransferProduct extends Model
{
    use HasFactory;

    protected $fillable = [
        'transfer_id',
        'product_id',
        'capital_price',
        'bundles_count',
        'bundles_unit',
        'quantity_per_bundle',
        'total_quantity',
        'unit',
        'source_inventory'
    ];
    
    public $timestamps = false;

    protected $with = [
        'product:id,name,serial_no,brand,size,color'
    ];

    public function transfer(): BelongsTo
    {
        return $this->belongsTo(Transfer::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function inventoryProduct(): BelongsTo
    {
        return $this->belongsTo(InventoryProduct::class, 'source_inventory');
    }
}
