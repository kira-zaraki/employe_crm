<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;

use App\Models\Invitation;
use App\Models\Log;

use App\Mail\InvitationMail;

class InvitationController extends Controller
{
    /**
     * Valid and create Invitation
     */
    public function create(Request $request){ 
        $validate = Validator::make($request->all(),[
            'name' => 'string|required',
            'email' => 'email|required',
            'companie' => 'integer|required', 
        ]);
        if($validate->fails())
            return response()->render('error', $validate->messages()->all());
        $send = $request->get('status');
        
        $invitation = $request->all();

        $invitation = Invitation::create($invitation);
        if($invitation){
            //Check if this invitation is sended with send email request 
            if($send == 'sent'){
                Mail::to($invitation->email)->send(new InvitationMail($invitation));
                Log::create([
                    'action' => 'create',
                    'model' => 'invitation',
                    'message' => 'Admin '.Auth()->user()->name.' create invitation to email '.$invitation->email.' with '.$send.' status',
                    'target' => $invitation->id,
                    'trigger' => Auth()->user()->id,
                ]);
            }
            return $this->get('Invitation successfully created you can create more');
        }
        else
            return response()->render('error', 'Invitation not created');
    }

    /**
     * List all companies
     */
    public function get($message = 'Companies successfully listed')
    {
        return response()->render('success', $message, Invitation::latest()->get());
    }

    /**
     * Catch and remove Invitation
     */   

    public function delete(Invitation $invitation){

        $success = $invitation->delete();

        if($success)
            Log::create([
                'action' => 'delete',
                'model' => 'invitation',
                'message' => 'Admin '.Auth()->user()->name.' delete invitation '.$invitation->email,
                'target' => $invitation->id,
                'trigger' => Auth()->user()->id,
            ]);
        return $this->get('Invitation successfully deleted');
    }

    /**
     * Catch and return the current Invitation
     */  

    public function getById(Invitation $invitation){
        return response()->render('success','Invitation successfully returned', $invitation);
    }
}
