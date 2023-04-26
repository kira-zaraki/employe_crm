<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

use App\Models\User;
use App\Models\Role;
use App\Models\Log;

use App\Events\LogGenerate;

class EmployeController extends Controller
{
    /**
     * List all employees execpt the current connected admin
     */

    public function get($message = 'Employes successfully listed')
    {
        $employees = Cache::remember('employees', 120, function () {
            return User::all()->except(Auth::id());
        });
        return response()->render('success',$message, $employees); 
    }

    /**
     * Catch and remove user
     */

    public function delete(User $user){

        $sucess = $user->delete();
        if($sucess)
            LogGenerate::dispatch($user, 'delete', 'Admin '.Auth()->user()->name.' delete employe '.$user->name);
        return $this->get('Employe successfully deleted');
    }

    public function getById(User $user){
        return response()->render('success','Employe successfully listed', $user);
    }
}
