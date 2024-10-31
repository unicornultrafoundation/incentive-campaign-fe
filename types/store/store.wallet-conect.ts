export interface WalletConnectStoreState {
  isOpen: boolean;
  onClosed?: () => void;
}

export interface WalletConnectStoreAction {
  setOpen: (open: boolean) => void;
  onClosed: () => void;
}
