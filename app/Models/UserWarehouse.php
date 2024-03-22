<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserWarehouse extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'warehouse_id'
    ];
    
    public $timestamps = false;

    protected $with = [
        'user:id,firstname,lastname,position',
        'warehouse:id,code,name'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function warehouse(): BelongsTo
    {
        return $this->belongsTo(Warehouse::class);
    }
}
