export interface WaitlistStoreState {
  isWaitlist: boolean;
  isShowBannerPreSale: boolean;
}

export interface WaitlistStoreAction {
  setWaitlist: (waitlist: boolean) => void;
  setBannerPreSale: (show: boolean) => void;
  clearWaitlist: () => void;
}
