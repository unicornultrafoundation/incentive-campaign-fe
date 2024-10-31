import Loading from '@/components/Loading/index';
import { useUIStore } from '@/store/ui';

export default function GlobalLoading() {
  const { text, isLoading } = useUIStore((state) => state.loading);

  return <Loading isLoading={isLoading} text={text} />;
}
