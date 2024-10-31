import { DropdownBaseProps } from '@/components/Dropdown/DropdownBase';
import { Round } from '@/types/entities';

export namespace FormState {
  export interface Purchase {
    referralCode?: string;
    promotionCode?: string;
    step: number;
    numberNode: number;
    refAddress?: string;
    isShowPurchase: boolean;
    isShowPurchaseSuccess: boolean;
    isShowPreSale: boolean;
    isShowPreSaleJoinWhitelist: boolean;
  }

  export interface ConnectWallet {
    isOpenConnectWallet: boolean;
    isShowSignMessage: boolean;
    isShowChooseChain: boolean;
  }

  export interface Header {
    isOpenSideBar: boolean;
    isOpenConnectWallet: boolean;
  }

  export interface SubmitForm {
    activeTab: string;
    activeSubTab: string;
    file?: Blob;
    transactionId?: string | null;

    isShowPreSale: boolean;
    isShowPreSaleJoinWhitelist: boolean;
    preSaleType: 'claim' | 'joinWhiteList' | undefined;
    dataRoundPreSale: Round | null;

    dataCountDown: {
      days: string;
      hours: string;
      minutes: string;
      seconds: string;
    };

    isShowBannerPreSale: boolean;
  }

  export interface PreSale {
    referralCode: string;
    numberNode: number;
    maxNode: number;
  }

  export interface SaleTime {
    roundId: DropdownBaseProps['options'][number] | null;
    dataOpening: Date | null;
    dataClosing: Date | null;
    isOpenOpening: boolean;
    isOpenClosing: boolean;

    nodePerUser: number | '';
    discount: number | '';

    isOpenSuccessSubmit: boolean;
  }

  export interface UpdatePercent {
    addr: string;
    percent: number;
  }

  export interface AdminConfig {
    roundId: DropdownBaseProps['options'][number] | null;
    address: string;
    percent: number;
    timePublicId: DropdownBaseProps['options'][number] | null;
    dataTimePublicOpening: Date | null;
    isTimePublicOpening: boolean;
    dataTimePriority: Date | null;
    isTimePriority: boolean;
    activeRoundId: DropdownBaseProps['options'][number] | null;
    timePriority: number;
  }

  export interface BannerPresale {
    isShowPreSale: boolean;
    isShowPreSaleJoinWhitelist: boolean;
    preSaleType: 'claim' | 'joinWhiteList';
    dataRoundPreSale: Round | null;
  }

  export interface Whitelist {
    numberNode: number | '';
    maxNode: number;
  }
  export interface User {
    searchText: string | '';
  }
}
