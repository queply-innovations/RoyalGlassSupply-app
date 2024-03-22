<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class InvoiceItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_id',
        'product_id',
        'product_price_id',
        'product_price',
        'quantity',
        'unit',
        'item_discount',
        'discount_approval_status',
        'approved_by',
        'total_price',
        'source_inventory'
    ];
    
    public $timestamps = false;

    protected $with = [
        'product:id,name,serial_no,brand,size,color'
    ];

    public function returnTransactionItems(): HasMany
    {
        return $this->hasMany(ReturnTransacionItem::class);
    }

    public function invoice(): BelongsTo
    {
        return $this->belongsTo(Invoice::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function productPrice(): BelongsTo
    {
        return $this->belongsTo(ProductPrice::class);
    }

    public function approvedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function inventoryProduct(): BelongsTo
    {
        return $this->belongsTo(InventoryProduct::class, 'source_inventory');
    }

    public function getTotalStocksQuantityAttribute ()
    {
        return ($this->quantity * $this->productPrice->stocks_quantity);
    }

    public function getTotalSoldAttribute ()
    {
        if($this->invoice->type == "payment") {
            return ($this->quantity * $this->productPrice->stocks_quantity);
        }
        else{
            return 0;
        }
    }

    public function getTotalMiscellaneousAttribute ()
    {
        if($this->invoice->type == "exit") {
            return ($this->quantity * $this->productPrice->stocks_quantity);
        }
        else{
            return 0;
        }
    }
}
