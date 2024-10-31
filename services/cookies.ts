import { cookies } from 'next/headers';

import { UserCredentials } from '@/types/entities';

export const setAuthCookies = (credentials: UserCredentials) => {
  const { accessToken, refreshToken } = credentials;

  cookies().set('accessToken', accessToken);
  cookies().set('refreshToken', refreshToken);
};

export const getAuthCookies = () => {
  return {
    accessToken: cookies().get('accessToken')?.value,
    refreshToken: cookies().get('refreshToken')?.value,
  };
};

export const clearAuthCookies = () => {
  cookies().delete('accessToken');
  cookies().delete('refreshToken');
  // cookies().delete("userId");
};
