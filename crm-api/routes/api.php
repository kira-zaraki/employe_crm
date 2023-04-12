<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CompanieController;
use App\Http\Controllers\InvitationController;
use App\Http\Controllers\EmployeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('auth')->group(function(){
    Route::post('sign-in',[AuthController::class, 'signIn']);
    Route::post('sign-up/{invitation}',[AuthController::class, 'signUp']);
});

Route::middleware('auth:sanctum')->group(function () { 
    Route::prefix('auth')->group(function(){
        Route::get('sign-out',[AuthController::class, 'signOut']);
    });
    Route::group(['middleware' => ['role:admin']], function () {

        route::prefix('companie')->group(function(){
            route::post('create', [CompanieController::class, 'create']);
            route::get('get', [CompanieController::class, 'get']);
            route::delete('delete/{companie}', [CompanieController::class, 'delete']);
        });

        route::prefix('invitation')->group(function(){
            route::post('create', [InvitationController::class, 'create']);
            route::get('get', [InvitationController::class, 'get']);
            route::delete('delete/{invitation}', [InvitationController::class, 'delete']);
        });

        route::prefix('employe')->group(function(){
            route::post('create', [EmployeController::class, 'create']);
            route::get('get', [EmployeController::class, 'get']);
            route::delete('delete/{user}', [EmployeController::class, 'delete']);
        });
    });


    route::prefix('user')->group(function(){
        route::get('', [UserController::class, 'currentUser']);
        route::put('update', [UserController::class, 'update']); 
        route::get('admin', [UserController::class, 'admin']); 
        route::get('admin/data', [UserController::class, 'adminMainData']); 
    });

    route::prefix('role')->group(function(){
        route::put('change/{user}', [RoleController::class, 'changeRole']); 
    });

});

    route::prefix('invitation')->group(function(){
        route::get('/{invitation}', [InvitationController::class, 'getById']);
    });