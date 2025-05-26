<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('funnels', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('cliente_rut');
            $table->string('cliente_razon_social');
            $table->string('segmento');
            $table->integer('lineas_portadas')->default(0);
            $table->integer('lineas_nuevas')->default(0);
            $table->integer('total_lineas')->default(0);
            $table->boolean('equipos')->default(false);
            $table->integer('q_equipos')->default(0);
            $table->string('riesgo');
            $table->string('probabilidad_cierre'); // negociacion, precierre, cierre, perdida
            $table->date('fecha_proxima_accion')->nullable();
            $table->text('comentarios')->nullable();
            $table->string('contacto_nombre')->nullable();
            $table->string('contacto_telefono')->nullable();
            $table->string('contacto_mail')->nullable();
            $table->boolean('cesion')->default(false);
            $table->string('comuna')->nullable();
            $table->string('donante')->nullable();
            $table->string('porta')->nullable();
            $table->string('alta')->nullable();
            $table->string('bam')->nullable();
            $table->string('total_voz')->nullable();
            $table->string('total')->nullable();
            $table->string('equipo')->nullable();
            $table->enum('estado', ['activo', 'cerrado'])->default('activo');

            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('funnels');
    }
};
