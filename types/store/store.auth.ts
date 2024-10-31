import { User } from '@/types/entities';

export interface UserStoreState {
  profile: User | null;
}

export interface UserStoreAction {
  setProfile: (profile: User) => void;
  clearProfile: () => void;
}
