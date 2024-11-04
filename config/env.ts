import { Address } from 'viem';

import { pUsdtAbi } from '@/config/abi/pUsdtAbi';
import { stakePublicAbi } from '@/config/abi/stakePublicAbi';
import { stakeBitgetAbi } from '@/config/abi/stakeBitgetAbi';

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';
export const CAMPAIGN_TYPE = process.env.NEXT_PUBLIC_CAMPAIGN_TYPE || '';
export const U2U_SCAN_URL = process.env.NEXT_PUBLIC_U2U_SCAN_URL || '';
export const NETWORK_NAME = process.env.NEXT_PUBLIC_NETWORK_NAME || '';

export const SUBGRAPH_URL =
  process.env.NEXT_PUBLIC_SUBGRAPH_URL || ('' as string);

export const CONTRACT_PUBLIC_ADDRESS =
  process.env.NEXT_PUBLIC_PUBLIC_ADDRESS || ('' as string);
export const CONTRACT_BITGET_ADDRESS =
  process.env.NEXT_PUBLIC_BITGET_ADDRESS || ('' as string);
export const CONTRACT_PUSDT_ADDRESS =
  process.env.NEXT_PUBLIC_PUSDT_ADDRESS || ('' as string);
export enum ChainName {
  U2U = 'U2U',
}

//TODO: add ENV chain config
export const CHAINS = {
  u2u: {
    rpc: process.env.NEXT_PUBLIC_RPC_URL ?? '',
    name: process.env.NEXT_PUBLIC_NETWORK_NAME ?? '',
    network: process.env.NEXT_PUBLIC_NETWORK_NAME ?? '',
    explorer: process.env.NEXT_PUBLIC_BLOCK_EXPLORER_URL ?? '',
    chainId: process.env.NEXT_PUBLIC_CHAIN_ID as any,
  },
};

export const contracts: {
  [key: string]: {
    address: Address;
    abi: any;
  };
} = {
  pUSDT: {
    address: CONTRACT_PUSDT_ADDRESS as Address,
    abi: pUsdtAbi,
  },
  stakePublic: {
    address:
      CAMPAIGN_TYPE.toLowerCase() === 'public'
        ? (CONTRACT_PUBLIC_ADDRESS as Address)
        : (CONTRACT_BITGET_ADDRESS as Address),
    abi: stakePublicAbi,
  },
  stakeBiget: {
    address: CONTRACT_BITGET_ADDRESS as Address,
    abi: stakeBitgetAbi,
  },
};
