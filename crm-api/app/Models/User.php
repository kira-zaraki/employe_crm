<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Casts\Attribute;

use App\Casts\Hash; 

use App\Models\Companie;

use App\Models\Scopes\LastestScope;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'companie',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => Hash::class
    ]; 

    protected $guard_name = 'sanctum';


    /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected $with = ['companie','profile', 'roles']; 
    
    /**
     * The "booted" method of the model.
     */
    protected static function booted(): void
    {
        static::addGlobalScope(new LastestScope);
    }

    public function profile(): HasOne {
        return $this->hasOne(Profile::class);
    }

    public function companie(): BelongsTo {
        return $this->belongsTo(Companie::class, 'companie');
    }

    public function companies(): hasMany {
        return $this->hasMany(Companie::class, 'founder');
    }

    public function current_companie(): BelongsTo {
        return $this->belongsTo(Companie::class, 'companie');
    } 

    /**
     * Add new colleagues attribute.
     */
    public function colleagues(): Attribute
    {
        return new Attribute(
            get: fn () => $this->current_companie->employes()->get()->except($this->id),
        );
    }
}
