import React, { useEffect } from 'react';
import { Button, message } from 'antd';

message.config({
  getContainer: () => document.body,
  top: 100,
  duration: 3,
});

const TestMessage: React.FC = () => {
  useEffect(() => {
    message.success('✅ Mensaje cargado desde useEffect');
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <Button onClick={() => message.info('🔔 Mensaje desde botón')}>
        Mostrar mensaje
      </Button>
    </div>
  );
};

export default TestMessage;
