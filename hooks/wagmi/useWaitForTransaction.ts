import { Address } from 'viem';
import { waitForTransactionReceipt } from '@wagmi/core';
import { useState } from 'react';

import { config } from '@/config/wagmi';

export const useWaitForTransaction = () => {
  const [isLoading, setIsLoading] = useState(false);

  const waitForTransaction = async (txHash: Address) => {
    try {
      setIsLoading(true);
      await waitForTransactionReceipt(config, {
        hash: txHash,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { waitForTransaction, isLoading };
};

// export const useWaitForTransaction = () => (hash: `0x${string}`) =>
//   waitForTransactionReceipt(config, { hash });
