'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { hasCookie } from 'cookies-next';

import useUserStore, { setAuthCredential } from '@/store/auth';
import { useGetUserClaimStatusApi } from '@/hooks/useMutationApi';
import { useAuth } from '@/hooks/useAuth';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUserClaimStatus } = useUserStore();
  const { trigger: getUserClaimStatusApi } = useGetUserClaimStatusApi();
  const { onLogout } = useAuth();
  const [isClient, setClient] = useState(false);

  const getUserClaimStatus = useCallback(async () => {
    const response = await getUserClaimStatusApi();
    if (response && response.data) {
      setUserClaimStatus(response.data.data);
      setAuthCredential(true);
      return;
    }
    onLogout();
  }, [getUserClaimStatusApi]);

  useEffect(() => {
    setClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      if (!hasCookie('refreshToken')) {
        onLogout();
        return;
      }
      if (hasCookie('refreshToken')) {
        getUserClaimStatus();
      }
    }
  }, [isClient]);

  return children;
}
