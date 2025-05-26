<?php

use Illuminate\Support\Facades\Route;

// Página inicial (opcional)
Route::get('/', function () {
    return view('welcome');
});

// ✅ Esta ruta es CLAVE para Sanctum
Route::middleware('web')->get('/sanctum/csrf-cookie', function () {
    return response()->json(['csrf_token' => csrf_token()]);
});
