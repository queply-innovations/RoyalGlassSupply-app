<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ReturnTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_id',
        'issued_by',
        'refundable_amount',
        'voucher_id',
        'refund_status'
    ];

    public function invoice(): BelongsTo
    {
        return $this->belongsTo(Invoice::class);
    }

    public function issuedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'issued_by');
    }

    public function voucher(): BelongsTo
    {
        return $this->belongsTo(Voucher::class);
    }

    public function returnTransactionItems(): HasMany
    {
        return $this->hasMany(ReturnTransactionItem::class);
    }
}
