<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\User;

class RoleController extends Controller
{
    /**
     * Catch a user and change role
     */  
    public function changeRole(Request $request, User $user)
    {
        $user->syncRoles($request->get('role'));
        return response()->render('success','Role successfully changed', User::with(['companie', 'roles'])->latest()->get()->except(Auth::id()));
    }
}
