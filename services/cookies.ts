import { cookies } from 'next/headers';

import { UserCredentials } from '@/types/entities';

export const setAuthCookies = (credentials: UserCredentials) => {
  const { accessToken, refreshToken, userId } = credentials;

  cookies().set('accessToken', accessToken);
  cookies().set('refreshToken', refreshToken);
  cookies().set('userId', userId);
};

export const getAuthCookies = () => {
  return {
    accessToken: cookies().get('accessToken')?.value,
    refreshToken: cookies().get('refreshToken')?.value,
    userId: cookies().get('userId')?.value,
  };
};

export const clearAuthCookies = () => {
  cookies().delete('accessToken');
  cookies().delete('refreshToken');
  cookies().delete('userId');
};
