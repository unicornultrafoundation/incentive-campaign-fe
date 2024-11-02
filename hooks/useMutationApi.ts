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

export const useGetUserClaimStatusApi = (
  config?: ExtendSWRMutationConfiguration<
    APIResponse.UserClaimStatusAPIResponse,
    any
  >,
) =>
  useExtendedSWRMutation<APIResponse.UserClaimStatusAPIResponse, any>(
    API_ENDPOINTS.GET_USER_CLAIM_STATUS,
    ((url: string, { arg }: any) => nextAPI.get(url, arg)) as any,
    config,
  );

export const useSignaturePublicApi = (
  config?: ExtendSWRMutationConfiguration<APIResponse.SignatureResponse, any>,
) =>
  useExtendedSWRMutation<APIResponse.SignatureResponse, any>(
    API_ENDPOINTS.SIGNATURE_PUBLIC,
    ((url: string, { arg }: any) => nextAPI.post(url, arg)) as any,
    config,
  );

export const useSignatureBitgetApi = (
  config?: ExtendSWRMutationConfiguration<APIResponse.SignatureResponse, any>,
) =>
  useExtendedSWRMutation<APIResponse.SignatureResponse, any>(
    API_ENDPOINTS.SIGNATURE_BITGET,
    ((url: string, { arg }: any) => nextAPI.post(url, arg)) as any,
    config,
  );
