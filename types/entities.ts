import { Address } from 'viem';

export interface UserCredentials {
  accessToken: string;
  refreshToken: string;
}

export interface Credentials {
  refreshToken: string;
  refreshTokenExpire: number;
  accessToken: string;
  accessTokenExpire: number;
  userId: string;
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

export interface UploadData {
  data: {
    data: UploadFileExcelData;
    message: string;
    status: string;
  };
  message: string;
  status: string;
}

export interface UploadFileExcelData {
  agencyInfo: AgencyInfo;
  refs: Ref[];
  error: string[];
}

export interface AgencyInfo {
  name: string;
  email: string;
  telegram: string;
  address: string;
  project: string;
  round: string;
  quantity: number;
}

export interface Ref {
  address: string;
  type: number;
  quantity: number;
}

export interface WhiteList {
  id: number;
  chainId: number;
  chainName: string;
  preSale: boolean;
  startTime: number;
  endTime: number;
  nodeSales: number;
  nodePerUser: number;
  currentSale: number;
  enableDiscount: boolean;
  joined: number;
  discount: number;
  timeOpenPublic: number;
  timePriority: number;
}

export interface Sale {
  chainId: number;
  chain: string;
  type: string;
  currentSale: number;
  createdBy: number;
  createdAt: number;
}

export interface Round {
  id: number;
  name: string;
  price: number;
  nodeSale: number;
  currentSale: number;
  type: string;
  active: boolean;
  sale: Sale[];
  whiteList: WhiteList[];
}

export interface Node {
  id: string;
  createdAt: number;
  createdBy: string;
  packId: number;
  code: string;
  address: string;
  type: string;
  quantity: number;
  price: number;
  amount: number;
  round: number;
  roundName: string;
  codeDiscount: string;
  percentDiscount: number;
  payment: number;
  hash: string;
  note: any;
  hashNFt: number;
  commissions: any[];
}

export interface PromotionCode {
  code: string;
  codeByte: string;
  discount: number;
  receiver: string;
  signature: string;
  hash: string;
}

export interface CurrentChain {
  chain: string;
  chainId: number;
}

export interface RootAddress {
  data: string;
}

export interface WalletConnect {
  isOpen: boolean;
  onClose?: () => void;
}
