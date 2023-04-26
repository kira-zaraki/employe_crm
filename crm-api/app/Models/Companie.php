<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;

use App\Models\User;
use App\Models\Invitation;

use App\Models\Scopes\LastestScope;

class Companie extends Model
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

    public function founder(): HasOne {
        return $this->hasOne(User::class, 'founder');
    }

    public function Invitations(): hasMany {
        return $this->hasMany(Invitation::class, 'companie');
    }

    public function employes(): hasMany {
        return $this->hasMany(User::class, 'companie');
    }
}
