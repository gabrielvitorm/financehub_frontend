// src/components/Login.tsx
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../services/api'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // se já tiver token, redireciona automaticamente
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard', { replace: true })
    }
  }, [navigate])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    console.log('▶️ handleSubmit chamado', { email, senha })  // <--- veja no console
    try {
      const res = await api.post('/auth/login', { email, senha })
      console.log('✅ resposta do login', res.data)             // <--- e aqui
      const token = res.data.token as string
      localStorage.setItem('token', token)
      localStorage.setItem('authenticated', 'true')
      navigate('/dashboard', { replace: true })
    } catch (err) {
      console.error('❌ erro no login', err)
      setError('E-mail ou senha inválidos')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Entrar</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1">E-mail</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="senha" className="block mb-1">Senha</label>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              placeholder="••••••••"
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
  )
}

export default Login
