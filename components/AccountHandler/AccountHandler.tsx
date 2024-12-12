import { useAccountChange } from '@/hooks/useAuth';

export default function AccountHandler() {
  useAccountChange();

  return null;
}
