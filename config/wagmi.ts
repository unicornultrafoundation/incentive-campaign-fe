import { cookieStorage, createConfig, createStorage, http } from 'wagmi';
import { metaMask } from '@wagmi/connectors';
import { defineChain } from '@reown/appkit/networks';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  bitgetWallet,
  injectedWallet,
  okxWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';

import { CHAINS } from '@/config/env';

export const u2uNetWork = defineChain({
  id: CHAINS.u2u.chainId,
  caipNetworkId: `eip155:${CHAINS.u2u.chainId}`,
  chainNamespace: 'eip155',
  name: CHAINS.u2u.network,
  nativeCurrency: { name: 'U2U', symbol: 'U2U', decimals: 18 },

  rpcUrls: {
    default: { http: [CHAINS.u2u.rpc] },
  },
  blockExplorers: {
    default: {
      name: 'Explorer',
      url: CHAINS.u2u.explorer,
    },
  },
  contracts: {
    // Add the contracts here
  },
});

export const projectId = '815145290a10a9393358a85a318d47ad';

if (!projectId) {
  throw new Error('Project ID is not defined');
}

export const networks = [u2uNetWork];
const appName = 'Liquid Staking';

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Main',
      wallets: [okxWallet, bitgetWallet, walletConnectWallet, injectedWallet],
    },
  ],
  {
    projectId,
    appName,
  },
);

export const config = createConfig({
  connectors: [metaMask(), ...connectors],
  chains: [u2uNetWork],
  ccipRead: false,
  transports: {
    [u2uNetWork.id]: http(),
  },
  multiInjectedProviderDiscovery: false,
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
});
