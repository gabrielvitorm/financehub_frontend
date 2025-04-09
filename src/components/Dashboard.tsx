// src/components/Dashboard.tsx
import { useEffect, useState } from 'react';
import { Transacao } from '../types';
import { getTransacoes } from '../services/transacaoService';

export default function Dashboard() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);

  useEffect(() => {
    getTransacoes().then(setTransacoes);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Finance Hub - Dashboard</h1>
      </header>

      <main className="p-6 max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Minhas Transações</h2>
        {transacoes.length > 0 ? (
          transacoes.map((t) => (
            <div
              key={t.idTransacao}
              className="bg-white p-4 shadow-md rounded-md mb-4"
            >
              <h3 className="text-lg font-semibold">{t.descricao}</h3>
              <p>Nome: {t.nomeTransaca}</p>
              <p>Descrição: {t.descricaoTransacao}</p>
              <p>Valor: R$ {t.valor.toFixed(2)}</p>
              <p>Tipo: {t.tipoTransacao}</p>
              <p>Categoria: {t.tipoCategoria}</p>
              <p>Data: {new Date(t.dataCriacao).toLocaleDateString('pt-BR')}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Nenhuma transação encontrada.</p>
        )}
      </main>
    </div>
  );
}
