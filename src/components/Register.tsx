// src/components/Cadastro.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const Cadastro: React.FC = () => {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [emailUsuario, setEmailUsuario] = useState('');
  const [senhaUsuario, setSenhaUsuario] = useState('');
  const [cpfUsuario, setCpfUsuario] = useState('');
  const navigate = useNavigate();

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // chama o back-end no Render (VITE_API_URL já aponta para https://apifinancehub.onrender.com)
      await api.post('/api/usuarios', {
        nomeUsuario,
        emailUsuario,
        senhaUsuario,
        cpfUsuario,
      });
      alert('Usuário cadastrado com sucesso!');
      navigate('/login', { replace: true });
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar usuário');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleCadastro} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Cadastro</h2>

        <input
          type="text"
          placeholder="Nome"
          value={nomeUsuario}
          onChange={e => setNomeUsuario(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={emailUsuario}
          onChange={e => setEmailUsuario(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senhaUsuario}
          onChange={e => setSenhaUsuario(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          placeholder="CPF"
          value={cpfUsuario}
          onChange={e => setCpfUsuario(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
        >
          Cadastrar
        </button>

        {/* Botão de voltar ao login */}
        <button
          type="button"
          onClick={() => navigate('/login', { replace: true })}
          className="w-full mt-3 text-center text-blue-600 hover:underline"
        >
          Voltar ao Login
        </button>
      </form>
    </div>
  );
};

export default Cadastro;
