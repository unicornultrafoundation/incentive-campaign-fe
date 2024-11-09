import {
  useAccount,
  useBlockNumber,
  useReadContracts,
  useWriteContract,
} from 'wagmi';
import { Address, maxUint256 } from 'viem';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { useWaitForTransaction } from '@/hooks/wagmi/useWaitForTransaction';
import { contracts } from '@/config/env';

export const usePUSDT = () => {
  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { address } = useAccount();
  const method = useWriteContract();
  const { waitForTransaction } = useWaitForTransaction();

  const { data, queryKey } = useReadContracts({
    contracts: [
      {
        ...contracts.pUSDT,
        functionName: 'allowance',
        args: [address as Address, contracts.stakePublic.address as Address],
      },
      {
        ...contracts.pUSDT,
        functionName: 'balanceOf',
        args: [address as Address],
      },
    ],
    query: {
      refetchInterval: 3000,
      enabled: !!address,
    },
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [blockNumber, queryClient]);

  // const { data: balanceOfUsdt } = useReadContract({
  //   ...contracts.pUSDT,
  //   functionName: 'balanceOf',
  //   args: [address as Address],
  //   query: {
  //     refetchInterval: 3000,
  //   },
  // });

  // const { data: allowancePUSDT } = useReadContract({
  //   ...contracts.pUSDT,
  //   functionName: 'allowance',
  //   args: [address as Address, contracts.stakePublic.address as Address],
  //   query: {
  //     refetchInterval: 3000,
  //   },
  // });

  const onApprovePUsdt = async () => {
    const txhash = await method.writeContractAsync({
      ...contracts.pUSDT,
      functionName: 'approve',
      args: [contracts.stakePublic.address, maxUint256],
    });
    return waitForTransaction(txhash);
  };
  return {
    ...method,
    balanceOfUsdt: data ? data[1].result : 0,
    allowancePUSDT: data ? data[0].result : 0,
    onApprovePUsdt,
  };
};
