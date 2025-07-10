import { LoginPayload, RegisterPayload } from '@/types/login-payload';
import api from '@/utils/axios-instance';

export const login = async (payload: LoginPayload) => {
  const response = await api.post('/auth/login', payload);
  return response.data;
};
export const register = async (payload: RegisterPayload) => {
  const response = await api.post('/auth/register', payload);
  return response.data;
};
