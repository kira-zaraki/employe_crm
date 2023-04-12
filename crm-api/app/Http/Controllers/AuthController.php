<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

use App\Models\User;
use App\Models\Profile;
use App\Models\Invitation;
use App\Models\Role;
use App\Models\Log;

use Hash; 

class AuthController extends Controller
{
    /**
     * Accepte employe and complete the subscription
     */
    public function signUp(Request $request, Invitation $invitation){
        $validate = Validator::make($request->all(),[
            'name' => 'required|string',
            'email' => 'required|string|email',
            'address' => 'required|string',
            'phone' => 'required|string',
            'birthday' => 'required|date',
            'password' => 'required|string'
        ]);

        if($validate->fails())
            return response()->render('error', $validate->messages()->all());

        if($invitation->status == 'validated')
            return response()->render('error', 'Employed already subscribed');

        $user = $request->only('name', 'email', 'password', 'companie');
        

        $user['password'] = Hash::make($user['password']);
        $user = User::create($user);
        
        $profile = $request->except(['email', 'password', 'companie']);


        $profile = Profile::create($profile);
        $user->profile()->save($profile);
        $user->save($invitation->toArray());

        $user->assignRole(Role::employe());

        if($user){
            $invitation->update(['status' => 'validated']);
            Log::create([
                'action' => 'create',
                'model' => 'user',
                'message' => "Employe {$user->name} successfully valid invitation",
                'target' => $user->id,
                'trigger' => $user->id,
            ]);
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
