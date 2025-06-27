import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/LoginPage/login.jsx';
import Home from './pages/HomePage/home.jsx';
import Usuarios from './pages/UsersPage/UsersPage.jsx';
import Permissoes from './pages/PermissoesPage/PermissoesPage.jsx';
import Veiculos from './pages/VeiculosPage/VeiculosPage.jsx';
import Registros from './pages/RegistroPage/RegistroPage.jsx';
import { PrivateRoute } from './routes/PrivateRoute.jsx';
import Error from './pages/ErrorPage/ErrorPage.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/erro" element={<Error />} />

      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/users"
        element={
          <PrivateRoute>
            <Usuarios />
          </PrivateRoute>
        }
      />
      <Route
        path="/permissoes"
        element={
          <PrivateRoute>
            <Permissoes />
          </PrivateRoute>
        }
      />
      <Route
        path="/veiculos"
        element={
          <PrivateRoute>
            <Veiculos />
          </PrivateRoute>
        }
      />

      <Route
        path="/registro"
        element={
          <PrivateRoute>
            <Registros />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
