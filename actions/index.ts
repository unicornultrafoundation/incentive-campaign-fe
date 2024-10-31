'use server';

import { Axios } from 'axios';
import { getTranslations } from 'next-intl/server';
import { jwtDecode } from 'jwt-decode';
import moment from 'moment';

import { API_ENDPOINTS, SERVER_ENDPOINTS } from '@/config/api';
import { clearAuthCookies, getAuthCookies } from '@/services/cookies';

export const parseRequestParams = async (request: Request) => {
  const url = new URL(request.url);
  let params;

  try {
    if (request.method === 'GET') {
      params = null;
    } else if (
      request.headers.get('Content-Type')?.includes('multipart/form-data')
    ) {
      params = await request.formData();
    } else {
      params = await request.json();
    }
  } catch (e: any) {
    params = {};
    console.log('Error transforming params:', e.message);
  }

  return {
    url: url.pathname.replace('/api', '') + url.search,
    params,
    pathname: url.pathname,
    searchQuery: url.search,
  };
};

export const translateApiMessages = async (
  pathname: string,
  type: 'error' | 'success',
) => {
  const t = await getTranslations('api');
  const [translationKey] =
    Object.entries(API_ENDPOINTS).find(([, endpoint]) => {
      return pathname === '/api' + endpoint;
    }) || [];

  return t(type, {
    action: translationKey?.split('_').join(' ') || 'Perform Request',
  });
};

export const handleRouteAuthentication = async (
  request: Request,
  client: Axios,
) => {
  const url = new URL(request.url);
  if (url.pathname === SERVER_ENDPOINTS.CONNECT) {
    return;
  }
  const dataAuthCookie = getAuthCookies();
  const { accessToken } = dataAuthCookie;

  // Handle Access token expires
  if (!accessToken) {
    clearAuthCookies();
  } else {
    // const tokenTest =
    //   'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MjkwODAxODksImlzcyI6Im5vZGUtc2FsZSIsImV4cCI6MTcyOTA4NjE4OSwiYWRkcmVzcyI6IjB4OTVmZmI1ZjUyMWNkMzc3MTUyOTA0ZmNiZWM1YjY0Nzg4N2RlYTZlOCIsInJvbGUiOiJVU0VSIn0.tMGMNly25jqp9LkneQWUOU62kxnBmLKI2upjST7h8i5aBeSPWbzJq2G6fQuXDQ5Msx5QYgsHoEsuHvMwdCFdcQ';

    const tokenDecoded = jwtDecode(accessToken);
    // if (request.url.includes('api/user/discount-info')) {
    //   tokenDecoded = jwtDecode(tokenTest);
    // }
    const timeExpired = moment.unix(Number(tokenDecoded!.exp));
    const now = moment();

    /**
     * Token time expire is exist
     * Time Now is less than time expired
     */
    if (timeExpired.isValid() && now.isBefore(timeExpired)) {
      client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
      clearAuthCookies();
    }
  }

  // TODO: API Refresh Token
  // if (!refreshToken) {
  //   clearAuthCookies();
  // } else {
  //   try {
  //     const credentials: Credentials = await client.post(
  //       SERVER_ENDPOINTS.CONNECT,
  //       {
  //         refreshToken: refreshToken,
  //       },
  //     );
  //     console.log('--------');
  //     console.log('TOKEN REFRESHED');
  //     console.log('NEW TOKEN---', credentials);
  //     console.log('--------');

  //     setAuthCookies(credentials.data);

  //     client.defaults.headers.common.Authorization = `Bearer ${credentials.data.accessToken}`;
  //   } catch (e: any) {
  //     console.log('--------');
  //     console.log('ERROR REFRESHING', e.message);
  //     console.log('--------');

  //     clearAuthCookies();
  //   }
  // }
};
export const clearAuthCookiesAction = async () => {
  clearAuthCookies();
};
