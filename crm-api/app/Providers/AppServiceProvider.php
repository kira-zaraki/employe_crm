<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Schema;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Response::macro('render', function($status, $message, $data = null){
            $code = 1;
            if(is_string($message))
                $message = [$message];
            
            if($status == 'error')
                $code = 0;

            $render = [
                'code' => $code,
                'status' => $status,
                'messages' => $message 
            ];
            if($data)
                $render['data'] = $data;
            return $render;
        });
        
        Schema::defaultStringLength(125);
    }
}
