import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx'

export const PrivateRoute = ({ children }) => {
  const { usuario } = useContext(AuthContext)

  return usuario ? children : <Navigate to="/login" />
}