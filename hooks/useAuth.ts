'use client';

import { signMessage } from '@wagmi/core';
import { useEffect, useMemo } from 'react';
import {
  useAccount,
  useBalance,
  useBlockNumber,
  useDisconnect,
  useSwitchChain,
} from 'wagmi';
import { useQueryClient } from '@tanstack/react-query';

import { config } from '@/config/wagmi';
import { useConnectWalletApi } from '@/hooks/useMutationApi';
import { setAuthCredential, useAuthStore } from '@/store/auth';
import { clearAuthCookiesAction } from '@/actions';
import { CHAINS } from '@/config/env';

export const useAuth = () => {
  const { isConnected, address } = useAccount();
  const { hasCredential } = useAuthStore();
  const { trigger: connectWallet } = useConnectWalletApi();
  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({ watch: true });

  const { data: balanceU2U, queryKey } = useBalance({ address });

  const isValidSession = useMemo(() => {
    return isConnected && hasCredential;
  }, [isConnected, hasCredential]);

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
    if (result) {
      setAuthCredential(true);
    }
  };

  const onLogout = async () => {
    await disconnectAsync();
    disconnect();
    // setAuthCredential(false);
    await clearAuthCookiesAction();
  };

  const balanceWallet = useMemo(() => {
    return balanceU2U?.formatted;
  }, [balanceU2U]);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [blockNumber, queryClient]);

  return {
    // onConnectWallet,
    isValidSession,
    onSignMessage,
    onLogout,
    balanceWallet,
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
