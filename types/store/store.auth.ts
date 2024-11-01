import { User, UserClaimStatus } from '@/types/entities';

export interface UserStoreState {
  profile: User | null;
  userClaimStatus: UserClaimStatus | null;
}

export interface UserStoreAction {
  setProfile: (profile: User) => void;
  clearProfile: () => void;
  setUserClaimStatus: (userClaimStatus: UserClaimStatus | null) => void;
}
