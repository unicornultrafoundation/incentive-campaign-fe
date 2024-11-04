import { Credentials, UserClaimStatus } from '@/types/entities';
import {
  DashboardBitget,
  DashboardPublic,
  TransactionReward,
} from '@/types/subgraph.response';
import { Address } from 'viem';

export interface APIErrorResponse {
  data?: any;
  error: string;
  message: string;
  status: number;
}

export interface APISuccessfulResponse<Data> {
  message: string;
  data: Data;
}

/** ******** =========== API Response types ========== ********** */
export namespace APIResponse {
  export interface Pagination {
    hasNext: boolean;
    limit: number;
    page: number;
  }
  export interface User {
    data: {
      address: Address;
      code: string;
      refAddress: Address;
      refCode: string;
      brand: string;
      role: string;
      active: boolean;
      createdAt: string;
      createdBy: string;
      percent: boolean;
      userProfile: boolean;
    };
  }
  export interface SearchNodeData {
    address: string;
    type: string;
    nodes: number;
  }
  export interface DashboardPublicData {
    dashboards: DashboardPublic[];
  }

  export interface DashboardBitgetData {
    dashboards: DashboardBitget[];
  }

  export interface TransactionRewardData {
    transactionPools: TransactionReward[];
  }

  export interface SignatureData {
    data: {
      sig: string;
      expiresAt: number;
    };
  }

  export type SearchNode = APISuccessfulResponse<{
    data: SearchNodeData[];
  }>;
  export type UserClaimStatusAPIResponse = APISuccessfulResponse<{
    data: UserClaimStatus;
  }>;

  export type DashBoardPublic = APISuccessfulResponse<DashboardPublicData>;
  export type DashBoardBitget = APISuccessfulResponse<DashboardBitgetData>;
  export type TransactionRewardResponse =
    APISuccessfulResponse<TransactionRewardData>;

  export type SignatureResponse = APISuccessfulResponse<SignatureData>;

  export type Connect = APISuccessfulResponse<Credentials>;
  export type GetInfoProfile = APISuccessfulResponse<User>;
}
