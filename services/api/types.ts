import { Address } from 'viem';

/********** =========== Queries & Params for Api call ========== ***********/
export namespace APIParams {
  export interface PaginationParams {
    page?: number;
    limit?: number;
    hasNext?: boolean;
  }

  export interface WithAuth {
    accessToken?: string;
  }

  export interface Connect {
    date: string;
    publicKey: Address;
    signature: Address;
    signer: string;
  }
}

/********** =========== API Response types ========== ***********/
export namespace APIResponse {
  export interface Pagination {
    page: number;
    limit: number;
    hasNext: boolean;
  }

  export interface Connect {
    data: {
      accessToken: string;
      accessTokenExpire: number;
      refreshToken: string;
      refreshTokenExpire: number;
    };
    message: string;
    status: string;
  }

  export interface User {
    address: Address;
    code: string;
    refAddress: string;
    refCode: string;
    brand: string;
    role: string;
    active: boolean;
    createdAt: string;
    createdBy: string;
    percent: boolean;
    userProfile: boolean;
  }
}
