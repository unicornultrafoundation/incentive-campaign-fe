'use client';

import { signMessage } from '@wagmi/core';
import { useMemo } from 'react';
import { useAccount, useDisconnect, useSwitchChain } from 'wagmi';

import { config } from '@/config/wagmi';
import {
  useConnectWalletApi,
  useGetUserClaimStatusApi,
} from '@/hooks/useMutationApi';
import useUserStore, { setAuthCredential, useAuthStore } from '@/store/auth';
import { clearAuthCookiesAction } from '@/actions';
import { CHAINS } from '@/config/env';

export const useAuth = () => {
  const { isConnected } = useAccount();
  const { hasCredential } = useAuthStore();
  const { setUserClaimStatus } = useUserStore();
  const { trigger: connectWallet } = useConnectWalletApi();
  const { trigger: getUserClaimStatus } = useGetUserClaimStatusApi();

  const isValidSession = useMemo(() => {
    return isConnected && hasCredential;
  }, [isConnected, hasCredential]);

  const { address } = useAccount();
  const { disconnectAsync, disconnect } = useDisconnect();

  const onSignMessage = async () => {
    if (!address) return;
    const message = await signMessage(config, {
      message: 'hello',
    });

    const result = await connectWallet({
      signature: message,
      signer: address.toLowerCase(),
    });
    const response = await getUserClaimStatus();
    if (response.data) {
      setUserClaimStatus(response.data.data);
    }
    if (result) {
      setAuthCredential(true);
    }
  };

  const onLogout = async () => {
    await disconnectAsync();
    disconnect();
    // setAuthCredential(false);
    setUserClaimStatus(null);
    await clearAuthCookiesAction();
  };

  return {
    // onConnectWallet,
    isValidSession,
    onSignMessage,
    onLogout,
  };
};

export const useWrongNetwork = () => {
  const { chainId, isConnected } = useAccount();
  const { switchChain } = useSwitchChain();

  const isWrongNetwork = useMemo(() => {
    if (!isConnected) return false;
    return isConnected && chainId !== CHAINS.u2u.chainId;
  }, [chainId, chainId, isConnected]);

  const handleSwitchChain = () => {
    try {
      switchChain({
        chainId: Number(CHAINS.u2u.chainId),
      });
    } catch (e: any) {
      console.error('Error switching chain:', e.message);
    }
  };

  return { isWrongNetwork, handleSwitchChain };
};
