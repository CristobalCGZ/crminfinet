import React, { useState } from 'react';
import {
  Modal,
  Form,
  Input,
  Select,
  Upload,
  Button,
  DatePicker,
  TimePicker,
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import './VentaModal.css';
import FormularioVentaMovil from './FormularioVentaMovil';
import FormularioVentaFijo from './FormularioVentaFijo';


const { Option } = Select;
const { Dragger } = Upload;

interface VentaModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const formatRUT = (rut: string) => {
  rut = rut.replace(/[^0-9kK]/g, '').toUpperCase();
  if (rut.length <= 1) return rut;
  let cuerpo = rut.slice(0, -1);
  let dv = rut.slice(-1);
  return cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '-' + dv;
};

const VentaModal: React.FC<VentaModalProps> = ({ visible, onClose, onSubmit }) => {
  const [form] = Form.useForm();
  const [tipoVenta, setTipoVenta] = useState<'movil' | 'fijo' | null>(null);

  const handleTipoChange = (value: 'movil' | 'fijo') => {
  setTipoVenta(value);

  // Restablecer todos los campos excepto 'tipoVenta'
  const currentValues = form.getFieldsValue();
  form.resetFields();
  form.setFieldsValue({ tipoVenta: value, ...currentValues });
};

  const handleRutChange = (field: string, value: string) => {
    form.setFieldsValue({ [field]: formatRUT(value) });
  };

  return (
    <Modal
      open={visible}
      title="Registrar Venta"
      onCancel={() => {
        onClose();
        form.resetFields();
        setTipoVenta(null);
      }}
      onOk={() => form.submit()}
      okText="Guardar"
      width={800}
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item
  name="tipoVenta"
  label="Tipo de Venta"
  rules={[{ required: true, message: 'Selecciona el tipo de venta' }]}
>
  <Select
    placeholder="Selecciona una opción"
    value={tipoVenta}
    onChange={handleTipoChange}
  >
    <Option value="movil">Pyme Móvil</Option>
    <Option value="fijo">Pyme Fijo</Option>
  </Select>
</Form.Item>


        {/* Mostrar resto del formulario solo si ya se eligió tipo de venta */}
        {tipoVenta === 'movil' && <FormularioVentaMovil onRutChange={handleRutChange} />}
        {tipoVenta === 'fijo' && <FormularioVentaFijo onRutChange={handleRutChange} />}

      </Form>
    </Modal>
  );
};

export default VentaModal;
