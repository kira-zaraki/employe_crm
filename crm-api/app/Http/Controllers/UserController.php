<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Cache;

use App\Http\Requests\UserRequest;

use App\Models\User;
use App\Models\Profile;
use App\Models\Companie;
use App\Models\Invitation;
use App\Models\Log;

use App\Events\LogGenerate;


    /**
     * @TODO:: ADD UPDATE PASSWORD| ADD RESET PASSWORD
     */ 
class UserController extends Controller
{
    /**
     * Return List of data nedded for the current user
     */  

    public function currentUser($message = 'User successfully listed')
    {  
        $user = Cache::remember('user_'.Auth::id(), 240, function () {
            return Auth()->user()->append('colleagues');
        });

        return response()->render('success',$message , $user); 
    }

    /**
     * Update the current user information
     */ 

    public function update(UserRequest $request)
    { 

        $user = Auth()->user();

        $user->update($request->get('user'));
        $user->profile()->update($request->get('profile'));
 
        LogGenerate::dispatch($user, 'update', 'Employe '.Auth()->user()->name.' update information account');

        return $this->currentUser('Account successfully updated');
    }

    /**
     * Get the admin data
     */ 

    public function admin()
    {
        $admin = Cache::remember('admin_'.Auth::id(), 240, function () {
            return Auth()->user();
        });
        return response()->render('success','Admin successfully selected', $admin);
    }

    /**
     * Get List of data to use by admin
     */ 

    public function adminMainData()
    {
        $adminMainData = Cache::remember('adminMainData_'.Auth::id(), 120, function () {
            return [
                'total_companies' => Companie::count(),
                'total_invitations' => Invitation::count(),
                'total_employees' => User::role('employe')->count(),
                'invitations' => Invitation::take(5)->get(),
                'employees' => User::role('employe')->take(5)->get(),
                'logs' => Log::take(6)->get(),
            ];
        });

        return response()->render('success','Admin data successfully listed', $adminMainData);
    }
}
