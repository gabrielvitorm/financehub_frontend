// src/components/Login.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Se já tiver token, redireciona direto
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // 1) Faz login
      const res = await api.post('/auth/login', { email, senha });

      // 2) Armazena o token e marca como autenticado
      const token = res.data.token as string;
      localStorage.setItem('token', token);
      localStorage.setItem('authenticated', 'true');

      // 3) Redireciona para dashboard
      navigate('/dashboard', { replace: true });
    } catch {
      setError('E-mail ou senha inválidos');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Entrar</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>
        <div className="flex justify-between mt-4 text-sm">
          <Link to="/register" className="text-blue-600 hover:underline">
            Criar conta
          </Link>
          <Link to="/recover" className="text-blue-600 hover:underline">
            Recuperar senha
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
