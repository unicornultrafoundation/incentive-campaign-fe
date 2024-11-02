import { ApolloQueryResult } from '@apollo/client';

// import { SubgraphParams } from '../../types/subgraph.params';

import { SubgraphResponse } from '@/types/subgraph.response';

import { subgraphClient } from './apollo';
import { DashboardPublicQuery, DashboardBitgetQuery } from './queries';

type QueryResult<TResponse> = Promise<ApolloQueryResult<TResponse>>;

export interface IService {
  getDashboardPublicData: () => QueryResult<SubgraphResponse.DashboardPublicData>;
  getDashboardBitgetData: () => QueryResult<SubgraphResponse.DashboardPublicData>;
}

export const subgraphService: IService = {
  getDashboardPublicData: () =>
    subgraphClient.query({ query: DashboardPublicQuery }),
  getDashboardBitgetData: () =>
    subgraphClient.query({ query: DashboardBitgetQuery }),
};
