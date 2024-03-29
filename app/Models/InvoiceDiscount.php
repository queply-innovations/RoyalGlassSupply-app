<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InvoiceDiscount extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_id',
        'item',
        'voucher_id',
        'amount',
        'discount_approval_status',
        'approved_by',
        'notes'
    ];
    
    public $timestamps = false;

    protected $with = [
        'voucher:id,code'
    ];

    public function invoice(): BelongsTo
    {
        return $this->belongsTo(Invoice::class);
    }

    public function voucher(): BelongsTo
    {
        return $this->belongsTo(Voucher::class);
    }

    public function approvedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }
}
