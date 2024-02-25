<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OperationExpense extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'date_of_operation',
        'amount',
        'notes',
        'created_by'
    ];

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
