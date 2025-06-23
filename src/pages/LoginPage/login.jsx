import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './login.css'

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
        <h1>Bem-vindo!</h1>
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
