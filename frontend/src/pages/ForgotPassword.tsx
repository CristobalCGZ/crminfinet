import React, { useState } from 'react';
import { Form, Input, Button, Typography, Alert } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import './Auth.css';

const { Title, Text } = Typography;

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onFinish = async (values: any) => {
    setLoading(true);
    setStatusMessage(null);
    setErrorMessage(null);

    try {
      const response = await fetch('http://localhost:8000/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMessage('Se ha enviado un correo con instrucciones para restablecer tu contraseña.');
      } else {
        let msg = 'Ocurrió un error';

        if (data?.errors) {
          const errores = Object.values(data.errors) as string[][];
          if (errores.length > 0 && errores[0].length > 0) {
            msg = errores[0][0];
          }
        } else if (data?.message) {
          msg = data.message;
        }

        setErrorMessage(msg);
      }
    } catch (error) {
      setErrorMessage('No se pudo conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <motion.div
        className="auth-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Title level={3} style={{ textAlign: 'center' }}>
          ¿Olvidaste tu contraseña?
        </Title>
        <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginBottom: 20 }}>
          Ingresa tu correo para enviarte un enlace de recuperación
        </Text>

        {statusMessage && (
          <Alert message={statusMessage} type="success" showIcon style={{ marginBottom: 16 }} />
        )}

        {errorMessage && (
          <Alert message={errorMessage} type="error" showIcon style={{ marginBottom: 16 }} />
        )}

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="email"
            label="Correo electrónico"
            rules={[{ required: true, message: 'Ingresa tu correo' }]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="usuario@infinet.cl"
              size="large"
              type="email"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large" loading={loading}>
              Enviar instrucciones
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center', marginTop: 10 }}>
          <a href="/login">Volver al inicio de sesión</a>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
