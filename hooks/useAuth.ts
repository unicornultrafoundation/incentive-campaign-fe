'use client';

import { signMessage } from '@wagmi/core';
import { useEffect, useMemo } from 'react';
import { useAccount, useDisconnect, useSwitchChain } from 'wagmi';

import { config } from '@/config/wagmi';
import {
  useConnectWalletApi,
  useGetUserClaimStatusApi,
  useLogOutAPI,
} from '@/hooks/useMutationApi';
import useUserStore, { setAuthCredential, useAuthStore } from '@/store/auth';
import { clearAuthCookiesAction } from '@/actions';
import { CHAINS } from '@/config/env';

export const useAuth = () => {
  const { isConnected, address } = useAccount();
  const { hasCredential } = useAuthStore();
  const { setUserClaimStatus } = useUserStore();
  const { trigger: connectWallet } = useConnectWalletApi();
  const { trigger: getUserClaimStatus } = useGetUserClaimStatusApi();
  const { trigger: logOutApi } = useLogOutAPI();

  const isValidSession = useMemo(() => {
    return isConnected && hasCredential;
  }, [isConnected, hasCredential]);

  const { disconnectAsync, disconnect } = useDisconnect();

  const onSignMessage = async () => {
    if (!address) return;
    const message = await signMessage(config, {
      message: 'logmein',
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

  const handleLogoutApi = async () => {
    try {
      await logOutApi();
      return 1;
    } catch (err) {
      return 0;
    }
  };

  const onLogout = async () => {
    handleLogoutApi();
    localStorage.removeItem('addressProfile');
    await disconnectAsync();
    disconnect();
    setAuthCredential(false);
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
    return isConnected && chainId !== Number(CHAINS.u2u.chainId);
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

export const useAccountChange = () => {
  const { address } = useAccount();
  const { onSignMessage } = useAuth();
  const profileAddress = localStorage.getItem('addressProfile');
  useEffect(() => {
    if (!address || !profileAddress) return;
    if (address !== profileAddress) {
      onSignMessage();
    }
  }, [address, profileAddress]);
  return;
};
