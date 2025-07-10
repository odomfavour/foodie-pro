/* eslint-disable @typescript-eslint/no-explicit-any */

import { useLogin } from '@/hooks/custom/use-auth';
import { LoginPayload } from '@/types/login-payload';
import { Storage } from '@/utils/storage';

export const useAuthService = () => {
  const loginMutation = useLogin();

  const loginUser = async (payload: LoginPayload) => {
    const data = await loginMutation.mutateAsync(payload);
    console.log('data', data);

    const token = data?.token;
    const user = data?.user;

    if (token) {
      Storage.setAuthToken(JSON.stringify({ token }));
    }

    return { token, user };
  };

  const logout = () => {
    Storage.removeAuthToken();
  };

  return { loginUser, logout };
};
