<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

use App\Models\Companie;

use App\Models\Scopes\LastestScope;

class Invitation extends Model
{
    use HasFactory;


    protected $guarded = [];

    /**
     * The "booted" method of the model.
     */
    protected static function booted(): void
    {
        static::addGlobalScope(new LastestScope);
    }

    public function companie(): HasOne {
        return $this->hasOne(Companie::class, 'companie');
    }
}
