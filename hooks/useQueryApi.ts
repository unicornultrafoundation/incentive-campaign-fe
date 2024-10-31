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

export const useGetRootAddressApi = (
  config?: ExtendSWRConfiguration<APIResponse.GetRefAddress, any>,
) =>
  useExtendedSWR<APIResponse.GetRefAddress, any>(
    API_ENDPOINTS.GET_REF_ADDRESS,
    nextAPI.get,
    config,
  );

export const useGetMemberApi = (
  config?: ExtendSWRConfiguration<APIResponse.GetMembers, APIParams.Pagination>,
) =>
  useExtendedSWR<APIResponse.GetMembers, APIParams.Pagination>(
    `${API_ENDPOINTS.GET_MEMBER}/${config?.params?.page || 1}/${config?.params?.size}`,
    nextAPI.get,
    config,
  );

export const useGetBuyHistoryApi = (
  config?: ExtendSWRConfiguration<
    APIResponse.GetBuyHistory,
    APIParams.Pagination
  >,
) =>
  useExtendedSWR<APIResponse.GetBuyHistory, APIParams.Pagination>(
    `${API_ENDPOINTS.GET_BUY_HISTORY}/${config?.params?.page || 1}/${config?.params?.size}`,
    nextAPI.get,
    config,
  );

export const useGetNodeApi = (
  config?: ExtendSWRConfiguration<APIResponse.GetNodeData, APIParams.GetNode>,
) =>
  useExtendedSWR<APIResponse.GetNodeData, APIParams.GetNode>(
    `${API_ENDPOINTS.GET_NODE}/${config?.params?.type}`,
    nextAPI.get,
    config,
  );

export const useGetPromotionCodeApi = (
  config?: ExtendSWRConfiguration<
    APIResponse.GetPromotionCode,
    APIParams.GetPromotionCode
  >,
) =>
  useExtendedSWR<APIResponse.GetPromotionCode, APIParams.GetPromotionCode>(
    config?.params === null
      ? null
      : API_ENDPOINTS.GET_PROMOTION_CODE + `/${config?.params?.codePromotion}`,
    nextAPI.get,
    config,
  );

export const useGetCodeApi = (
  config?: ExtendSWRConfiguration<APIResponse.GetCode, APIParams.GetCode>,
) =>
  useExtendedSWR<APIResponse.GetCode, APIParams.GetCode>(
    config?.params === null
      ? null
      : API_ENDPOINTS.GET_CODE + `/${config?.params?.code}`,
    nextAPI.get,
    config,
  );

export const useGetDetailTransactionApi = (
  config?: ExtendSWRConfiguration<
    APIResponse.GetDetailTransaction,
    APIParams.TransactionDetail
  >,
) =>
  useExtendedSWR<APIResponse.GetDetailTransaction, APIParams.TransactionDetail>(
    `${API_ENDPOINTS.GET_DETAIL_TRANSACTION}/${config?.params?.id}`,
    nextAPI.get,
    config,
  );

export const useGetWaitlistApi = (
  config?: ExtendSWRConfiguration<APIResponse.GetWaitlist, APIParams.Waitlist>,
) => {
  if (config?.params?.chainId && config?.params?.roundId) {
    return useExtendedSWR<APIResponse.GetWaitlist, APIParams.Waitlist>(
      `${API_ENDPOINTS.GET_WAITLIST}/${config?.params?.chainId}/${config?.params?.roundId}`,
      nextAPI.get,
      config,
    );
  }

  return { data: null };
};

export const useClaimNFTApi = (
  config?: ExtendSWRConfiguration<APIResponse.ClaimNFT, APIParams.ClaimNFT>,
) =>
  useExtendedSWR<APIResponse.ClaimNFT, APIParams.ClaimNFT>(
    config?.params === null
      ? null
      : API_ENDPOINTS.GET_CLAIM_NFT + `/${config?.params?.id}`,
    nextAPI.get,
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

// export const useGetBuyHistoryApi = ({ params }: { params: { page: number, size: number } }) => {
//   const { data, error, isLoading, mutate } = useSWR(
//     [API_ENDPOINTS.GET_BUY_HISTORY, params],
//     async ([url, params]) => {
//       const response = await nextAPI.post(url, params);
//
//       // Trả về data với cấu trúc gọn hơn
//       return response.data.data?.data?.data as APIResponse.Node[];
//     }
//   );
//
//   return {
//     data: data ?? null,  // Giảm thiểu các lớp data?.data
//     error,
//     isLoading,
//     mutate,
//   };
// };

//
// export const useGetPoolApi = (
//   config?: ExtendSWRConfiguration<APIResponse.GetPool, any>,
// ) =>
//   useExtendedSWR<APIResponse.GetPool>(
//     CLIENT_ENDPOINTS.GET_POOL,
//     nextAPI.get,
//     config,
//   );
//
// export const useGetPoolHistoryApi = (
//   config?: ExtendSWRConfiguration<
//     APIResponse.GetPoolHistory,
//     APIParams.GetPoolHistory
//   >,
// ) =>
//   useExtendedSWR<APIResponse.GetPoolHistory, APIParams.GetPoolHistory>(
//     config?.params === null
//       ? null
//       : CLIENT_ENDPOINTS.GET_POOL_HISTORY + `/${config?.params?.id}`,
//     nextAPI.get,
//     config,
//   );
//
// export const useGetTransactionApi = (
//   config?: ExtendSWRConfiguration<
//     APIResponse.GetTransaction,
//     APIParams.GetTransaction
//   >,
// ) => {
//   const { hash, tokenType } = config?.params || { hash: '0x', tokenType: '' };
//
//   return useExtendedSWR<APIResponse.GetTransaction, APIParams.GetTransaction>(
//     config?.params === null
//       ? null
//       : CLIENT_ENDPOINTS.GET_TRANSACTION_HASH +
//           `/${hash}?tokenType=${tokenType}`,
//     nextAPI.get,
//     config,
//   );
// };
//
// export const useGetMetadataApi = (
//   config?: ExtendSWRConfiguration<
//     APIResponse.GetMetadata,
//     APIParams.GetMetadata
//   >,
// ) =>
//   useExtendedSWR<APIResponse.GetMetadata, APIParams.GetMetadata>(
//     config?.params === null
//       ? null
//       : CLIENT_ENDPOINTS.GET_METADATA + parseQueries(config?.params),
//     nextAPI.get,
//     config,
//   );
//
// export const useGetInventoryApi = (
//   config?: ExtendSWRConfiguration<APIResponse.GetInventory, any>,
// ) =>
//   useExtendedSWR<APIResponse.GetInventory>(
//     CLIENT_ENDPOINTS.GET_INVENTORY,
//     nextAPI.get,
//     config,
//   );
//
// export const useGetWeeklyRewardApi = (
//   config?: ExtendSWRConfiguration<APIResponse.GetWeeklyReward, any>,
// ) =>
//   useExtendedSWR<APIResponse.GetWeeklyReward>(
//     CLIENT_ENDPOINTS.GET_WEEKLY_REWARD,
//     nextAPI.get,
//     config,
//   );
