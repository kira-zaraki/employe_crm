<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

use App\Models\User;
use App\Models\Profile;
use App\Models\Companie;
use App\Models\Invitation;
use App\Models\Log;


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
        return response()->render('success',$message , [
            'user' => Auth()->user(),
            'profile' => Auth()->user()->profile,
            'companie' => Auth()->user()->current_companie,
            'colleagues' => Auth()->user()->current_companie->employes()->get()->except(Auth::id()),
        ]); 
    }

    /**
     * Update the current user information
     */ 

    public function update(Request $request)
    {
        $validate = Validator::make($request->all(),[
            'user.name' => 'required|string',
            'user.email' => 'required|string|email',
            'profile.address' => 'required|string',
            'profile.phone' => 'required|string',
        ]);

        if($validate->fails())
            return response()->render('error', $validate->messages()->all());

        $user = Auth()->user();

        $user->update($request->get('user'));
        $user->profile()->update($request->get('profile'));

        Log::create([
            'action' => 'update',
            'model' => 'user',
            'message' => 'Employe '.Auth()->user()->name.' update information account',
            'target' => Auth()->user()->id,
            'trigger' => Auth()->user()->id,
        ]);

        return $this->currentUser('Account successfully updated');
    }

    /**
     * Get the admin data
     */ 

    public function admin()
    {
        return response()->render('success','Admin successfully selected', Auth()->user());
    }

    /**
     * Get List of data to use by admin
     */ 

    public function adminMainData()
    {
        return response()->render('success','Admin data successfully listed', [
            'total_companies' => Companie::count(),
            'total_invitations' => Invitation::count(),
            'total_employees' => User::role('employe')->latest()->count(),
            'invitations' => Invitation::limit(5)->latest()->get(),
            'employees' => User::role('employe')->limit(5)->latest()->get(),
            'logs' => Log::limit(6)->latest()->get(),
        ]);
    }
}
