import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './login.css'
import { FaEnvelope } from 'react-icons/fa';


function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    // Aqui você pode adicionar a lógica de autenticação
    console.log('Email:', email);
    console.log('Senha:', password);

    // Navegar para a página inicial após o login
    navigate('/home');
  }

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-info">

          <div className="login-header">
            <h2>Bem-vindo ao</h2>
            <h2>Estacionamento Digital</h2>
            <h2>SENAI - São José</h2>
          </div>


          <div className="login-bottom">
            <div className='logos'>
              <img src="/logo-sesi.fw_.png" alt="Logo SESI" className="sesi-logo" />
              <img src="/logo-senai.fw_.png" alt="Logo SENAI" className="senai-logo" />
            </div>
            <div className="contatos">
              <a href="mailto:fernandogutilla@hotmail.com">
                <FaEnvelope style={{ marginRight: '8px' }} />
                Fernando - Full Stack</a>
              <a href="mailto:marques@sc.senai.br">
                <FaEnvelope style={{ marginRight: '8px' }} />
                Marques - Full Stack</a>
            </div>

            <p className="copyright">©2025 SENAI – Todos os direitos reservados.</p>

          </div>
        </div>

      </div>

      <div className="login-right">
        <div className="login-form">
          <h2>PARK<span>ZONE</span> SENAI</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
            />

            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />

            <button type="submit">Entrar</button>
          </form>
        </div>
      </div>
    </div>
  )

}
export default Login
