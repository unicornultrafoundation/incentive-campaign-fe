import { useEffect, useMemo, useState } from 'react';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';
import { format } from 'date-fns';

import Button from '@/components/Button';
import { formatDisplayedTokenAmount, toNumberNoRound } from '@/utils';
import { useStake } from '@/hooks/useStake';
import { toast } from '@/store/ui';
import ConnectWalletButton from '@/components/ConnectWalletButton/ConnectWalletButton';
import Icon from '@/components/Icon';
import { shortenAddress } from '@/utils/string';

export default function ClaimReward() {
  const { rewardsRatePerSecond, endTime, pendingReward } = useStake(); //endTime
  const onStaking = useStake();
  const {
    onUnStake,
    onClaim,
    isPending,
    isSuccess,
    isError,
    totalStaked,
    totalClaimed,
    claimableTime,
  } = onStaking;
  const [currentDate, setCurrentDate] = useState<number>(Date.now());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingUnStake, setIsLoadingUnStake] = useState<boolean>(false);
  const { address } = useAccount();

  const handleClaim = async () => {
    try {
      setIsLoading(true);
      await onClaim();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  const handleUnStake = async () => {
    try {
      setIsLoadingUnStake(true);
      await onUnStake();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoadingUnStake(false);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toast.success({ message: 'Claim successfully' });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error({ message: 'Claim fail' });
    }
  }, [isError]);

  const currentRate = useMemo(() => {
    if (rewardsRatePerSecond) {
      const rewards = Number(rewardsRatePerSecond || 0) * 86400;
      return Number(formatUnits(BigInt(rewards * 1000000), 18));
    }
    return;
  }, [rewardsRatePerSecond]);

  const estimateRewardsPerDay = useMemo(() => {
    const total = Number(formatUnits(BigInt(Number(totalStaked) || 0), 6));
    return Number(total) * Number(currentRate);
  }, [currentDate, totalStaked]);

  const stakeDuration = useMemo(() => {
    const currentTime = currentDate / 1000;
    const timeDifferenceInSeconds = Number(endTime) - currentTime;
    return Math.floor(timeDifferenceInSeconds / 86400);
  }, [currentDate, endTime]);

  // const claimTime = useMemo(() => {
  //   const currentTime = currentDate / 1000;
  //   const timeDifferenceInSeconds = Number(claimableTime) - currentTime;
  //
  //   const days = Math.floor(timeDifferenceInSeconds / 86400);
  //   const hours = Math.floor((timeDifferenceInSeconds % 86400) / 3600);
  //   const minutes = Math.floor((timeDifferenceInSeconds % 3600) / 60);
  //   const seconds = Math.floor(timeDifferenceInSeconds % 60);
  //
  //   return { days, hours, minutes, seconds };
  // }, [currentDate, claimableTime]);

  const isClaimable = useMemo(() => {
    const currentTime = currentDate / 1000;
    return currentTime < Number(claimableTime);
  }, [currentDate, claimableTime]);

  const isWithdraw = useMemo(() => {
    const currentTime = currentDate / 1000;
    return currentTime > Number(endTime);
  }, []);

  return (
    <>
      <div className="flex flex-col-reverse laptop:flex-row gap-4 laptop:gap-0 w-full">
        <div className="p-5 laptop:p-8 flex flex-col w-full gap-8 rounded-2xl bg-[#14141480] backdrop-blur-[2px] border border-solid border-[#4A4A4A]">
          <div className="">
            <div className="flex flex-col gap-5">
              <div className="flex justify-between items-center">
                <p className="text-base laptop:text-xl font-semibold">
                  Wallet Address
                </p>
                <p className="text-lg laptop:text-2xl font-bold text-[#7EFFC5]">
                  {shortenAddress(address)}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-base laptop:text-xl font-semibold">Staked</p>
                <p className="text-lg laptop:text-2xl font-bold text-[#7EFFC5]">
                  {formatDisplayedTokenAmount(Number(totalStaked || 0), 6)}{' '}
                  $pUSDT
                </p>
              </div>
              <div className="flex justify-between items-start">
                <div className="flex flex-1 flex-col gap-1 items-start">
                  <p className="text-base laptop:text-xl font-semibold">
                    Claimable
                  </p>
                </div>
                <p className="text-lg laptop:text-2xl font-bold text-[#7EFFC5]">
                  {toNumberNoRound(
                    Number(formatUnits(BigInt(Number(pendingReward) || 0), 18)),
                    3,
                  )}{' '}
                  $U2U
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-base laptop:text-xl font-semibold">
                  Current rate
                </p>
                <p className="text-lg laptop:text-2xl font-bold text-[#7EFFC5]">
                  {toNumberNoRound(estimateRewardsPerDay, 3)} U2U/day
                </p>
              </div>
            </div>
            <div className="w-full flex items-center gap-2 mt-6">
              <Icon.IconWarning width={24} height={24} />
              <p className="text-sm laptop:text-base font-semibold text-[#FF72B4]">
                Note: Rewards can be claimed at{' '}
                {format(
                  new Date(1000 * Number(claimableTime)),
                  'yyyy-MM-dd HH:mm:ss',
                )}
                . Please check back later.
              </p>
            </div>
          </div>
          <hr className="border-[#4A4A4A]" />
          <div className="flex items-center gap-6 mt-4">
            <ConnectWalletButton
              showConnectButton
              className="flex justify-center h-12 laptop:h-[64px] !rounded-xl laptop:!rounded-2xl"
            >
              <Button
                loading={isPending || isLoading}
                disabled={isClaimable}
                loadingText={'Claiming...'}
                scale="md"
                className="h-12 laptop:h-[64px] disabled:bg-[#4A4A4A] disabled:!shadow-none disabled:text-[#92929299] p-4 w-full !rounded-xl laptop:!rounded-2xl bg-[#7EFFC5] hover:!bg-transparent text-[#141414] hover:text-[#7EFFC5]  flex items-center justify-center gap-1 border border-solid hover:!border-[#7EFFC5] !border-[#8C8C99]"
                onClick={handleClaim}
              >
                Claim
              </Button>
            </ConnectWalletButton>

            <Button
              loading={isPending || isLoadingUnStake}
              disabled={!isWithdraw}
              loadingText={'Processing...'}
              scale="md"
              className="h-12 laptop:h-[64px] disabled:bg-[#4A4A4A] disabled:!shadow-none disabled:text-[#92929299] disabled:!border-[#8C8C99] p-4 w-full !rounded-xl laptop:!rounded-2xl bg-[#4651F6] hover:!bg-transparent text-white hover:text-[#7EFFC5]  flex items-center justify-center gap-1 border border-solid hover:!border-[#7EFFC5] !border-[#4651F6]"
              onClick={handleUnStake}
            >
              Withdraw
            </Button>
          </div>
        </div>
        <div className="flex justify-center w-full flex-col p-0 laptop:p-5 min-w-full laptop:min-w-[437px] gap-1 laptop:gap-6">
          <div className="flex justify-center w-full laptop:flex-col min-w-full laptop:min-w-[437px] gap-2 laptop:gap-6">
            <div className="basis-6/12 py-[8px] laptop:py-6 flex flex-col items-center justify-center gap-4">
              <p className="font-semibold">Total Earnings</p>
              <p className="font-semibold text-3xl laptop:text-5xl text-gradient bg-gradient-to-r from-[#9299FF_48%] to-[#4651F6_168%]">
                {formatDisplayedTokenAmount(Number(totalClaimed || 0), 18)} $U2U
              </p>
            </div>
            <div className="basis-6/12 py-[8px] laptop:py-6 flex flex-col items-center justify-center gap-4">
              <p className="font-semibold">Stake Duration</p>
              <p className="font-semibold text-3xl laptop:text-5xl text-gradient bg-gradient-to-r from-[#9299FF_48%] to-[#4651F6_168%]">
                {stakeDuration} Days
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
