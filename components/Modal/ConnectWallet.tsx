'use client';

import { Connector, useAccount, useConnect, useDisconnect } from 'wagmi';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import { WalletButton } from '@rainbow-me/rainbowkit';

import Icon from '@/components/Icon';
import CloseIcon from '@/components/Icon/Close';
import SignConnectMessageModal from '@/components/Modal/SignConnectMessageModal';
import useWalletStore from '@/store/connect-wallet';
// import { useAuthStore } from '@/store/auth';

export default function ConnectWallet() {
  // const { setValue, watch } = useFormContext<FormState.ConnectWallet>();
  const { isConnected } = useAccount();
  const { connectors, connectAsync } = useConnect();
  // const [metaMaskConnector, coinbaseConnector] = connectors.slice(2);
  const { disconnectAsync } = useDisconnect();
  const t = useTranslations();
  const [isMobile, setIsMobile] = useState(false);
  const [showSignMessage, setShowSignMessage] = useState(false);
  // const [showChooseChain, setShowChooseChain] = useState(false);
  const { isOpen, onClosed } = useWalletStore((state) => state);
  const [isClient, setIsClient] = useState(false);
  // const { hasCredential } = useAuthStore();

  // const isValidSession = useMemo(() => {
  //   return isConnected && hasCredential;
  // }, [isConnected, hasCredential]);
  // const filteredConnectors = connectors.filter(
  //   (connector) => connector.name === 'MetaMask',
  // );

  const handleConnect = useCallback(
    async (connector: Connector, connect?: () => Promise<void>) => {
      try {
        if (!isConnected) {
          await disconnectAsync();
          if (connect) {
            await connect();
          } else {
            await connectAsync({ connector });
          }
        }
        onClosed?.();
        setShowSignMessage(true);
      } catch (e) {
        console.error('Error connecting wallet:', e);
      }
    },
    [connectAsync, disconnectAsync, isConnected, onClosed],
  );

  const renderIcon = (connectorName: string) => {
    if (connectorName === 'MetaMask') {
      return <Icon.MetaMask width={32} height={32} />;
    }
    if (connectorName === 'walletConnect') {
      return <Icon.WalletConnect width={32} height={32} />;
    }
    if (connectorName === 'Browser Wallet') {
      return <Icon.U2UWallet width={32} height={32} />;
    }
    return null;
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    setIsClient(true);
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {/* Wallet Connect Modal */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm ${isOpen ? 'block' : 'hidden'}`}
      >
        <div className="relative w-[90%] max-w-[400px] p-5 bg-[#1F1F1F] rounded-lg shadow-lg border-2 border-solid border-[#7EFFC5]">
          <div className="absolute w-5 h-5 bg-[#7EFFC5] top-[-4%] left-[-10px] rotate-45 "></div>
          <div className="absolute w-5 h-5 bg-[#7EFFC5] top-[-4%] right-[-10px] rotate-45 "></div>
          <div className="absolute w-5 h-5 bg-[#7EFFC5] bottom-[-4%] left-[-10px] rotate-45 "></div>
          <div className="absolute w-5 h-5 bg-[#7EFFC5] bottom-[-4%] right-[-10px] rotate-45 "></div>

          {/* Modal Header */}
          <div className="flex justify-between mb-4">
            <h2 className="font-inter text-lg tablet:text-2xl text-[#7EFFC5] font-semibold">
              {t('modal_connect_wallet.connect_wallet')}
            </h2>
            <CloseIcon
              className="cursor-pointer"
              width={24}
              height={24}
              onClick={() => onClosed?.()}
            />
          </div>
          <div className="w-full flex flex-col gap-5">
            <div
              key={connectors[0].id}
              className="cursor-pointer px-4 py-2 tablet:px-5 tablet:py-3 border border-gray-200 rounded-xl flex items-center  transition-all hover:bg-gray-300 hover:border-transparent hover:text-black"
            >
              <button
                onClick={() => handleConnect(connectors[0])}
                className="flex justify-between items-center w-full"
              >
                <p>{connectors[0].name}</p>
                {renderIcon(connectors[0].name)}
              </button>
            </div>
            <WalletButton.Custom wallet="okx">
              {({ ready, connect, connector }) => {
                return (
                  <div className="cursor-pointer px-4 py-2 tablet:px-5 tablet:py-3 border border-gray-200 rounded-xl flex items-center  transition-all hover:bg-gray-300 hover:border-transparent hover:text-black">
                    <button
                      onClick={() =>
                        isMobile
                          ? handleConnect(connector, connect)
                          : handleConnect(connector)
                      }
                      className="flex justify-between items-center w-full"
                    >
                      <p>{connector.name}</p>
                      {renderIcon(connector.name)}
                    </button>
                  </div>
                );
              }}
            </WalletButton.Custom>
            <WalletButton.Custom wallet="bitget">
              {({ ready, connect, connector }) => {
                return (
                  <div className="cursor-pointer px-4 py-2 tablet:px-5 tablet:py-3 border border-gray-200 rounded-xl flex items-center  transition-all hover:bg-gray-300 hover:border-transparent hover:text-black">
                    <button
                      onClick={() =>
                        isMobile
                          ? handleConnect(connector, connect)
                          : handleConnect(connector)
                      }
                      className="flex justify-between items-center w-full"
                    >
                      <p>Bitget</p>
                      {renderIcon(connector.name)}
                    </button>
                  </div>
                );
              }}
            </WalletButton.Custom>
            {isClient && window.ReactNativeWebView && (
              <WalletButton.Custom wallet="injected">
                {({ ready, connect, connector }) => {
                  return (
                    <div className="cursor-pointer px-4 py-2 tablet:px-5 tablet:py-3 border border-gray-200 rounded-xl flex items-center  transition-all hover:bg-gray-300 hover:border-transparent hover:text-black">
                      <button
                        disabled={!ready}
                        onClick={() =>
                          isMobile
                            ? handleConnect(connector, connect)
                            : handleConnect(connector)
                        }
                        className="flex justify-between items-center w-full"
                      >
                        <p>Injected</p>
                        {renderIcon(connector.name)}
                      </button>
                    </div>
                  );
                }}
              </WalletButton.Custom>
            )}
            <WalletButton.Custom wallet="walletconnect">
              {({ ready, connect, connector }) => {
                return (
                  <div className="cursor-pointer px-4 py-2 tablet:px-5 tablet:py-3 border border-gray-200 rounded-xl flex items-center  transition-all hover:bg-gray-300 hover:border-transparent hover:text-black">
                    <button
                      disabled={!ready}
                      onClick={connect}
                      className="flex justify-between items-center w-full"
                    >
                      <p>{connector.name}</p>
                      {renderIcon(connector.name)}
                    </button>
                  </div>
                );
              }}
            </WalletButton.Custom>
          </div>
        </div>
      </div>

      {/*Sign Connect Message Modal*/}
      <SignConnectMessageModal
        isOpen={showSignMessage}
        onClose={() => setShowSignMessage(false)}
      />
    </>
  );
}
