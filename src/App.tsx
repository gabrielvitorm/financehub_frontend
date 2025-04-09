import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/sucesso" element={<div className="text-center mt-20 text-green-600 text-2xl">Login feito com sucesso!</div>} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Aqui! */}
      </Routes>
    </Router>
  );
}

export default App;

