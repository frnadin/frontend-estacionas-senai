import React, { forwardRef } from 'react';
import './NotificationModal.css';

const notifications = [
  // { id: 1, icon: '📄', text: 'Você enviou sua tarefa para Backend do controle de estacionamento', time: '5 dias 22 horas atrás' },
];

const NotificationModal = forwardRef(({ show }, ref) => {
  if (!show) return null;

  return (
    <div className="notification-modal" ref={ref}>
      <div className="notification-header">
        <h3>Notificações</h3>
        <div className="notification-actions"></div>
      </div>

      <div className="notification-list">
        {notifications.length === 0 ? (
          <p style={{ padding: '1rem', textAlign: 'center' }}>Nenhuma notificação disponível.</p>
        ) : (
          notifications.map(notification => (
            <div key={notification.id} className="notification-item">
              <span className="notification-icon">{notification.icon}</span>
              <div className="notification-content">
                <p>{notification.text}</p>
                <small>{notification.time}</small>
              </div>
              <a href="#" className="notification-link">Ver notificação completa</a>
            </div>
          ))
        )}
      </div>

      <div className="notification-footer">
        <a href="#">Mostrar todos</a>
      </div>
    </div>
  );
});

export default NotificationModal;
