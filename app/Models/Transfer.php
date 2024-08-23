<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Transfer extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'created_by',
        'source',
        'destination',
        'destination_inventory',
        'transfer_schedule',
        'approval_status',
        'approved_by',
        'transfer_status',
        'date_received',
        'received_by',
        'notes'
    ];

    protected $with = [
        'createdBy:id,firstname,lastname',
        'sourceWarehouse:id,code,name',
        'destinationWarehouse:id,code,name',
        'approvedBy:id,firstname,lastname',
        'receivedBy:id,firstname,lastname'
    ];

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function sourceWarehouse(): BelongsTo
    {
        return $this->belongsTo(Warehouse::class, 'source');
    }

    public function destinationWarehouse(): BelongsTo
    {
        return $this->belongsTo(Warehouse::class, 'destination');
    }

    public function approvedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function receivedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'received_by');
    }

    public function transferProducts(): HasMany
    {
        return $this->hasMany(TransferProduct::class);
    }

    public function inventories(): HasMany
    {
        return $this->hasMany(Inventory::class);
    }

    public function destinationInventory(): BelongsTo
    {
        return $this->belongsTo(Inventory::class, 'destination_inventory');
    }
}
