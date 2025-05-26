<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('ventas_backoffice', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('funnel_id')->unique();
            $table->unsignedBigInteger('backoffice_user_id')->nullable();

            $table->string('folio')->nullable();
            $table->timestamp('informe')->nullable(); // se genera al crear
            $table->date('ingreso_gsbpo')->nullable();

            $table->string('porta')->nullable();
            $table->string('alta')->nullable();
            $table->string('bam')->nullable();
            $table->string('total_voz')->nullable();
            $table->string('total')->nullable();
            $table->string('equipo')->nullable();

            $table->string('estado')->default('pendiente'); // muchos estados posibles
            $table->text('observaciones')->nullable();
            $table->timestamp('aaa')->nullable(); // auto cuando pasa a "Entregado/Portado"

            $table->timestamps();

            $table->foreign('funnel_id')->references('id')->on('funnels')->onDelete('cascade');
            $table->foreign('backoffice_user_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    public function down(): void {
        Schema::dropIfExists('ventas_backoffice');
    }
};
