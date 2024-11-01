import {
  AgencyInfo,
  Credentials,
  Node,
  PromotionCode,
  Ref,
  RootAddress,
  Round,
  User,
} from '@/types/entities';
import { DashboardBitget, DashboardPublic } from '@/types/subgraph.response';

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

  export type SearchNode = APISuccessfulResponse<{
    data: SearchNodeData[];
  }>;

  export type DashBoardPublic = APISuccessfulResponse<DashboardPublicData>;
  export type DashBoardBitget = APISuccessfulResponse<DashboardBitgetData>;

  export type Connect = APISuccessfulResponse<Credentials>;
}
