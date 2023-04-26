<?php

namespace App\Listeners;

use App\Events\LogGenerate;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Auth;

use App\Models\Log;

class LogCreate
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
    }

    /**
     * Handle the event.
     */
    public function handle(LogGenerate $event): void
    {
        Log::create([
            'action' => $event->action,
            'model' => class_basename($event->target),
            'message' => $event->message,
            'target' => $event->target->id,
            'trigger' => Auth()->user()->id,
        ]);
    }
}
