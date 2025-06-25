import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/LoginPage/login.jsx';
import Home from './pages/HomePage/home.jsx';
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
    </Routes>
  );
}

export default App;
