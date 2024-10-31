import { Key } from 'swr';
import useSWRMutation, {
  MutationFetcher,
  SWRMutationConfiguration,
  SWRMutationResponse,
} from 'swr/mutation';

import { API_ENDPOINTS } from '@/config/api';
import { nextAPI } from '@/services/api';
import { APIParams } from '@/types/api/api.params';
import {
  APIErrorResponse,
  APIResponse,
  APISuccessfulResponse,
} from '@/types/api/api.response';

type ExtendSWRMutationConfiguration<
  Data = any,
  Args = void,
> = SWRMutationConfiguration<Data, APIErrorResponse, any, Args> & {
  notifyError?: boolean;
  notifySuccess?: boolean;
};

interface UseExtendedSWR {
  <Data extends APISuccessfulResponse<any>, Args = void>(
    key: Key,
    fetcher: MutationFetcher<Data, Key, Args>,
    config?: ExtendSWRMutationConfiguration<Data, Args>,
  ): SWRMutationResponse<Data, APIErrorResponse, Key, Args>;
}

export const useExtendedSWRMutation: UseExtendedSWR = (
  key,
  fetcher,
  config,
) => {
  const { onSuccess, onError, ...rest } = config || {};
  return useSWRMutation(key, fetcher, {
    ...rest,
    onSuccess: (data, key, config) => {
      onSuccess?.(data, key, config);
      // if (notifySuccess) {
      //   toast.success({
      //     title: 'Success',
      //     message: data.message,
      //   });
      // }
    },
    onError: (err, key, config) => {
      onError?.(err, key, config);
      // if (notifyError === undefined ? true : notifyError) {
      //   toast.error({
      //     title: err.message,
      //     message: err.error,
      //   });
      // }
    },
  });
};

export const useConnectWalletApi = (
  config?: ExtendSWRMutationConfiguration<any, any>,
) =>
  useExtendedSWRMutation<APIResponse.Connect, APIParams.Connect>(
    API_ENDPOINTS.CONNECT,
    ((url: string, { arg }: any) => nextAPI.post(url, arg)) as any,
    config,
  );

export const useGetProfileApi = (
  config?: ExtendSWRMutationConfiguration<any, any>,
) =>
  useExtendedSWRMutation<APIResponse.GetInfoProfile, any>(
    API_ENDPOINTS.GET_PROFILE,
    ((url: string, { arg }: any) => nextAPI.get(url, arg)) as any,
    config,
  );

export const useUploadApi = (
  config?: ExtendSWRMutationConfiguration<any, any>,
) => {
  const fetcher = (
    url: string,
    { arg: { files } }: any,
  ): Promise<APIResponse.UploadFile> => {
    const form = new FormData();

    if (Array.isArray(files)) {
      files.forEach((file) => {
        form.append('file', file);
      });
    } else if (files) {
      form.append('file', files);
    }
    return nextAPI.post(url, form);
  };

  return useExtendedSWRMutation<APIResponse.UploadFile, APIParams.UploadFile>(
    API_ENDPOINTS.UPLOAD_FILE,
    fetcher,
    config,
  );
};

export const useApproveDataApi = (
  config?: ExtendSWRMutationConfiguration<any, any>,
) =>
  useExtendedSWRMutation<APIResponse.GetApproveData, APIParams.ApproveData>(
    API_ENDPOINTS.APPROVE_DATA,
    ((url: string, { arg }: any) => nextAPI.post(url, arg)) as any,
    config,
  );

export const useUpdatePercentComApi = (
  config?: ExtendSWRMutationConfiguration<any, APIParams.UpdatePercent>,
) =>
  useExtendedSWRMutation<any, APIParams.UpdatePercent>(
    API_ENDPOINTS.UPDATE_PERCENT_COM,
    ((url: string, { arg }: any) => nextAPI.post(url, arg)) as any,
    config,
  );

export const useUpdatePercentApi = (
  config?: ExtendSWRMutationConfiguration<any, APIParams.UpdatePercent>,
) =>
  useExtendedSWRMutation<any, APIParams.UpdatePercent>(
    API_ENDPOINTS.UPDATE_PERCENT,
    ((url: string, { arg }: any) => nextAPI.post(url, arg)) as any,
    config,
  );

export const useGetTransactionApi = (
  config?: ExtendSWRMutationConfiguration<
    APIResponse.GetTransactions,
    APIParams.Transaction
  >,
) =>
  useExtendedSWRMutation<APIResponse.GetTransactions, APIParams.Transaction>(
    API_ENDPOINTS.GET_TRANSACTION,
    ((url: string, { arg }: any) => nextAPI.post(url, arg)) as any,
    config,
  );

export const useGetDiscountInfoApi = (
  config?: ExtendSWRMutationConfiguration<
    APIResponse.GetDiscountInfo,
    APIParams.DiscountInfo
  >,
) =>
  useExtendedSWRMutation<APIResponse.GetDiscountInfo, APIParams.DiscountInfo>(
    API_ENDPOINTS.GET_DISCOUNT_INFO,
    ((url: string, { arg }: any) => nextAPI.post(url, arg)) as any,
    config,
  );

export const useJoinWaitlistApi = (
  config?: ExtendSWRMutationConfiguration<any, APIParams.JoinWaitlist>,
) =>
  useExtendedSWRMutation<any, APIParams.JoinWaitlist>(
    API_ENDPOINTS.JOIN_WAITLIST,
    ((url: string, { arg }: any) => nextAPI.post(url, arg)) as any,
    config,
  );

export const useGetUserApi = (
  config?: ExtendSWRMutationConfiguration<APIResponse.GetUser, APIParams.User>,
) =>
  useExtendedSWRMutation<APIResponse.GetUser, APIParams.User>(
    API_ENDPOINTS.GET_USER,
    ((url: string, { arg }: any) => nextAPI.post(url, arg)) as any,
    config,
  );

export const useClaimNFTApi = (
  config?: ExtendSWRMutationConfiguration<
    APIResponse.ClaimNFT,
    APIParams.ClaimNFT
  >,
) =>
  useExtendedSWRMutation<APIResponse.ClaimNFT, APIParams.ClaimNFT>(
    API_ENDPOINTS.GET_CLAIM_NFT,
    ((url: string, { arg }: any) => nextAPI.get(url, arg)) as any,
    config,
  );
