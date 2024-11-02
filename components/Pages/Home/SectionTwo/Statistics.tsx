import { useEffect } from 'react';

import { useGetSubgraphDashboardPublic } from '@/hooks/useQueryApi';
import { formatDisplayedTokenAmount, toNumberNoRound } from '@/utils';

export default function Statistics() {
  const { data, mutate } = useGetSubgraphDashboardPublic({});
  const { amountStakePublic, amountHarvestPublic, totalUserPublic } =
    data?.data?.dashboards[0] || {};

  useEffect(() => {
    const interval = setInterval(() => {
      mutate();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [mutate]);
  return (
    <div className="flex justify-center w-full flex-col p-0 laptop:p-5 min-w-full laptop:min-w-[437px] gap-1 laptop:gap-[48px]">
      <div className="flex justify-center w-full laptop:flex-col min-w-full laptop:min-w-[437px] gap-2 laptop:gap-[48px]">
        <div className="basis-6/12 py-[8px] laptop:py-6 flex flex-col items-center justify-center gap-4">
          <p className="font-semibold">Epoch Rewards (U2U)</p>
          <p className="font-semibold text-3xl laptop:text-5xl text-gradient bg-gradient-to-r from-[#9299FF_48%] to-[#4651F6_168%]">
            {formatDisplayedTokenAmount(amountHarvestPublic || 0, 18)}
          </p>
        </div>
        <div className="basis-6/12 py-[8px] laptop:py-6 flex flex-col items-center justify-center gap-4">
          <p className="font-semibold">Total staked pUSDT</p>
          <p className="font-semibold text-3xl laptop:text-5xl text-gradient bg-gradient-to-r from-[#9299FF_48%] to-[#4651F6_168%]">
            {formatDisplayedTokenAmount(amountStakePublic || 0, 6)}
          </p>
        </div>
      </div>
      <div className="flex-1  py-[8px] laptop:py-6 flex flex-col items-center justify-center gap-4">
        <p className="font-semibold">Number of participants</p>
        <p className="font-semibold text-3xl laptop:text-5xl text-gradient bg-gradient-to-r from-[#9299FF_48%] to-[#4651F6_168%]">
          {toNumberNoRound(totalUserPublic || 0, 0)} USERS
        </p>
      </div>
    </div>
  );
}
