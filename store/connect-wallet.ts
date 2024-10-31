import { devtools, persist } from 'zustand/middleware';
import { create } from 'zustand';

import {
  WalletConnectStoreAction,
  WalletConnectStoreState,
} from '@/types/store/store.wallet-conect';

const DEFAULT_STATE: WalletConnectStoreState = {
  isOpen: false,
};

const useWalletStore = create(
  devtools(
    persist<WalletConnectStoreState & WalletConnectStoreAction>(
      (set) => ({
        ...DEFAULT_STATE,
        // setters
        setOpen: (open) => set(() => ({ isOpen: open })),
        onClosed: () => set(() => ({ isOpen: false })),
      }),
      { name: 'wallet-storage' },
    ),
  ),
);

export default useWalletStore;
