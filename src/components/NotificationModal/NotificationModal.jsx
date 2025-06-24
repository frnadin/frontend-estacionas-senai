import React from 'react';
import './NotificationModal.css';

// DADOS DE EXEMPLO - Substitua por dados da sua API
const notifications = [
  // { id: 1, icon: '📄', text: 'Você enviou sua tarefa para Backend do controle de estacionamento', time: '5 dias 22 horas atrás' },
  // { id: 2, icon: '📄', text: 'Você enviou sua tarefa para Envio dos arquivos do SAEP', time: '7 dias 21 horas atrás' },
  // { id: 3, icon: '⏰', text: 'Últimos dias da Avaliação Online', time: '20 dias 19 horas atrás' },
  // { id: 4, icon: '📄', text: 'Rafael Coelho Ventura retornou feedback para a tarefa Prova_pratica_02_api_entrega', time: '38 dias 22 horas atrás' },
  // { id: 5, icon: '⏰', text: 'Lembrete Quinzenal', time: '39 dias 20 horas atrás' },
];

function NotificationModal({ show }) {
  // Se a prop 'show' for false, o componente não renderiza nada.
  if (!show) {
    return null;
  }

  return (
    <div className="notification-modal">
      <div className="notification-header">
        <h3>Notificações</h3>
        <div className="notification-actions">
        </div>
      </div>
      <div className="notification-list">
        {notifications.map(notification => (
          <div key={notification.id} className="notification-item">
            <span className="notification-icon">{notification.icon}</span>
            <div className="notification-content">
              <p>{notification.text}</p>
              <small>{notification.time}</small>
            </div>
            <a href="#" className="notification-link">Ver notificação completa</a>
          </div>
        ))}
      </div>
      <div className="notification-footer">
        <a href="#">Mostrar todos</a>
      </div>
    </div>
  );
}

export default NotificationModal;