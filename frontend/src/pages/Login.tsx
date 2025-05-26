import React, { useState } from 'react';
import { Form, Input, Button, Typography, Alert } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import loginIllustration from '../assets/login-illustration.svg';

const { Title } = Typography;

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setLoading(true);
    setLoginError(null);

    try {
      // Paso 1: Obtener la cookie CSRF desde Sanctum
      await fetch('http://localhost:8000/sanctum/csrf-cookie', {
        method: 'GET',
        credentials: 'include',
      });

      // Paso 2: Leer el token CSRF desde la cookie
      const csrfToken = decodeURIComponent(
        document.cookie
          .split('; ')
          .find((row) => row.startsWith('XSRF-TOKEN='))?.split('=')[1] || ''
      );

      // Paso 3: Enviar login con el token en el header
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-XSRF-TOKEN': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (response.ok) {
        localStorage.setItem('token', 'authenticated');
        navigate('/dashboard');
      } else {
        let errorMsg = 'Correo o contraseña incorrectos';

        try {
          const data = await response.json();
          if (data?.errors) {
            const errores = Object.values(data.errors) as string[][];
            if (errores.length > 0 && errores[0].length > 0) {
              errorMsg = errores[0][0];
            }
          } else if (data?.message) {
            errorMsg = data.message;
          }
        } catch {
          // Falló parseo JSON
        }

        setLoginError(errorMsg);
      }
    } catch {
      setLoginError('No se pudo conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <motion.div
        className="login-box"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.div
          className="login-image"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img src={loginIllustration} alt="Login Illustration" />
        </motion.div>

        <motion.div
          className="login-form-wrapper"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Form name="login" layout="vertical" onFinish={onFinish} className="login-form">
            <Title level={3}>Bienvenido a INFIRED</Title>

            {loginError && (
              <Alert
                message={loginError}
                type="error"
                showIcon
                style={{ marginBottom: 16 }}
              />
            )}

            <Form.Item
              name="email"
              label="Correo electrónico"
              rules={[{ required: true, message: 'Por favor ingresa tu correo' }]}
              className="login-input"
            >
              <Input prefix={<MailOutlined />} placeholder="usuario@infinet.cl" size="large" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Contraseña"
              rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
              className="login-input"
            >
              <Input.Password prefix={<LockOutlined />} placeholder="********" size="large" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                loading={loading}
                className="login-button"
              >
                Ingresar
              </Button>
            </Form.Item>

            <div className="reset-text">
              <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
            </div>
          </Form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
