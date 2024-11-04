'use client';

import { NextIntlClientProvider } from 'next-intl';
import React from 'react';
import { SWRConfig } from 'swr/_internal';

import GlobalLoading from '@/components/Loading/GlobalLoading';
import ToastModal from '@/components/Modal/Toast';
import NetworkSwitcher from '@/components/SwitchNetwork';
import ConnectWallet from '@/components/Modal/ConnectWallet';
import Web3Provider from '@/config/web3-provider';
import AuthProvider from '@/app/auth-provider';
import '@rainbow-me/rainbowkit/styles.css';

interface AppProvidersProps {
  children: React.ReactNode;
  messages: any;
  locale: string;
}

// Create the modal
// eslint-disable-next-line react-hooks/exhaustive-deps

const AppProviders = ({ children, messages, locale }: AppProvidersProps) => {
  return (
    <Web3Provider>
      <AuthProvider>
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
      </AuthProvider>
    </Web3Provider>
  );
};

export default AppProviders;
