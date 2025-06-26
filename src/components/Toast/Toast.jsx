import React, { useEffect } from 'react';
import './Toast.css';

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000); // fecha em 4 segundos
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast-container">
      <div className="toast-message">{message}</div>
    </div>
  );
}
