<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReturnTransactionItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'return_transaction_id',
        'invoice_item_id',
        'quantity',
        'unit',
        'price',
        'reason'
    ];
    
    public $timestamps = false;

    public function returnTransaction(): BelongsTo
    {
        return $this->belongsTo(ReturnTransaction::class);
    }

    public function invoiceItem(): BelongsTo
    {
        return $this->belongsTo(InvoiceItem::class);
    }
}
