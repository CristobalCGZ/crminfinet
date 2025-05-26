<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class ResetPasswordNotification extends Notification
{
    public $token;

    public function __construct($token)
    {
        $this->token = $token;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        $resetUrl = url("http://localhost:5173/reset-password?token={$this->token}&email={$notifiable->getEmailForPasswordReset()}");

        return (new \Illuminate\Notifications\Messages\MailMessage)
            ->subject('🔐 Restablecer tu contraseña - Infinet CRM')
            ->view('emails.reset-html', [
                'url' => $resetUrl,
                'name' => $notifiable->name,
            ]);
    }

}
