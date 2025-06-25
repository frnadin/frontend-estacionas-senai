// src/pages/ErrorPage/ErrorPage.jsx
import React from 'react';
import './ErrorPage.css';
import errorImage from '../../../public/error.png'; // Certifique-se de que o caminho está correto

function ErrorPage({ statusCode, message }) {
  // Define uma mensagem padrão se nenhuma for passada
  const defaultMessage = "Ops! Parece que algo deu errado ou a página que você procura não existe.";
  const displayMessage = message || defaultMessage;

  // Define o código de status padrão se nenhum for passado
  const displayStatusCode = statusCode || "Erro";

  return (
    <div className="error-page-container">
      <img src={errorImage} alt="Página de Erro" className="error-image" />
      <h1>{displayStatusCode}</h1>
      <p>{displayMessage}</p>
      <button onClick={() => window.location.href = '/'}>
        Voltar para a Página Inicial
      </button>
    </div>
  );
}

export default ErrorPage;