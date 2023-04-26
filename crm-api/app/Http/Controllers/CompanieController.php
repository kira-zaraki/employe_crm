<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Cache;

use App\Http\Requests\CompanieRequest;

use App\Models\Companie;
use App\Models\Log;

use App\Events\LogGenerate;

class CompanieController extends Controller
{
    /**
     * Create a new compain
     */

    public function create(CompanieRequest $request){  
        $companie = $request->all();
        $companie['founder'] = Auth()->user()->id;
        $companie = Companie::create($companie);
        if($companie){ 
            LogGenerate::dispatch($companie, 'create', "Admin ".Auth()->user()->name." create ".$companie->name." companie");
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
        $companie = Cache::remember('companies', 120, function () {
            return collect(Companie::cursor());
        });
        return response()->render('success',$message ,$companie);
    }

    /**
     * Catch and remove compain
     */
    public function delete(Companie $companie){

        if($companie->employes->count())
            return response()->render('error', 'Employees associated with this companie');

        $companieCache = $companie;

        $success = $companie->delete();
        if($success) 
            LogGenerate::dispatch($companieCache, 'delete', "Admin ".Auth()->user()->name." delete ".$companie->name." companie");
        return $this->get('Companie successfully deleted');
    }
}
