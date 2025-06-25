import React from 'react';
import './ErrorPage.css';
import errorImage from '../../../public/mario-rodando.gif';
import { FaHome } from "react-icons/fa";

function ErrorPage({ statusCode, message }) {

  const defaultMessage = "Ops! Parece que algo deu errado ou a página que você procura não existe.";
  const displayMessage = message || defaultMessage;

  const displayStatusCode = statusCode || "Erro";

  return (
    <div className="error-page-container">
      <img src={errorImage} alt="Página de Erro" className="error-image" />
      <h1>{displayStatusCode}</h1>
      <p>{displayMessage}</p>
      <button onClick={() => window.location.href = '/'}>
      <FaHome className='icon' />
      </button>
    </div>
  );
}

export default ErrorPage;