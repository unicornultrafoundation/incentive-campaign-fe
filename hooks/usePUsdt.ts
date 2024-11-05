import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { Address, maxUint256 } from 'viem';

import { useWaitForTransaction } from '@/hooks/wagmi/useWaitForTransaction';
// import { useLoading } from '@/hooks/useUIUtils';
import { contracts } from '@/config/env';
// import { REFRESH_INTERVAL } from '@/config/constants';

export const usePUSDT = () => {
  const { address } = useAccount();
  const method = useWriteContract();
  const { waitForTransaction } = useWaitForTransaction();

  const { data: balanceOfUsdt } = useReadContract({
    ...contracts.pUSDT,
    functionName: 'balanceOf',
    args: [address as Address],
    query: {
      refetchInterval: 3000,
    },
  });

  const { data: allowancePUSDT } = useReadContract({
    ...contracts.pUSDT,
    functionName: 'allowance',
    args: [address as Address, contracts.stakePublic.address as Address],
    query: {
      refetchInterval: 3000,
    },
  });

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
    balanceOfUsdt,
    allowancePUSDT,
    onApprovePUsdt,
  };
};
