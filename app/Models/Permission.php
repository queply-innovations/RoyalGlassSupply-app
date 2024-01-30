<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    use HasFactory;

    protected $fillable = [
        'title'
    ];
    
    public $timestamps = false;

    public function rolePermissions(): HasMany
    {
        return $this->hasMany(RolePermission::class);
    }
}
