import React from 'react';
import { Form, Input, DatePicker, TimePicker, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

interface Props {
  onRutChange: (field: string, value: string) => void;
}

const FormularioVentaFijo: React.FC<Props> = ({ onRutChange }) => {
  return (
    <>
      <Form.Item name="rutEmpresaF" label="RUT Empresa" rules={[{ required: true }]}> 
        <Input onChange={(e) => onRutChange('rutEmpresaF', e.target.value)} />
      </Form.Item>
      <Form.Item name="empresa" label="Empresa" rules={[{ required: true }]}> 
        <Input />
      </Form.Item>
      <Form.Item name="rrllRut" label="RRLL RUT" rules={[{ required: true }]}> 
        <Input onChange={(e) => onRutChange('rrllRut', e.target.value)} />
      </Form.Item>
      <Form.Item name="rrll" label="RRLL" rules={[{ required: true }]}> 
        <Input />
      </Form.Item>
      <Form.Item name="numero" label="Número"> 
        <Input />
      </Form.Item>
      <Form.Item name="correo" label="Correo"> 
        <Input type="email" />
      </Form.Item>
      <Form.Item name="direccion" label="Dirección"> 
        <Input />
      </Form.Item>
      <Form.Item name="tecnologia" label="Tecnología"> 
        <Input />
      </Form.Item>
      <Form.Item name="producto" label="Producto"> 
        <Input />
      </Form.Item>
      <Form.Item name="adicionales" label="Adicionales"> 
        <Input />
      </Form.Item>
      <Form.Item name="oferta" label="Oferta"> 
        <Input />
      </Form.Item>
      {/* 
      <Form.Item name="rutVendedorF" label="RUT Vendedor" rules={[{ required: true }]}> 
        <Input onChange={(e) => onRutChange('rutVendedorF', e.target.value)} />
      </Form.Item>
      <Form.Item name="nombreVendedorF" label="Nombre Vendedor"> 
        <Input disabled />
      </Form.Item>
      <Form.Item name="codigoVendedorF" label="Código Vendedor"> 
        <Input disabled />
      </Form.Item>
      */}
      <Form.Item name="portabilidad" label="Portabilidad"> 
        <Input />
      </Form.Item>
      <Form.Item name="numeroPortabilidad" label="Número Portabilidad"> 
        <Input />
      </Form.Item>
      <Form.Item name="contactoTecnico" label="Contacto Técnico"> 
        <Input />
      </Form.Item>
      <Form.Item name="fonoContacto" label="Fono Contacto"> 
        <Input />
      </Form.Item>
      <Form.Item name="fechaAgenda" label="Fecha Agenda"> 
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name="horaAgenda" label="Hora Agenda"> 
        <TimePicker style={{ width: '100%' }} format="HH:mm" />
      </Form.Item>
      <Form.Item name="archivosF" label="Adjuntar Archivos"> 
        <Dragger>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Haz clic o arrastra los archivos aquí</p>
        </Dragger>
      </Form.Item>
    </>
  );
};

export default FormularioVentaFijo;
