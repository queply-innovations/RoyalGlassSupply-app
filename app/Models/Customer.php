<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'firstname',
        'lastname',
        'address',
        'contact_no'
    ];
    
    public $timestamps = false;

    public function invoices(): HasMany
    {
        return $this->hasMany(Invoice::class);
    }
}
