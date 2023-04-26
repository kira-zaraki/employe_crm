<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

use App\Http\Requests\UserRequest;

use App\Models\User;
use App\Models\Profile;
use App\Models\Invitation;
use App\Models\Role;
use App\Models\Log;

use App\Events\LogGenerate;


class AuthController extends Controller
{
    /**
     * Accepte employe and complete the subscription
     */
    public function signUp(UserRequest $request, Invitation $invitation){ 
        
        if($invitation->status == 'validated')
            return response()->render('error', 'Employed already subscribed');

        $user = User::create($request->user);
        
        $profile = Profile::create($request->profile);
        $user->profile()->save($profile);
        $user->save($invitation->toArray());

        $user->assignRole(Role::employe());

        if($user){
            $invitation->update(['status' => 'validated']);
            LogGenerate::dispatch($user, 'create', "Employe {$user->name} successfully valid invitation");
        }

        return response()->render('success', 'Your account successfully registred');
    }

    /**
     * Login action
     */
    public function signIn(Request $request)
    {
        $response = [];
        $credentials = Validator::make($request->all(),[
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);
        if($credentials->fails())
            $response = response()->render('error', $credentials->messages()->all());

        if(Auth::attempt($request->all()))
            $response = response()->render('success','User successfully logged', [
                'token' => Auth()->user()->createToken('token')->plainTextToken,
                'role' => Auth()->user()->getRoleNames()[0]
            ]);
        else
            $response = response()->render('error', 'user not found');

        return $response;
    }

    /**
     * Revoke User token
     */
    public function signOut()
    {
        Auth()->user()->tokens()->delete();
        return response()->render('success', 'User successfully disconnected');
    }
}
