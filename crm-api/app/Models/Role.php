<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Models\Role as SpatieRole;

class Role extends Model
{
    use HasFactory;

    static function admin(){
        return SpatieRole::whereName('admin')->get();
    }

    static function employe(){
        return SpatieRole::whereName('employe')->get();
    }
}
