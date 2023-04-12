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
        Schema::create('invitations', function (Blueprint $table) {
            $table->id();
            $table->string('email', 150);
            $table->string('name', 50);
            $table->string('status', 20)->default('pause');
            $table->timestamps();
        });

        Schema::table('invitations', function (Blueprint $table) {
            $table->unsignedBigInteger('companie');
         
            $table->foreign('companie')->references('id')->on('companies');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invitations');
    }
};
