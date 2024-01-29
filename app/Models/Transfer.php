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
        'created_by',
        'source',
        'destination',
        'transfer_schedule',
        'approval_status',
        'approved_by',
        'transfer_status',
        'date_received',
        'received_by'
    ];

    protected $with = [
        'createdBy:id,firstname,lastname',
        'sourceWarehouse:id,name',
        'destinationWarehouse:id,name',
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
}
