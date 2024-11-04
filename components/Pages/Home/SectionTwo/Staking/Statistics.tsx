import { useEffect } from 'react';

import {
  useGetSubgraphDashboardBitget,
  useGetSubgraphDashboardPublic,
} from '@/hooks/useQueryApi';
import { formatDisplayedTokenAmount, toNumberNoRound } from '@/utils';
import { CAMPAIGN_TYPE } from '@/config/env';

export default function Statistics() {
  const { data: publicData, mutate: publicMutate } =
    useGetSubgraphDashboardPublic({
      refreshInterval: 1000,
    });
  const { amountStakePublic, amountHarvestPublic, totalUserPublic } =
    publicData?.data?.dashboards[0] || {};

  const { data: bitgetData, mutate: bitgetMutate } =
    useGetSubgraphDashboardBitget({
      refreshInterval: 1000,
    });
  const { amountStakeBitget, amountHarvestBitget, totalUserBitget } =
    bitgetData?.data?.dashboards[0] || {};

  useEffect(() => {
    const interval = setInterval(() => {
      if (CAMPAIGN_TYPE.toLowerCase() === 'public') {
        publicMutate();
      } else {
        bitgetMutate();
      }
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [publicMutate, bitgetMutate]);
  return (
    <div className="flex justify-center w-full flex-col p-0 laptop:p-5 min-w-full laptop:min-w-[437px] gap-1 laptop:gap-[48px]">
      <div className="flex justify-center w-full laptop:flex-col min-w-full laptop:min-w-[437px] gap-2 laptop:gap-[48px]">
        <div className="basis-6/12 py-[8px] laptop:py-6 flex flex-col items-center justify-center gap-4">
          <p className="font-semibold">Total Rewards (U2U)</p>
          <p className="font-semibold text-3xl laptop:text-5xl text-gradient bg-gradient-to-r from-[#9299FF_48%] to-[#4651F6_168%]">
            {formatDisplayedTokenAmount(
              CAMPAIGN_TYPE.toLowerCase() === 'public'
                ? amountHarvestPublic
                : amountHarvestBitget || 0,
              18,
            )}
          </p>
        </div>
        <div className="basis-6/12 py-[8px] laptop:py-6 flex flex-col items-center justify-center gap-4">
          <p className="font-semibold">Total staked pUSDT</p>
          <p className="font-semibold text-3xl laptop:text-5xl text-gradient bg-gradient-to-r from-[#9299FF_48%] to-[#4651F6_168%]">
            {formatDisplayedTokenAmount(
              CAMPAIGN_TYPE.toLowerCase() === 'public'
                ? amountStakePublic
                : amountStakeBitget || 0,
              6,
            )}
          </p>
        </div>
      </div>
      <div className="flex-1  py-[8px] laptop:py-6 flex flex-col items-center justify-center gap-4">
        <p className="font-semibold">Number of participants</p>
        <p className="font-semibold text-3xl laptop:text-5xl text-gradient bg-gradient-to-r from-[#9299FF_48%] to-[#4651F6_168%]">
          {toNumberNoRound(
            CAMPAIGN_TYPE.toLowerCase() === 'public' ? totalUserPublic : totalUserBitget || 0,
            0,
          )}{' '}
          USERS
        </p>
      </div>
    </div>
  );
}
