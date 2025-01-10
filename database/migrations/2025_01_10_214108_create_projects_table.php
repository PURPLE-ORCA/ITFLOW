<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title')->default('Untitled Project');
            $table->text('description')->nullable();
            $table->foreignId('owner_id')->constrained('users');
            $table->string('type'); // Make sure this line exists
            $table->dateTime('deadline')->nullable();
            $table->text('specification')->nullable();
            $table->enum('status', ['Active', 'Completed']);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('projects');
    }
};