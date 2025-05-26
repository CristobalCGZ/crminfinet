<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\VentaController;
use App\Http\Controllers\FunnelController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Auth\PasswordResetController;
use App\Http\Controllers\DocumentoController;

// ✅ LOGIN sin middleware web (NO USAR 'web' en APIs)
Route::middleware(['web'])->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
});


// ✅ Recuperación de contraseña
Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail']);
Route::post('/reset-password', [ResetPasswordController::class, 'reset']);

// ✅ Rutas protegidas con auth:sanctum
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Ventas (puedes refactorizar a ventas_backoffice más adelante)
    Route::post('/ventas', [VentaController::class, 'store']);
    Route::get('/ventas/{id}', [VentaController::class, 'show']);
    Route::post('/ventas/{id}/documentos', [DocumentoController::class, 'store']);
    Route::get('/ventas/{id}/documentos', [DocumentoController::class, 'index']);

    // 🆕 Funnels
    Route::apiResource('/funnels', FunnelController::class);
});

// ✅ DEBUG: Acceso a funnels sin login (temporal, eliminar luego)
Route::get('/funnels', [FunnelController::class, 'index']); // Solo para desarrollo
