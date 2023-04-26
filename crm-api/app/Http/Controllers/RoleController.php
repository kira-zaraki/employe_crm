<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

use App\Models\User;

class RoleController extends Controller
{
    /**
     * Catch a user and change role
     */  
    public function changeRole(Request $request, User $user)
    {
        $user->syncRoles($request->get('role'));

        $employees = Cache::remember('employees', 120, function () {
            return User::all()->except(Auth::id());
        });
        
        return response()->render('success','Role successfully changed', $employees);
    }
}
