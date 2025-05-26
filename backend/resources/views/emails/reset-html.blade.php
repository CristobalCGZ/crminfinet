<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Restablecer tu contraseña - INFINET</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4;">
  <table cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f4f4; padding: 30px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; font-family: Arial, sans-serif;">
          <!-- Logo -->
          <tr>
            <td align="center" style="padding: 30px 20px 10px;">
              <img src="https://i.ibb.co/YvpmqLW/logo-INFINET.png" alt="INFINET" width="140" style="display: block;">
            </td>
          </tr>

          <!-- Título -->
          <tr>
            <td align="center" style="padding: 10px 40px 0;">
              <h1 style="font-size: 22px; color: #004aad; margin: 0;">¿Olvidaste tu contraseña?</h1>
            </td>
          </tr>

          <!-- Texto principal -->
          <tr>
            <td style="padding: 20px 40px; color: #333333; font-size: 16px; line-height: 1.6;">
              <p style="margin: 0 0 20px;">Hola <strong>{{ $name }}</strong>,</p>
              <p style="margin: 0 0 20px;">Recibimos una solicitud para restablecer tu contraseña en <strong>INFINET CRM</strong>.</p>
              <p style="margin: 0 0 20px;">Haz clic en el botón de abajo para continuar:</p>

              <!-- Botón -->
              <table cellspacing="0" cellpadding="0" style="margin: 20px 0;">
                <tr>
                  <td align="center" bgcolor="#004aad" style="border-radius: 8px;">
                    <a href="{{ $url }}" target="_blank" style="display: inline-block; padding: 14px 26px; font-size: 16px; color: #ffffff; background: linear-gradient(90deg, #004aad, #f59e0b); border-radius: 8px; text-decoration: none; font-weight: bold;">
                      Restablecer contraseña
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 10px;">Este enlace expirará en 60 minutos.</p>
              <p style="margin: 0;">Si tú no solicitaste este cambio, puedes ignorar este correo.</p>
            </td>
          </tr>

          <!-- Enlace de respaldo -->
          <tr>
            <td style="padding: 10px 40px;">
              <p style="font-size: 13px; color: #888888; line-height: 1.5;">
                Si el botón no funciona, copia y pega este enlace en tu navegador:<br>
                <a href="{{ $url }}" style="color: #004aad; word-break: break-all;">{{ $url }}</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 25px 20px; font-size: 12px; color: #999999; background-color: #fafafa;">
              © {{ date('Y') }} INFINET. Todos los derechos reservados.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
