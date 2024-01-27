<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Voucher extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'generated_by',
        'notes'
    ];

    public function generatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'generated_by');
    }

    public function returnTransaction(): HasOne
    {
        return $this->hasMany(ReturnTransaction::class);
    }

    public function invoiceDiscount(): HasOne
    {
        return $this->hasMany(InvoiceDiscount::class);
    }
}
