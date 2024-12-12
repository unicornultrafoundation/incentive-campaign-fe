import {
  useAccount,
  useReadContract,
  useReadContracts,
  useWriteContract,
} from 'wagmi';
import { Address } from 'viem';
import { useMemo } from 'react';

import { useWaitForTransaction } from '@/hooks/wagmi/useWaitForTransaction';
import { contracts } from '@/config/env';

export const useStakeV2 = () => {
  const method = useWriteContract();
  const { waitForTransaction } = useWaitForTransaction();
  const { address } = useAccount();

  const { data: endTime } = useReadContract({
    ...contracts.stakePublicV2,
    functionName: 'endTime',
    args: [],
    query: {
      // refetchInterval: 3000,
    },
  });

  const { data: claimableTime } = useReadContract({
    ...contracts.stakePublicV2,
    functionName: 'claimableTime',
    args: [],
    query: {
      // refetchInterval: 3000,
    },
  });
  const { data } = useReadContracts({
    contracts: [
      {
        ...contracts.stakePublicV2,
        functionName: 'getUserInfo',
        args: [address as Address],
      },
      {
        ...contracts.stakePublicV2,
        functionName: 'pendingRewards',
        args: [address as Address],
      },
    ],
    query: {
      enabled: !!address,
      refetchInterval: 3000,
    },
  });

  // const { data: getUserInfo } = useReadContract({
  //   ...contracts.stakePublicV2,
  //   functionName: 'getUserInfo',
  //   args: [address as Address],
  //   query: {
  //     refetchInterval: 3000,
  //   },
  // });

  // const { data: pendingReward } = useReadContract({
  //   ...contracts.stakePublicV2,
  //   functionName: 'pendingRewards',
  //   args: [address as Address],
  //   query: {
  //     refetchInterval: 3000,
  //   },
  // });

  type UserInfo = [bigint, bigint, bigint];

  const [totalStaked, latestHarvest, totalClaimed] = useMemo(
    () => (data && data[0].result ? (data[0].result as UserInfo) : []),
    [data],
  );
  const { data: rewardsRatePerSecond } = useReadContract({
    ...contracts.stakePublicV2,
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
      ...contracts.stakePublicV2,
      functionName: 'stake',
      args: [parseAmount, expiresAt, signature],
    });
    return waitForTransaction(txhash);
  };

  const onClaim = async () => {
    const txhash = await method.writeContractAsync({
      ...contracts.stakePublicV2,
      functionName: 'harvest',
      args: [],
    });
    return waitForTransaction(txhash);
  };
  const onUnStakeV2 = async () => {
    const txhash = await method.writeContractAsync({
      ...contracts.stakePublicV2,
      functionName: 'unstake',
      args: [],
    });
    return waitForTransaction(txhash);
  };

  const onUnStakeV1 = async () => {
    const txhash = await method.writeContractAsync({
      ...contracts.stakePublicV2,
      functionName: 'legacyPoolUnstake',
      args: [],
    });
    return waitForTransaction(txhash);
  };

  return {
    ...method,
    onStake,
    endTime,
    rewardsRatePerSecond,
    getUserInfo: data && data[0].result ? data[0].result : null,
    totalStaked,
    latestHarvest,
    totalClaimed,
    pendingReward: data && data[1].result ? data[1].result : null,
    onClaim,
    onUnStakeV2,
    onUnStakeV1,
    claimableTime,
  };
};
