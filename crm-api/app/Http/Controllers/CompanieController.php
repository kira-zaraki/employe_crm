<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

use App\Http\Requests\CompaniePostRequest;

use App\Models\Companie;
use App\Models\Log;

class CompanieController extends Controller
{
    /**
     * Create a new compain
     */

    public function create(Request $request){ 
        $validate = Validator::make($request->all(),[
            'name' => 'string|required',
            'form' => 'string|required|in:sarl,sasu,sas,sa,snc,sca,scs',
            'rc' => 'string|required',
            'ice' => 'string|required',
            'address' => 'string|required',
            'capital' => 'integer|required',
        ]);
        if($validate->fails())
            return response()->render('error', $validate->messages()->all());
        $companie = $request->all();
        $companie['founder']= Auth()->user()->id;
        $companie = Companie::create($companie);
        if($companie){
            Log::create([
                'action' => 'create',
                'model' => 'companie',
                'message' => "Admin ".Auth()->user()->name." create ".$companie->name." companie",
                'target' => $companie->id,
                'trigger' => Auth()->user()->id,
            ]);
            return $this->get('Companie successfully created you can create more');
        }
        else
            return response()->render('error', 'Companie not created');
    }

    /**
     * List all compain list
     */
    public function get($message = 'Companie successfully listed')
    {
        return response()->render('success',$message ,Companie::latest()->get());
    }

    /**
     * Catch and remove compain
     */
    public function delete(Companie $companie){

        if($companie->employes->count())
            return response()->render('error', 'Employees associated with this companie');

        $companieId = $companie->id;

        $success = $companie->delete();
        if($success)
            Log::create([
            'action' => 'delete',
            'model' => 'companie',
            'message' => "Admin ".Auth()->user()->name." delete ".$companie->name." companie",
            'target' =>  $companieId,
            'trigger' => Auth()->user()->id,
        ]);

        return $this->get('Companie successfully deleted');
    }
}
