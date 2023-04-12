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
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('form', 20);
            $table->text('address');
            $table->string('rc', 100);
            $table->string('ice', 100);
            $table->integer('capital');
            $table->timestamps();
        });

        Schema::table('companies', function (Blueprint $table) {
            $table->unsignedBigInteger('founder');
         
            $table->foreign('founder')->references('id')->on('users')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
