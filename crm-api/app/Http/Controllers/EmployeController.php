<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\User;
use App\Models\Role;
use App\Models\Log;

class EmployeController extends Controller
{
    /**
     * List all employees execpt the current connected admin
     */

    public function get($message = 'Employes successfully listed')
    {
        return response()->render('success',$message, User::with(['companie', 'roles'])->latest()->get()->except(Auth::id())); 
    }

    /**
     * Catch and remove user
     */

    public function delete(User $user){

        $sucess = $user->delete();
        if($sucess)
            Log::create([
                'action' => 'delete',
                'model' => 'user',
                'message' => 'Admin '.Auth()->user()->name.' delete employe '.$user->name,
                'target' => $user->id,
                'trigger' => Auth()->user()->id,
            ]);
        return $this->get('Employe successfully deleted');
    }

    public function getById(User $user){
        return response()->render('success','Employe successfully listed', $user);
    }
}
