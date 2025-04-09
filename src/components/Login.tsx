import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [emailUsuario, setEmailUsuario] = useState('');
  const [senhaUsuario, setSenhaUsuario] = useState('');
  const [showRecovery, setShowRecovery] = useState(false);
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [novaSenha, setNovaSenha] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/usuarios/login', {
        emailUsuario,
        senhaUsuario,
      });

      // Salvar e-mail no localStorage
      localStorage.setItem('emailUsuario', emailUsuario);

      // Redirecionar para o Dashboard
      navigate('/dashboard');
    } catch (error) {
      alert('Email ou senha incorretos!');
    }
  };

  const handlePasswordRecovery = async () => {
    try {
      await axios.patch('http://localhost:8080/api/usuarios/atualizar-senha-email-cpf', {
        emailUsuario: email,
        cpfUsuario: cpf,
        novaSenha,
      });
      alert('Senha atualizada com sucesso!');
      setShowRecovery(false);
      setCpf('');
      setEmail('');
      setNovaSenha('');
    } catch (error) {
      alert('Erro ao recuperar senha.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-2">Finance Hub</h1>
        <h2 className="text-xl font-semibold mb-6 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={emailUsuario}
          onChange={(e) => setEmailUsuario(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senhaUsuario}
          onChange={(e) => setSenhaUsuario(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Entrar
        </button>

        <button
          type="button"
          className="block mt-4 text-sm text-gray-600 hover:underline w-full text-center"
          onClick={() => setShowRecovery(!showRecovery)}
        >
          Esqueceu a senha?
        </button>

        <div className="mt-4 text-sm text-center">
          <span>Não tem uma conta? </span>
          <Link to="/cadastro" className="text-blue-600 hover:underline">
            Cadastre-se
          </Link>
        </div>

        {showRecovery && (
          <div className="mt-6 border-t pt-4">
            <h3 className="text-md font-semibold text-center mb-2">Recuperar Senha</h3>
            <input
              type="text"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="w-full p-2 mb-2 border rounded"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-2 border rounded"
              required
            />
            <input
              type="password"
              placeholder="Nova Senha"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              className="w-full p-2 mb-2 border rounded"
              required
            />
            <button
              type="button"
              onClick={handlePasswordRecovery}
              className="w-full bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
            >
              Recuperar Senha
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
