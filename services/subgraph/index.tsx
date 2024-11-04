import { ApolloQueryResult } from '@apollo/client';

// import { SubgraphParams } from '../../types/subgraph.params';

import { SubgraphResponse } from '@/types/subgraph.response';

import { subgraphClient } from './apollo';
import { DashboardPublicQuery, DashboardBitgetQuery, TransactionRewardQuery, TransactionStakeQuery } from './queries';
import { Address } from 'viem';

type QueryResult<TResponse> = Promise<ApolloQueryResult<TResponse>>;

export interface IService {
  getDashboardPublicData: () => QueryResult<SubgraphResponse.DashboardPublicData>;
  getDashboardBitgetData: () => QueryResult<SubgraphResponse.DashboardBitgetData>;
  getGetTransactionReward: (
    address: Address,
  ) => QueryResult<SubgraphResponse.TransactionRewardData>;
  getGetTransactionStake: (
    address: Address,
  ) => QueryResult<SubgraphResponse.TransactionRewardData>;
}

export const subgraphService: IService = {
  getDashboardPublicData: () =>
    subgraphClient.query({ query: DashboardPublicQuery }),
  getDashboardBitgetData: () =>
    subgraphClient.query({ query: DashboardBitgetQuery }),
  getGetTransactionReward: (address: Address) =>
    subgraphClient.query({
      query: TransactionRewardQuery,
      variables: { address },
    }),
  getGetTransactionStake: (address: Address) =>
    subgraphClient.query({
      query: TransactionStakeQuery,
      variables: { address },
    }),
};
