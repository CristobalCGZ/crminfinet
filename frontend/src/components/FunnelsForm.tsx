// src/components/FunnelsForm.tsx
import { useState } from 'react';
import { Form, Input, Select, InputNumber, Checkbox, Button, DatePicker, message } from 'antd';
import api from '../api/axiosConfig';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;

export default function FunnelsForm() {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);

    const total_lineas = values.lineas_portadas + values.lineas_nuevas;

    try {
      await api.post('/funnels', {
        ...values,
        total_lineas,
        fecha_proxima_accion: values.fecha_proxima_accion?.format('YYYY-MM-DD'),
      });

      message.success('Funnel creado exitosamente');
    } catch (error) {
      console.error(error);
      message.error('Error al crear el funnel');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        segmento: 'micro',
        riesgo: 'A',
        probabilidad_cierre: 'negociacion',
        equipos: false,
        cesion: false,
        lineas_portadas: 0,
        lineas_nuevas: 0,
        q_equipos: 0,
      }}
      className="bg-white p-6 rounded shadow max-w-2xl mx-auto"
    >
      <h2 className="text-xl font-bold mb-4">Crear Funnel</h2>

      <Form.Item label="RUT Cliente" name="cliente_rut" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Razón Social" name="cliente_razon_social" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Segmento" name="segmento">
        <Select>
          <Option value="micro">Micro</Option>
          <Option value="pequeña">Pequeña</Option>
          <Option value="mediana">Mediana</Option>
          <Option value="ggee1">GGEE1</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Líneas Portadas" name="lineas_portadas">
        <InputNumber min={0} className="w-full" />
      </Form.Item>

      <Form.Item label="Líneas Nuevas" name="lineas_nuevas">
        <InputNumber min={0} className="w-full" />
      </Form.Item>

      <Form.Item name="equipos" valuePropName="checked">
        <Checkbox>¿Incluye equipos?</Checkbox>
      </Form.Item>

      <Form.Item label="Cantidad de Equipos" name="q_equipos">
        <InputNumber min={0} className="w-full" />
      </Form.Item>

      <Form.Item label="Riesgo" name="riesgo">
        <Select>
          {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map(r => (
            <Option key={r} value={r}>{r}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Probabilidad de Cierre" name="probabilidad_cierre">
        <Select>
          <Option value="negociacion">Negociación</Option>
          <Option value="precierre">Precierre</Option>
          <Option value="cierre">Cierre</Option>
          <Option value="perdida">Pérdida</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Fecha Próxima Acción" name="fecha_proxima_accion">
        <DatePicker className="w-full" format="YYYY-MM-DD" />
      </Form.Item>

      <Form.Item label="Comentarios" name="comentarios">
        <TextArea rows={3} />
      </Form.Item>

      <Form.Item label="Nombre Contacto" name="contacto_nombre">
        <Input />
      </Form.Item>

      <Form.Item label="Teléfono Contacto" name="contacto_telefono">
        <Input />
      </Form.Item>

      <Form.Item label="Email Contacto" name="contacto_mail">
        <Input type="email" />
      </Form.Item>

      <Form.Item label="Comuna" name="comuna">
        <Input />
      </Form.Item>

      <Form.Item label="Donante" name="donante">
        <Input />
      </Form.Item>

      <Form.Item name="cesion" valuePropName="checked">
        <Checkbox>Cesión</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Crear Funnel
        </Button>
      </Form.Item>
    </Form>
  );
}
