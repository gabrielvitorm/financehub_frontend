import { api } from './api';
import { Transacao } from '../types';

export const getTransacoes = async (): Promise<Transacao[]> => {
  const response = await api.get<Transacao[]>('/transacoes');
  return response.data;
};
