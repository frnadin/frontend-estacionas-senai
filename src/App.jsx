import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/LoginPage/login.jsx';
import Home from './pages/homePage/home.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
