import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { Address, maxUint256 } from 'viem';

import { useWaitForTransaction } from '@/hooks/wagmi/useWaitForTransaction';
// import { useLoading } from '@/hooks/useUIUtils';
import { contracts } from '@/config/env';
// import { REFRESH_INTERVAL } from '@/config/constants';

// export const useBalancePUSDT = () => {
//   const { address } = useAccount();
//   return useReadContract({
//     ...contracts.pUSDT,
//     functionName: 'balanceOf',
//     args: [address as Address],
//     query: {
//       enabled: !!address,
//       refetchInterval: REFRESH_INTERVAL.FAST,
//       retry: false,
//     },
//   });
// };
//
// export const useAllowancePUSDT = () => {
//   const { address } = useAccount();
//   return useReadContract({
//     ...contracts.pUSDT,
//     functionName: 'allowance',
//     args: [address as Address, contracts.pUSDT.address as Address],
//     query: {
//       enabled: !!address,
//       refetchInterval: REFRESH_INTERVAL.FAST,
//       retry: false,
//     },
//   });
// };
//
// export const useApprovePUsdt = () => {
//   const loading = useLoading();
//   const [isLoading, setIsLoading] = useState(false);
//   const { writeContractAsync } = useWriteContract();
//   const { waitForTransaction, isPending } = useWaitForTransaction();
//   // const { address } = useAccount();
//   return {};
// };

export const usePUSDT = () => {
  const { address } = useAccount();
  const method = useWriteContract();
  const { waitForTransaction } = useWaitForTransaction();

  const { data: balanceOfUsdt } = useReadContract({
    // abi: abiUsdtToken,
    // address: env.CONTRACT_USDT_TOKEN_ADDRESS,
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
