'use client';

import { hasCookie } from 'cookies-next';
import { NextIntlClientProvider } from 'next-intl';
import React, { useEffect } from 'react';
import { SWRConfig } from 'swr/_internal';

import GlobalLoading from '@/components/Loading/GlobalLoading';
import ToastModal from '@/components/Modal/Toast';
import NetworkSwitcher from '@/components/SwitchNetwork';
import useUserStore, { setAuthCredential, useAuthStore } from '@/store/auth';
import ConnectWallet from '@/components/Modal/ConnectWallet';
import Web3Provider from '@/config/web3-provider';
import '@rainbow-me/rainbowkit/styles.css';
import { useGetUserClaimStatusApi } from '@/hooks/useMutationApi';

interface AppProvidersProps {
  children: React.ReactNode;
  messages: any;
  locale: string;
}

// Create the modal
// eslint-disable-next-line react-hooks/exhaustive-deps

const AppProviders = ({ children, messages, locale }: AppProvidersProps) => {
  const { hasCredential } = useAuthStore();
  const { setUserClaimStatus } = useUserStore();
  const { trigger: getUserClaimStatusApi } = useGetUserClaimStatusApi();

  useEffect(() => {
    setAuthCredential(hasCookie('refreshToken'));
  }, []);

  useEffect(() => {
    const getUserClaimStatus = async () => {
      const response = await getUserClaimStatusApi();
      if (response && response.data) {
        setUserClaimStatus(response.data.data);
      }
    };
    if (hasCredential) {
      getUserClaimStatus();
    }
  }, [hasCredential]);

  return (
    <Web3Provider>
      <SWRConfig
        value={{
          revalidateOnFocus: false,
        }}
      >
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
          timeZone="UTC"
        >
          {children}
          <ToastModal />
          <GlobalLoading />
          <NetworkSwitcher />
          <ConnectWallet />
        </NextIntlClientProvider>
      </SWRConfig>
    </Web3Provider>
  );
};

export default AppProviders;
