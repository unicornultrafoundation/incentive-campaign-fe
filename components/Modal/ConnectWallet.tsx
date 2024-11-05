'use client';

import { Connector, useAccount, useConnect, useDisconnect } from 'wagmi';
// import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import { WalletButton } from '@rainbow-me/rainbowkit';

import Icon from '@/components/Icon';
import SignConnectMessageModal from '@/components/Modal/SignConnectMessageModal';
import useWalletStore from '@/store/connect-wallet';
import Modal from '@/components/Modal';
import { CAMPAIGN_TYPE } from '@/config/env';
import useDetectWallets from '@/hooks/useDetectWallets';
import WalletErrorModal from './WalletErrorModal';
import { set } from 'lodash';
// import { useAuthStore } from '@/store/auth';

export default function ConnectWallet() {
  const { isConnected } = useAccount();
  const { connectors, connectAsync } = useConnect();
  // const [metaMaskConnector, coinbaseConnector] = connectors.slice(2);
  const { disconnectAsync } = useDisconnect();
  // const t = useTranslations();
  const [isMobile, setIsMobile] = useState(false);
  const [showSignMessage, setShowSignMessage] = useState(false);
  const { isOpen, onClosed } = useWalletStore((state) => state);
  const [isClient, setIsClient] = useState(false);
  const { isBitget, isMetamask, isOkxWallet } = useDetectWallets();
  // const { hasCredential } = useAuthStore();
  const [errorWalletLink, setErrorWalletLink] = useState<string | null>(null);
  const [errorWalletName, setErrorWalletName] = useState<string | null>(null);

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
    if (connectorName === 'bitget') {
      return <Icon.Bitget width={32} height={32} />;
    }
    if (connectorName === 'okx') {
      return <Icon.Okx width={32} height={32} />;
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
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClosed();
        }}
        title="Connect Wallet"
        description="To participate in the airdrop, your wallet must have one successful $10 USDT bridge transaction to the U2U Network."
        className="relative border border-[#7EFFC5] max-w-[390px] tablet:max-w-[450px] p-6 w-full flex flex-col gap-5"
      >
        {CAMPAIGN_TYPE.toLowerCase() === 'public' ? (
          <div className="w-full flex flex-col gap-5">
            <div
              style={{
                background: 'linear-gardient(to left,#9299FF,#4651F6)',
              }}
              className="w-full h-[1px] bg-[#9299FF] mb-2"
            />
            <div
              key={connectors[0].id}
              className="cursor-pointer px-4 py-2 tablet:px-5 tablet:py-3 border border-gray-200 rounded-xl flex items-center  transition-all hover:bg-[#6d6d6d] hover:text-[#7EFFC5] hover:border-[#7EFFC5]"
            >
              <button
                onClick={() => {
                  if (!isMetamask) {
                    setErrorWalletLink(
                      'https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en',
                    );
                    setErrorWalletName('Metamask');
                    return;
                  }
                  handleConnect(connectors[0]);
                }}
                className="flex justify-between items-center w-full"
              >
                <p>{connectors[0].name}</p>
                {renderIcon(connectors[0].name)}
              </button>
            </div>
            <WalletButton.Custom wallet="okx">
              {({ connect, connector }) => {
                return (
                  <div className="cursor-pointer px-4 py-2 tablet:px-5 tablet:py-3 border border-gray-200 rounded-xl flex items-center  transition-all hover:bg-[#6d6d6d] hover:text-[#7EFFC5] hover:border-[#7EFFC5]">
                    <button
                      onClick={() => {
                        if (!isOkxWallet) {
                          setErrorWalletLink(
                            'https://chromewebstore.google.com/detail/okx-wallet/mcohilncbfahbmgdjkbpemcciiolgcge',
                          );
                          setErrorWalletName('Okx');
                          return;
                        }
                        isMobile
                          ? handleConnect(connector, connect)
                          : handleConnect(connector);
                      }}
                      className="flex justify-between items-center w-full"
                    >
                      <p>{connector.name}</p>
                      {renderIcon('okx')}
                    </button>
                  </div>
                );
              }}
            </WalletButton.Custom>
            {isClient && window.ReactNativeWebView && (
              <WalletButton.Custom wallet="injected">
                {({ ready, connect, connector }) => {
                  return (
                    <div className="cursor-pointer px-4 py-2 tablet:px-5 tablet:py-3 border border-gray-200 rounded-xl flex items-center  transition-all hover:bg-[#6d6d6d] hover:text-[#7EFFC5] hover:border-[#7EFFC5]">
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
                  <div className="cursor-pointer px-4 py-2 tablet:px-5 tablet:py-3 border border-gray-200 rounded-xl flex items-center  transition-all hover:bg-[#6d6d6d] hover:text-[#7EFFC5] hover:border-[#7EFFC5]">
                    <button
                      disabled={!ready}
                      onClick={connect}
                      className="flex justify-between items-center w-full"
                    >
                      <p>{connector.name}</p>
                      {renderIcon('walletConnect')}
                    </button>
                  </div>
                );
              }}
            </WalletButton.Custom>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-5">
            <div
              style={{
                background: 'linear-gardient(to left,#9299FF,#4651F6)',
              }}
              className="w-full h-[1px] bg-[#9299FF] mb-2"
            />
            <WalletButton.Custom wallet="bitget">
              {({ connect, connector }) => {
                return (
                  <div className="cursor-pointer px-4 py-2 tablet:px-5 tablet:py-3 border border-gray-200 rounded-xl flex items-center  transition-all hover:bg-[#6d6d6d] hover:text-[#7EFFC5] hover:border-[#7EFFC5]">
                    <button
                      onClick={() => {
                        if (!isBitget) {
                          setErrorWalletLink(
                            'https://chromewebstore.google.com/detail/bitget-wallet-formerly-bi/jiidiaalihmmhddjgbnbgdfflelocpak',
                          );
                          setErrorWalletName('Bitget');
                          return;
                        }
                        isMobile
                          ? handleConnect(connector, connect)
                          : handleConnect(connector);
                      }}
                      className="flex justify-between items-center w-full"
                    >
                      <p>Bitget</p>
                      {renderIcon('bitget')}
                    </button>
                  </div>
                );
              }}
            </WalletButton.Custom>
          </div>
        )}
      </Modal>

      {/*Sign Connect Message Modal*/}
      <SignConnectMessageModal
        isOpen={showSignMessage}
        onClose={() => setShowSignMessage(false)}
      />
      <WalletErrorModal
        isOpen={errorWalletName !== null}
        onClose={() => {
          setErrorWalletLink(null);
          setErrorWalletName(null);
        }}
        link={errorWalletLink}
        walletName={errorWalletName}
      />
    </>
  );
}
