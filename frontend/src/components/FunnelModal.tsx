// src/components/FunnelModal.tsx
import { useState } from 'react';
import { Modal, Form, Input, Select, InputNumber, DatePicker, Checkbox, message } from 'antd';
import dayjs from 'dayjs';
import api from '@/api/axiosConfig';

const { Option } = Select;

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const FunnelModal: React.FC<Props> = ({ visible, onClose, onSubmit }) => {
  const [form] = Form.useForm();
  const [tipo, setTipo] = useState<'movil' | 'fijo' | null>(null);

  const handleFinish = async (values: any) => {
    const payload = {
      ...values,
      total_lineas: values.lineas_portadas + values.lineas_nuevas,
      fecha_proxima_accion: values.fecha_proxima_accion?.format('YYYY-MM-DD'),
      tipo_funnel: tipo,
    };

    try {
      await api.post('/funnels', payload);
      message.success('Funnel creado correctamente');
      onSubmit();
      form.resetFields();
      setTipo(null);
    } catch (err) {
      message.error('Error al crear funnel');
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setTipo(null);
    onClose();
  };

  return (
    <Modal
      open={visible}
      title="Agregar Nuevo Funnel"
      onCancel={handleCancel}
      onOk={() => form.submit()}
      okText="Guardar"
      width={800}
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Form.Item
          label="Tipo de Funnel"
          name="tipoFunnel"
          rules={[{ required: true, message: 'Selecciona el tipo de funnel' }]}
        >
          <Select
            placeholder="Selecciona tipo"
            onChange={(value) => {
              setTipo(value);
              form.setFieldsValue({ tipoFunnel: value });
            }}
          >
            <Option value="movil">Móvil</Option>
            <Option value="fijo">Fijo</Option>
          </Select>
        </Form.Item>

        {tipo && (
          <>
            <Form.Item name="cliente_rut" label="RUT Cliente" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="cliente_razon_social" label="Razón Social" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="segmento" label="Segmento">
              <Select>
                <Option value="micro">Micro</Option>
                <Option value="pequeña">Pequeña</Option>
                <Option value="mediana">Mediana</Option>
                <Option value="ggee1">GGEE1</Option>
              </Select>
            </Form.Item>

            <Form.Item name="lineas_portadas" label="Líneas Portadas">
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="lineas_nuevas" label="Líneas Nuevas">
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item name="q_equipos" label="Cantidad Equipos">
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="equipos" valuePropName="checked">
              <Checkbox>¿Incluye Equipos?</Checkbox>
            </Form.Item>

            <Form.Item name="riesgo" label="Riesgo">
              <Select>
                {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map(r => (
                  <Option key={r} value={r}>{r}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="probabilidad_cierre" label="Probabilidad de Cierre">
              <Select>
                <Option value="negociacion">Negociación</Option>
                <Option value="precierre">Precierre</Option>
                <Option value="cierre">Cierre</Option>
                <Option value="perdida">Pérdida</Option>
              </Select>
            </Form.Item>

            <Form.Item name="fecha_proxima_accion" label="Fecha Próxima Acción">
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item name="comentarios" label="Comentarios">
              <Input.TextArea rows={3} />
            </Form.Item>

            <Form.Item name="contacto_nombre" label="Nombre Contacto">
              <Input />
            </Form.Item>
            <Form.Item name="contacto_telefono" label="Teléfono Contacto">
              <Input />
            </Form.Item>
            <Form.Item name="contacto_mail" label="Email Contacto">
              <Input />
            </Form.Item>

            <Form.Item name="comuna" label="Comuna">
              <Input />
            </Form.Item>
            <Form.Item name="donante" label="Donante">
              <Input />
            </Form.Item>
            <Form.Item name="cesion" valuePropName="checked">
              <Checkbox>Cesión</Checkbox>
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  );
};

export default FunnelModal;
