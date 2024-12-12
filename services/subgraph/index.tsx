import { ApolloQueryResult } from '@apollo/client';
import { Address } from 'viem';

import { SubgraphResponse } from '@/types/subgraph.response';

import { subgraphClient } from './apollo';
import {
  DashboardPublicQuery,
  DashboardBitgetQuery,
  TransactionRewardQuery,
  TransactionStakeQuery,
} from './queries';

type QueryResult<TResponse> = Promise<ApolloQueryResult<TResponse>>;

export interface IService {
  getDashboardPublicData: () => QueryResult<SubgraphResponse.DashboardPublicData>;
  getDashboardBitgetData: () => QueryResult<SubgraphResponse.DashboardBitgetData>;
  getGetTransactionReward: (
    address: Address,
    contract: Address[],
  ) => QueryResult<SubgraphResponse.TransactionRewardData>;
  getGetTransactionStake: (
    address: Address,
    contract: Address[],
  ) => QueryResult<SubgraphResponse.TransactionRewardData>;
}

export const subgraphService: IService = {
  getDashboardPublicData: () =>
    subgraphClient.query({
      query: DashboardPublicQuery,
      fetchPolicy: 'no-cache',
    }),
  getDashboardBitgetData: () =>
    subgraphClient.query({
      query: DashboardBitgetQuery,
      fetchPolicy: 'no-cache',
    }),
  getGetTransactionReward: (address: Address, contract: Address[]) =>
    subgraphClient.query({
      query: TransactionRewardQuery,
      variables: { address, contracts: contract },
      fetchPolicy: 'no-cache',
    }),
  getGetTransactionStake: (address: Address, contract: Address[]) =>
    subgraphClient.query({
      query: TransactionStakeQuery,
      variables: { address, contracts: contract },
      fetchPolicy: 'no-cache',
    }),
};
