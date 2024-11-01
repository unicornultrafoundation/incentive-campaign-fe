import { useCallback, useMemo, useState } from 'react';
import { Address } from 'viem';
import { useWriteContract } from 'wagmi';

import { contracts } from '@/config/env';
import { useLoading } from '@/hooks/useUIUtils';
import { useWaitForTransaction } from '@/hooks/wagmi/useWaitForTransaction';

export const useNFT = () => {
  const loading = useLoading();
  const [isLoading, setIsLoading] = useState(false);
  const { writeContractAsync } = useWriteContract();
  const { waitForTransaction, isPending } = useWaitForTransaction();
  // const { address } = useAccount();
  // const { chainId: currentChainId } = useChainStore((state) => state.chain);

  return {
    isPending,
    isLoading,
  };
};
