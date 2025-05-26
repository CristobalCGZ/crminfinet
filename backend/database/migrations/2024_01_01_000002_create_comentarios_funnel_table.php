<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('comentarios_funnel', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('funnel_id');
            $table->unsignedBigInteger('user_id');
            $table->text('comentario');
            $table->timestamps();

            $table->foreign('funnel_id')->references('id')->on('funnels')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down(): void {
        Schema::dropIfExists('comentarios_funnel');
    }
};
