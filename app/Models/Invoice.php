<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'customer_id',
        'warehouse_id',
        'issued_by',
        'type',
        'payment_method',
        'reference_no',
        'subtotal',
        'total_tax',
        'total_discount',
        'delivery_charge',
        'total_amount_due',
        'paid_amount',
        'change_amount',
        'balance_amount',
        'is_paid',
        'or_no',
        'status'
    ];

    protected $with = [
        'customer:id,firstname,lastname',
        'warehouse:id,code,name',
        'issuedBy:id,firstname,lastname'
    ];

    public function invoiceItems(): HasMany
    {
        return $this->hasMany(InvoiceItem::class);
    }

    public function invoiceDiscounts(): HasMany
    {
        return $this->hasMany(InvoiceDiscount::class);
    }

    public function invoiceTaxes(): HasMany
    {
        return $this->hasMany(InvoiceTax::class);
    }

    public function returnTransactions(): HasMany
    {
        return $this->hasMany(ReturnTransaction::class);
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function warehouse(): BelongsTo
    {
        return $this->belongsTo(Warehouse::class);
    }

    public function issuedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'issued_by');
    }
}
