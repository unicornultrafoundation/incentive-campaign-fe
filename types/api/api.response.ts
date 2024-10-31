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

  export interface MembersData {
    data: {
      data: Member[];
      totalPages: number;
      currentPage: number;
      totalRecords: number;
      pageSize: number;
      totalInvest: number;
      code: string;
      totalMembers: number;
      totalCommissions: number;
      percent: number;
    };
  }

  export interface TransactionData {
    code: number;
    address: string;
    refCode: number;
    refAddress: string;
    id: string;
    type: string;
    quantity: number;
    price: number;
    amount: number;
    roundName: string;
    codeDiscount: string;
    percentDiscount: number;
    payment: number;
    hash: string;
    note: string;
  }

  export interface DetailTransactionData {
    data: {
      id: string;
      hash: string;
      nodeName: string;
      quantity: number;
      amountUsd: number;
      commission: number;
      note: string;
      createdAt: number;
    };
  }

  export interface Transaction {
    page: number;
    size: number;
    code?: string;
    address?: string;
    promotionCode?: string;
    hash?: string;
  }

  export interface Member {
    code: string;
    address: string;
    name: string;
    quantity: number;
    level: number;
    amount: number;
  }

  export interface PaginationCursor {
    limit: number;
    lastCursor: string;
  }

  export interface NodeData {
    data: {
      data: Node[];
      totalPages: number;
      currentPage: number;
      totalRecords: number;
      pageSize: number;
    };
  }

  export interface GetRounds {
    data: Round[];
  }

  export interface CodeData {
    data: string;
  }

  export interface PromotionCodeData {
    data: PromotionCode;
  }

  export interface GetTransactionData {
    data: TransactionData[];
    totalPages: number;
    currentPage: number;
    totalRecords: number;
    pageSize: number;
  }

  export interface UserAdmin {
    code: string;
    address: string;
    refCode: number;
    refAddress: string;
    brand: string;
    selfInvest: number;
    affInvest: number;
    members: number;
    affNodesRegistered: number;
  }

  export interface GetUserData {
    data: {
      data: UserAdmin[];
      totalPages: number;
      currentPage: number;
      totalRecords: number;
      pageSize: number;
    };
  }

  export interface UploadFileData {
    data: {
      agencyInfo: AgencyInfo;
      refs: Ref[];
      error: string[];
    };
  }

  export interface ApproveData {
    data: {
      status: boolean;
      errors: string[];
    };
  }

  export interface DiscountData {
    data: {
      chainId: number;
      refAddress: string;
      code: string;
      codeByte: string;
      totalDiscount: number;
      receiver: string;
      timeExpired: number;
      signature: string;
      hash: string;
    };
    error: string;
    message: string;
  }

  export interface WaitlistData {
    data: {
      chainId: number;
      roundId: number;
      nodesRegistered: number;
      nodesPurchased: number;
    };
  }

  export interface NFTData {
    data: {
      chainId: number;
      packageId: string;
      amountNft: number;
      receiver: string;
      signature: string;
      time: number;
    };
  }

  export interface SearchNodeData {
    address: string;
    type: string;
    nodes: number;
  }

  export interface RefAddressData {
    data: RootAddress;
  }

  export type GetRefAddress = APISuccessfulResponse<RefAddressData>;

  export type Connect = APISuccessfulResponse<Credentials>;

  export type GetInfoProfile = APISuccessfulResponse<User>;

  export type GetBuyHistory = APISuccessfulResponse<NodeData>;

  export type GetNodeData = APISuccessfulResponse<GetRounds>;

  export type GetMembers = APISuccessfulResponse<MembersData>;

  export type UploadFile = APISuccessfulResponse<UploadFileData>;

  export type GetTransactions = APISuccessfulResponse<{
    data: GetTransactionData;
  }>;

  export type GetDetailTransaction =
    APISuccessfulResponse<DetailTransactionData>;

  export type GetCode = APISuccessfulResponse<CodeData>;

  export type GetPromotionCode = APISuccessfulResponse<PromotionCodeData>;

  export type GetApproveData = APISuccessfulResponse<ApproveData>;

  export type GetDiscountInfo = APISuccessfulResponse<DiscountData>;
  export type GetWaitlist = APISuccessfulResponse<WaitlistData>;
  export type GetUser = APISuccessfulResponse<GetUserData>;

  export type ClaimNFT = APISuccessfulResponse<NFTData>;
  export type SearchNode = APISuccessfulResponse<{
    data: SearchNodeData[];
  }>;
}
