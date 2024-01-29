<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InvoiceTax extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_id',
        'item',
        'amount',
        'note'
    ];
    
    public $timestamps = false;

    public function invoice(): BelongsTo
    {
        return $this->belongsTo(Invoice::class);
    }
}
