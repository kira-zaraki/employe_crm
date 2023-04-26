<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Cache;

use App\Http\Requests\InvitationRequest;

use App\Models\Invitation;
use App\Models\Log;

use App\Mail\InvitationMail;

use App\Events\LogGenerate;

class InvitationController extends Controller
{
    /**
     * Valid and create Invitation
     */
    public function create(InvitationRequest $request){  
        $send = $request->get('status');
        
        $invitation = $request->validated();

        $invitation = Invitation::create($invitation);
        if($invitation){
            //Check if this invitation is sended with send email request 
            if($send == 'sent'){
                Mail::to($invitation->email)->send(new InvitationMail($invitation)); 
                LogGenerate::dispatch($invitation, 'create', 'Admin '.Auth()->user()->name.' create invitation to email '.$invitation->email.' with '.$send.' status');
            }
            return $this->get('Invitation successfully created you can create more');
        }
        else
            return response()->render('error', 'Invitation not created');
    }

    /**
     * List all invitations
     */
    public function get($message = 'Invitations successfully listed')
    {
        $invitations = Cache::remember('invitations', 120, function () {
            return collect(Invitation::cursor());
        });

        return response()->render('success', $message, $invitations);
    }

    /**
     * Catch and remove Invitation
     */   

    public function delete(Invitation $invitation){
        if($invitation->status == 'validated')
            return response()->render('error', 'Invitation already validated');

        $success = $invitation->delete();

        if($success) 
            LogGenerate::dispatch($invitation, 'delete', 'Admin '.Auth()->user()->name.' delete invitation '.$invitation->email);
        return $this->get('Invitation successfully deleted');
    }

    /**
     * Catch and return the current Invitation
     */  

    public function getById(Invitation $invitation){
        return response()->render('success','Invitation successfully returned', $invitation);
    }

    public function sendEmail(Invitation $invitation){
        if($invitation->status == 'validated')
            return response()->render('error', 'Invitation already sent');

        Mail::to($invitation->email)->send(new InvitationMail($invitation));

        return $this->get('Invitation successfully sent');
    }
}
