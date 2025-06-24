import { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('usuario');
    const tokenSalvo = localStorage.getItem('token');

    if (user && tokenSalvo) {
      setUsuario(JSON.parse(user));
      setToken(tokenSalvo);
    }
  }, []);

  const login = (user, token) => {
    setUsuario(user);
    setToken(token);
    localStorage.setItem('usuario', JSON.stringify(user));
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUsuario(null);
    setToken(null);
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ usuario, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
