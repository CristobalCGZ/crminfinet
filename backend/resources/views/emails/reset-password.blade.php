@component('mail::message')
<div style="text-align: center; margin-bottom: 20px;">
  <img src="{{ asset('img/logoinfinet.png') }}" alt="INFINET" style="width: 150px;">
</div>

# Restablece tu contraseña

Hola **{{ $name }}**,  
Recibimos una solicitud para restablecer tu contraseña en **INFINET CRM**.

@component('mail::button', ['url' => $url, 'color' => 'blue'])
Restablecer contraseña
@endcomponent

> Este enlace expirará en **60 minutos**.  
Si tú no solicitaste este cambio, puedes ignorar este mensaje.

---

Saludos,  
**Equipo INFINET** 🚀

@slot('subcopy')
Si el botón no funciona, copia y pega este enlace en tu navegador:  
[{{ $url }}]({{ $url }})
@endslot
@endcomponent
