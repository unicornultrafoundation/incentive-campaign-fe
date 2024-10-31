import { Address } from 'viem';
import { waitForTransactionReceipt } from '@wagmi/core';
import { useState } from 'react';
import { config } from '@/config/wagmi';

export const useWaitForTransaction = () => {
  const [isPending, setIsPending] = useState(false);

  const waitForTransaction = async (txHash: Address) => {
    try {
      setIsPending(true);
      await waitForTransactionReceipt(config, {
        hash: txHash,
      });
    } finally {
      setIsPending(false);
    }
  };

  return { waitForTransaction, isPending };
};
