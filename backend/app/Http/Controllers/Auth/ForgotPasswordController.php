<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;

class ForgotPasswordController extends Controller
{
    public function sendResetLinkEmail(Request $request)
    {
        App::setLocale('es'); //Idioma a español testing
        $request->validate(['email' => 'required|email']);

        $status = Password::sendResetLink($request->only('email'));

        // Mostrar el mensaje exacto que Laravel devuelve
        return response()->json([
            'message' => $status,
        ], $status === Password::RESET_LINK_SENT ? 200 : 400);
    }
}
