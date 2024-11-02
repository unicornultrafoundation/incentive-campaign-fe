import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { Address } from 'viem';
import { useMemo } from 'react';

import { useWaitForTransaction } from '@/hooks/wagmi/useWaitForTransaction';
import { contracts } from '@/config/env';

export const useStake = () => {
  const method = useWriteContract();
  const { waitForTransaction } = useWaitForTransaction();
  const { address } = useAccount();

  const { data: endTime } = useReadContract({
    ...contracts.stakePublic,
    functionName: 'endTime',
    args: [],
    query: {
      // refetchInterval: 3000,
    },
  });
  const { data: getUserInfo } = useReadContract({
    ...contracts.stakePublic,
    functionName: 'getUserInfo',
    args: [address as Address],
    query: {
      refetchInterval: 3000,
    },
  });

  type UserInfo = [bigint, bigint, bigint];

  const [totalStaked, latestHarvest, totalClaimed] = useMemo(
    () => (getUserInfo as UserInfo) || [],
    [getUserInfo],
  );
  const { data: rewardsRatePerSecond } = useReadContract({
    ...contracts.stakePublic,
    functionName: 'rewardsRatePerSecond',
    args: [],
    query: {
      // refetchInterval: 3000,
    },
  });

  const onStake = async ({
    amount,
    expiresAt,
    signature,
  }: {
    amount: number;
    expiresAt: number;
    signature: string;
  }) => {
    const parseAmount = amount * 1000000;
    const txhash = await method.writeContractAsync({
      // abi: abiBuyUg,
      // address: env.CONTRACT_BUY_UG_ADDRESS,
      ...contracts.stakePublic,
      functionName: 'stake',
      args: [parseAmount, expiresAt, signature],
    });
    return waitForTransaction(txhash);
  };
  return {
    ...method,
    onStake,
    endTime,
    rewardsRatePerSecond,
    getUserInfo,
    totalStaked,
    latestHarvest,
    totalClaimed,
  };
};
