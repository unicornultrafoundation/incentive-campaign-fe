import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { UserStoreAction, UserStoreState } from '@/types/store/store.auth';

const DEFAULT_STATE: UserStoreState = {
  profile: null,
};

const useUserStore = create(
  devtools(
    persist<UserStoreState & UserStoreAction>(
      (set) => ({
        ...DEFAULT_STATE,
        // setters
        setProfile: (profile) => set(() => ({ profile })),
        clearProfile: () => set(() => DEFAULT_STATE),
      }),
      { name: 'user-storage' },
    ),
  ),
);

export default useUserStore;

// export const useAuthStore = create(
//   devtools<{
//     hasCredential: boolean;
//     setAuth: (hasCredential: boolean) => void;
//   }>(
//     (set) => ({
//       hasCredential: true,
//       // setters
//       setAuth: (hasCredential: boolean) => set(() => ({ hasCredential })),
//     }),
//     { name: 'auth-store' },
//   ),
// );
export const useAuthStore = create(() => ({
  hasCredential: false,
}));

export const setAuthCredential = (hasCredential: boolean) =>
  useAuthStore.setState({ hasCredential });
