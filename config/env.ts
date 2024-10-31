import { Address } from 'viem';

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';
export const U2U_SCAN_URL = process.env.NEXT_PUBLIC_U2U_SCAN_URL || '';
export const NETWORK_NAME = process.env.NEXT_PUBLIC_NETWORK_NAME || '';

export enum ChainName {
  U2U = 'U2U',
}

//   u2u: {
//     rpc: 'https://rpc-mainnet.u2u.xyz',
//     name: ChainName.U2U,
//     network: 'U2U Solaris Mainnet',
//     explorer: 'https://u2uscan.xyz/',
//     chainId: 39,
//   },
//   bsc: {
//     rpc: 'https://bsc-dataseed.binance.org',
//     name: ChainName.BSC,
//     network: 'BNB Smart Chain',
//     explorer: 'https://bscscan.com/',
//     chainId: 56,
//   },
// };

//TODO: add ENV chain config
export const CHAINS = {
  u2u: {
    rpc: 'https://rpc-nebulas-testnet.uniultra.xyz',
    name: ChainName.U2U,
    network: 'Nebulas Testnet',
    explorer: 'https://testnet.u2uscan.xyz',
    chainId: 2484,
  },
};

export const contracts: {
  [key: string]: {
    address: Address;
    abi: any;
  };
} = {};
