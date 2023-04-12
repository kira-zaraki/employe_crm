<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('logs', function (Blueprint $table) {
            $table->id();
            $table->string('action', 100);
            $table->string('model', 50);
            $table->text('message');
            $table->integer('target')->nullable();
            $table->timestamps();
        });

        Schema::table('logs', function (Blueprint $table) {
            $table->unsignedBigInteger('trigger')->nullable();
            $table->foreign('trigger')->references('id')->on('users')->onDelete('cascade');
        }); 
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('logs');
    }
};
