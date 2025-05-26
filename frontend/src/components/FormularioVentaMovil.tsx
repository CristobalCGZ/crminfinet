// FormularioVentaMovil.tsx
import React from 'react';
import { Form, Input, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

interface Props {
  onRutChange: (field: string, value: string) => void;
}

const FormularioVentaMovil: React.FC<Props> = ({ onRutChange }) => (
  <>
    <Form.Item name="rutEmpresa" label="RUT Empresa" rules={[{ required: true }]}> 
      <Input onChange={(e) => onRutChange('rutEmpresa', e.target.value)} />
    </Form.Item>
    <Form.Item name="nombreEmpresa" label="Nombre Empresa" rules={[{ required: true }]}> 
      <Input />
    </Form.Item>
    <Form.Item name="rutRRLL" label="RUT RRLL" rules={[{ required: true }]}> 
      <Input onChange={(e) => onRutChange('rutRRLL', e.target.value)} />
    </Form.Item>
    <Form.Item name="nombreRRLL" label="Nombre Completo RRLL" rules={[{ required: true }]}> 
      <Input />
    </Form.Item>
    <Form.Item name="telefono" label="Teléfono" rules={[{ required: true }]}> 
      <Input type="tel" />
    </Form.Item>
    <Form.Item name="correo" label="Correo" rules={[{ required: true }]}> 
      <Input type="email" />
    </Form.Item>
    <Form.Item name="direccionComercial" label="Dirección Comercial" rules={[{ required: true }]}> 
      <Input />
    </Form.Item>
    <Form.Item name="direccionDespacho" label="Dirección Despacho" rules={[{ required: true }]}> 
      <Input />
    </Form.Item>
    <Form.Item name="nombreContactoDespacho" label="Nombre Contacto Despacho" rules={[{ required: true }]}> 
      <Input />
    </Form.Item>
    <Form.Item name="telefonoContactoDespacho" label="Teléfono Contacto Despacho" rules={[{ required: true }]}> 
      <Input type="tel" />
    </Form.Item>
    <Form.Item name="detalleServicio" label="Detalle Servicio" rules={[{ required: true }]}> 
      <Input.TextArea rows={3} />
    </Form.Item>
    <Form.Item name="portabilidad" label="Portabilidad"> 
      <Input />
    </Form.Item>
    <Form.Item name="numerosPortar" label="Números a Portar"> 
      <Input />
    </Form.Item>
    <Form.Item name="equipos" label="Equipos"> 
      <Input />
    </Form.Item>
  {/* 
    <Form.Item name="rutVendedor" label="RUT Vendedor" rules={[{ required: true }]}> 
      <Input onChange={(e) => onRutChange('rutVendedor', e.target.value)} />
    </Form.Item>
    <Form.Item name="nombreVendedor" label="Nombre Vendedor"> 
      <Input disabled />
    </Form.Item>
    <Form.Item name="codigoVendedor" label="Código Vendedor"> 
      <Input disabled />
    </Form.Item>
    */}
    <Form.Item name="archivos" label="Adjuntar Archivos"> 
      <Dragger>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Haz clic o arrastra los archivos aquí</p>
      </Dragger>
    </Form.Item>
  </>
);

export default FormularioVentaMovil;
