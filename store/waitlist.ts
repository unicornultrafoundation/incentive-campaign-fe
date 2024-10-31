import { devtools, persist } from 'zustand/middleware';
import { create } from 'zustand';

import {
  WaitlistStoreAction,
  WaitlistStoreState,
} from '@/types/store/waitlist';

const DEFAULT_STATE: WaitlistStoreState = {
  isWaitlist: false,
  isShowBannerPreSale: false,
};

const useWaitlistStore = create(
  devtools(
    persist<WaitlistStoreState & WaitlistStoreAction>(
      (set) => ({
        ...DEFAULT_STATE,
        // setters
        setWaitlist: (open) => set(() => ({ isWaitlist: open })),
        setBannerPreSale: (show) => set(() => ({ isShowBannerPreSale: show })),
        clearWaitlist: () => set(() => DEFAULT_STATE),
      }),
      { name: 'waitlist-storage' },
    ),
  ),
);

export default useWaitlistStore;
