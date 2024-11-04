import useSWR, { Fetcher, Key, SWRConfiguration, SWRResponse } from 'swr';

import { API_ENDPOINTS } from '@/config/api';
import { nextAPI } from '@/services/api';
// import { toast } from '@/store/ui';
import { APIParams } from '@/types/api/api.params';
import {
  APIErrorResponse,
  APIResponse,
  APISuccessfulResponse,
} from '@/types/api/api.response';
import { subgraphService } from '@/services/subgraph';

type ExtendSWRConfiguration<Data, Params = void> = SWRConfiguration<
  Data,
  any
> & {
  params?: Params | null;
  notifyError?: boolean;
};

interface UseExtendedSWR {
  <Data extends APISuccessfulResponse<any>, Params = void>(
    key: Key,
    fetcher: Fetcher<Data, Key>,
    config?: ExtendSWRConfiguration<Data, Params>,
  ): SWRResponse<
    Data,
    APIErrorResponse,
    SWRConfiguration<Data, APIErrorResponse>
  >;
}

export const useExtendedSWR: UseExtendedSWR = (key, fetcher, config) => {
  const { onError, ...rest } = config || {};

  return useSWR(key, fetcher, {
    ...rest,
    onError: (err, key, config) => {
      onError?.(err, key, config);
      // if (notifyError) {
      //   toast.error({
      //     title: err.message,
      //     message: err.error,
      //   });
      // }
    },
  });
};

export const useGetSubgraphDashboardPublic = (
  config?: ExtendSWRConfiguration<APIResponse.DashBoardPublic, any>,
) =>
  useExtendedSWR<APIResponse.DashBoardPublic, any>(
    'getDashboardPublicData',
    () => subgraphService.getDashboardPublicData() as any,
    config,
  );

export const useGetSubgraphDashboardBitget = (
  config?: ExtendSWRConfiguration<APIResponse.DashBoardBitget, any>,
) =>
  useExtendedSWR<APIResponse.DashBoardBitget, any>(
    'getDashboardBitgetData',
    () => subgraphService.getDashboardBitgetData() as any,
    config,
  );

export const useGetTransactionReward = (
  config?: ExtendSWRConfiguration<APIResponse.TransactionRewardResponse, any>,
) =>
  useExtendedSWR<APIResponse.TransactionRewardResponse, any>(
    'getTransactionReward',
    () =>
      subgraphService.getGetTransactionReward(config?.params?.address) as any,
    config,
  );

export const useGetTransactionStake = (
  config?: ExtendSWRConfiguration<APIResponse.TransactionRewardResponse, any>,
) =>
  useExtendedSWR<APIResponse.TransactionRewardResponse, any>(
    'getTransactionStake',
    () =>
      subgraphService.getGetTransactionStake(config?.params?.address) as any,
    config,
  );

export const useSearchNodeApi = (
  config?: ExtendSWRConfiguration<APIResponse.SearchNode, APIParams.SearchNode>,
) =>
  useExtendedSWR<APIResponse.SearchNode, APIParams.SearchNode>(
    config?.params === null
      ? null
      : API_ENDPOINTS.SEARCH_NODE + `/${config?.params?.address}`,
    nextAPI.get,
    config,
  );
