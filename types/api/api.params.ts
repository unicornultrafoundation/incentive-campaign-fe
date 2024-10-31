import { AgencyInfo, Ref } from '@/types/entities';

export type BaseSWRMutate<Params> = {
  arg: Params;
};

/** ******** =========== Queries & Params for Api call ========== ********** */
export namespace APIParams {
  export interface Pagination {
    page: number;
    size: number;
  }

  export interface SearchPagination {
    page: number;
    size: number;
    search?: string;
  }

  /** Mutation Apis **/
  export interface Connect {
    signer: string;
    signature: string;
  }

  export interface Transaction {
    page: number;
    size: number;
    code?: string;
    address?: string;
    promotionCode?: string;
    hash?: string;
  }

  export interface TransactionDetail {
    id: string;
  }

  export interface UpdatePercent {
    addOrCode: string;
    percent: number;
  }

  export interface UpdateProfile {
    avatar?: string;
    username?: string;
    coverImage?: string;
    twitterId?: string;
    teleId?: string;
    referrer?: string;
  }

  export interface UploadFile {
    files: File[] | File;
  }

  export interface JoinWaitlist {
    chainId: number;
    round: number;
    nodes: number;
  }

  /** Mutation Apis End **/

  /** Query Apis **/

  export interface ApproveData {
    agencyInfo?: AgencyInfo;
    refs?: Ref[];
    error?: string[];
  }

  export type GetNode = {
    type: string;
  };

  export type GetCode = {
    code: string;
  };

  export type GetPromotionCode = {
    codePromotion: string | undefined;
  };

  export interface DiscountInfo {
    chainId: number;
    refCode?: string;
    promotionCode?: string;
  }

  export interface Waitlist {
    chainId: number;
    roundId: number;
  }

  export interface User {
    page: number;
    size: number;
    search?: string;
  }

  export type ClaimNFT = {
    id: string;
  };

  export type SearchNode = {
    address: string;
  };

  /** Query Apis End **/
}
