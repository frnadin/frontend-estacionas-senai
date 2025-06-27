import { useState, useEffect } from 'react';

export function usePopup({ notificationRef, userMenuRef }) {
  const [popupAtivo, setPopupAtivo] = useState(null);

  const togglePopup = (nome) => {
    setPopupAtivo((prev) => (prev === nome ? null : nome));
  };

  useEffect(() => {
    function handleClickOutside(event) {
      const clicouForaNotificacao =
        popupAtivo === 'notificacao' &&
        notificationRef.current &&
        !notificationRef.current.contains(event.target);

      const clicouForaPerfil =
        popupAtivo === 'perfil' &&
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target);

      if (clicouForaNotificacao || clicouForaPerfil) {
        setPopupAtivo(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [popupAtivo, notificationRef, userMenuRef]);

  return { popupAtivo, togglePopup };
}
