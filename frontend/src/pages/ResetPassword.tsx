// src/pages/ResetPassword.tsx

import React, { useEffect } from 'react';
import { Form, Input, Button, Typography, Card, message } from 'antd';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const { Title, Text } = Typography;

const ResetPassword: React.FC = () => {
  const [form] = Form.useForm();
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const email = params.get('email');
  const token = params.get('token');

  useEffect(() => {
    if (!email || !token) {
      message.error('El enlace no es válido o está incompleto.');
      navigate('/login');
    }
  }, [email, token, navigate]);

  const onFinish = async (values: any) => {
    try {
      await axios.post('/api/reset-password', {
        email,
        token,
        password: values.password,
        password_confirmation: values.password_confirmation,
      });
      message.success('Tu contraseña ha sido actualizada.');
      navigate('/login');
    } catch (error: any) {
      if (error.response?.data?.errors) {
        form.setFields(
          Object.entries(error.response.data.errors).map(([field, messages]) => ({
            name: field,
            errors: messages as string[],
          }))
        );
      } else {
        message.error('No se pudo actualizar la contraseña. Intenta nuevamente.');
      }
    }
  };

  return (
    <div className="auth-container">
      <Card className="auth-card">
        <Title level={3} style={{ textAlign: 'center', marginBottom: 20 }}>
          Restablecer contraseña
        </Title>
        <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginBottom: 25 }}>
          Ingresa tu nueva contraseña para continuar
        </Text>

        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            name="password"
            label="Nueva contraseña"
            rules={[
              { required: true, message: 'La contraseña es obligatoria' },
              { min: 8, message: 'Mínimo 8 caracteres' },
            ]}
            hasFeedback
          >
            <Input.Password size="large" placeholder="Nueva contraseña" />
          </Form.Item>

          <Form.Item
            name="password_confirmation"
            label="Confirmar contraseña"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Debes confirmar tu contraseña' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Las contraseñas no coinciden'));
                },
              }),
            ]}
          >
            <Input.Password size="large" placeholder="Repite la contraseña" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              Guardar nueva contraseña
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center', marginTop: 10 }}>
          <a href="/login">Volver al inicio de sesión</a>
        </div>
      </Card>
    </div>
  );
};

export default ResetPassword;
