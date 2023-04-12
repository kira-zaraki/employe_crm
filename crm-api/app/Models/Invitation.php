<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

use App\Models\Companie;

class Invitation extends Model
{
    use HasFactory;


    protected $guarded = [];

    public function companie(): HasOne {
        return $this->hasOne(Companie::class, 'companie');
    }
}
