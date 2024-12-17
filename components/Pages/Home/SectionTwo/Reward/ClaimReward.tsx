import { useEffect, useMemo, useState } from 'react';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Button from '@/components/Button';
import { formatDisplayedTokenAmount, toNumberNoRound } from '@/utils';
import { useStake } from '@/hooks/useStake';
import { toast } from '@/store/ui';
import ConnectWalletButton from '@/components/ConnectWalletButton/ConnectWalletButton';
import Icon from '@/components/Icon';
import { classNames, shortenAddress } from '@/utils/string';
import { useStakeV2 } from '@/hooks/useStakeV2';

export default function ClaimReward() {
  const { rewardsRatePerSecond, endTime, pendingReward } = useStake(); //endTime
  const onStaking = useStake();
  const { onClaim, isPending, isSuccess, isError, totalStaked, totalClaimed } =
    onStaking;

  const {
    rewardsRatePerSecond: rewardsRatePerSecondV2,
    pendingReward: pendingRewardV2,
  } = useStakeV2(); //endTime
  const onStakingV2 = useStakeV2();
  const {
    onUnStakeV1,
    onUnStakeV2,
    onClaim: onClaimV2,
    isPending: isPendingV2,
    isSuccess: isSuccessV2,
    isError: isErrorV2,
    totalStaked: totalStakedV2,
    totalClaimed: totalClaimedV2,
  } = onStakingV2;
  const [currentDate, setCurrentDate] = useState<number>(Date.now());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingV2, setIsLoadingV2] = useState<boolean>(false);
  const [isLoadingUnStake, setIsLoadingUnStake] = useState<boolean>(false);
  const [isLoadingUnStakeV2, setIsLoadingUnStakeV2] = useState<boolean>(false);
  const { address } = useAccount();

  const handleClaimV1 = async () => {
    try {
      setIsLoading(true);
      await onClaim();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  const handleClaimV2 = async () => {
    try {
      setIsLoadingV2(true);
      await onClaimV2();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoadingV2(false);
    }
  };
  const handleUnStakeV1 = async () => {
    try {
      setIsLoadingUnStake(true);
      await onUnStakeV1();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoadingUnStake(false);
    }
  };
  const handleUnStakeV2 = async () => {
    try {
      setIsLoadingUnStakeV2(true);
      await onUnStakeV2();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoadingUnStakeV2(false);
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
    if (isSuccessV2) {
      toast.success({ message: 'Claim successfully' });
    }
  }, [isSuccessV2]);

  useEffect(() => {
    if (isError) {
      toast.error({ message: 'Claim fail' });
    }
  }, [isError]);
  useEffect(() => {
    if (isErrorV2) {
      toast.error({ message: 'Claim fail' });
    }
  }, [isErrorV2]);

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
    const totalStakingSeconds = 60 * 60 * 24 * 90;
    const startTime = Number(endTime) - totalStakingSeconds;
    const timeDifferenceInSeconds =
      startTime > currentTime
        ? totalStakingSeconds
        : Number(endTime) - currentTime;
    return Math.ceil(timeDifferenceInSeconds / 86400);
  }, [currentDate, endTime]);

  //V2

  const currentRateV2 = useMemo(() => {
    if (rewardsRatePerSecondV2) {
      const rewards = Number(rewardsRatePerSecondV2 || 0) * 86400;
      return Number(formatUnits(BigInt(rewards * 1000000), 18));
    }
    return;
  }, [rewardsRatePerSecondV2]);

  const estimateRewardsPerDayV2 = useMemo(() => {
    const total = Number(formatUnits(BigInt(Number(totalStakedV2) || 0), 6));
    return Number(total) * Number(currentRateV2);
  }, [currentDate, totalStakedV2]);

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
    const rewards = Number(formatUnits(BigInt(Number(pendingReward) || 0), 18));
    if (rewards > 0) return false;
    return true;
  }, [pendingReward]);

  const isClaimableV2 = useMemo(() => {
    const rewards = Number(
      formatUnits(BigInt(Number(pendingRewardV2) || 0), 18),
    );
    if (rewards > 0) return false;
    return true;
  }, [pendingRewardV2]);
  // const isClaimable = useMemo(() => {
  //   const currentTime = currentDate / 1000;
  //   return currentTime < Number(claimableTime);
  // }, [currentDate, claimableTime]);

  const isWithdraw = useMemo(() => {
    const currentTime = currentDate / 1000;
    return currentTime > Number(endTime);
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4 laptop:gap-6 w-full">
        <div className="flex items-center justify-center w-full min-w-full laptop:min-w-[437px] gap-2 laptop:gap-6">
          <div className="basis-6/12 laptop:basis-2/6 py-[8px] laptop:py-6 flex flex-col items-center justify-center gap-4">
            <p className="font-semibold">Total Earnings</p>
            <p className="font-semibold text-3xl laptop:text-5xl text-gradient bg-gradient-to-r from-[#9299FF_48%] to-[#4651F6_168%]">
              {formatDisplayedTokenAmount(
                Number(Number(totalClaimed || 0) + Number(totalClaimedV2 || 0)),
                18,
              )}{' '}
              $U2U
            </p>
          </div>
          <Icon.IconStart width={60} height={60} />
          <div className="basis-6/12 laptop:basis-2/6 py-[8px] laptop:py-6 flex flex-col items-center justify-center gap-4">
            <p className="font-semibold">Stake Duration</p>
            <p className="font-semibold text-3xl laptop:text-5xl text-gradient bg-gradient-to-r from-[#9299FF_48%] to-[#4651F6_168%]">
              {stakeDuration} Days
            </p>
          </div>
        </div>
        <hr className="border-[#4A4A4A] block laptop:hidden w-full" />
        <div className="w-full flex justify-center">
          <div className="max-w-full laptop:max-w-[645px] flex justify-center items-center rounded-2xl p-4 laptop:px-4 laptop:py-10 gap-6 border border-[#FF72B4] bg-[#14141480]">
            <Icon.Warning
              className="hidden laptop:block"
              width={24}
              height={24}
            />
            <div className="flex flex-col gap-4 laptop:gap-1">
              <span>
                <span className="font-bold text-[#7EFFC5]">Section 1</span>: For
                those who started staking{' '}
                <span className="font-bold text-[#7EFFC5]">
                  before December 12, 2024
                </span>
              </span>
              <span>
                <span className="font-bold text-[#7EFFC5]">Section 2</span>: For
                those who started staking on or{' '}
                <span className="font-bold text-[#7EFFC5]">
                  after December 12, 2024.
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="hidden laptop:flex items-center gap-8 w-full">
          <div className="p-5 laptop:p-8 flex flex-col w-full gap-8 rounded-2xl bg-[#14141480] backdrop-blur-[2px] border border-solid border-[#4A4A4A]">
            <div className="">
              <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                  <p className="text-base laptop:text-xl font-semibold">
                    Section
                  </p>
                  <p className="text-lg laptop:text-2xl font-bold text-[#7EFFC5]">
                    1
                  </p>
                </div>
                <hr className="border-[#4A4A4A]" />
                <div className="flex justify-between items-center">
                  <p className="text-base laptop:text-xl font-semibold">
                    Wallet Address
                  </p>
                  <p className="text-lg laptop:text-2xl font-bold text-[#7EFFC5]">
                    {shortenAddress(address)}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-base laptop:text-xl font-semibold">
                    Staked
                  </p>
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
                      Number(
                        formatUnits(BigInt(Number(pendingReward) || 0), 18),
                      ),
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
                    {toNumberNoRound(estimateRewardsPerDay, 3)} $U2U/day
                  </p>
                </div>
              </div>
              {/*{isClaimable && (*/}
              {/*  <div className="w-full flex items-center gap-2 mt-6">*/}
              {/*    <Icon.IconWarning width={24} height={24} />*/}
              {/*    <p className="text-sm laptop:text-base font-semibold text-[#FF72B4]">*/}
              {/*      Note: Rewards can be instantly claimed after TGE 7 days (*/}
              {/*      approximately in the middle of December)*/}
              {/*      /!*Rewards can be claimed at{' '}*!/*/}
              {/*      /!*{format(*!/*/}
              {/*      /!*  new Date(1000 * Number(claimableTime)),*!/*/}
              {/*      /!*  'yyyy-MM-dd HH:mm:ss',*!/*/}
              {/*      /!*)}*!/*/}
              {/*      /!*. Please check back later.*!/*/}
              {/*    </p>*/}
              {/*  </div>*/}
              {/*)}*/}
              {/*{isClaimable && (*/}
              {/*  <div className="w-full flex items-center gap-2 mt-6">*/}
              {/*    <Icon.IconWarning width={24} height={24} />*/}
              {/*    <p className="text-sm laptop:text-base font-semibold text-[#FF72B4]">*/}
              {/*      Note: Rewards can be instantly claimed after TGE 7 days (*/}
              {/*      approximately in the middle of December)*/}
              {/*    </p>*/}
              {/*  </div>*/}
              {/*)}*/}
            </div>
            <hr className="border-[#4A4A4A]" />
            <div className="flex items-center gap-6 mt-4">
              <ConnectWalletButton
                showConnectButton
                className="flex justify-center h-12 laptop:h-[64px] !rounded-xl laptop:!rounded-2xl"
              >
                <Button
                  loading={isLoading}
                  disabled={isClaimable}
                  loadingText={'Claiming...'}
                  scale="md"
                  className="h-12 laptop:h-[64px] disabled:bg-[#4A4A4A] disabled:!shadow-none disabled:text-[#92929299] p-4 w-full !rounded-xl laptop:!rounded-2xl bg-[#7EFFC5] hover:!bg-transparent text-[#141414] hover:text-[#7EFFC5]  flex items-center justify-center gap-1 border border-solid hover:!border-[#7EFFC5] !border-[#8C8C99]"
                  onClick={handleClaimV1}
                >
                  Claim
                </Button>
              </ConnectWalletButton>

              {!isWithdraw ? (
                <Button
                  // loading={isPending || isLoadingUnStake}
                  disabled={true}
                  loadingText={'Processing...'}
                  scale="md"
                  className="h-12 laptop:h-[64px] disabled:bg-[#4A4A4A] disabled:!shadow-none disabled:text-[#92929299] disabled:!border-[#8C8C99] p-4 w-full !rounded-xl laptop:!rounded-2xl bg-[#4651F6] hover:!bg-transparent text-white hover:text-[#7EFFC5]  flex items-center justify-center gap-1 border border-solid hover:!border-[#7EFFC5] !border-[#4651F6]"
                  onClick={handleUnStakeV1}
                >
                  Withdraw
                </Button>
              ) : (
                <ConnectWalletButton
                  showConnectButton
                  className="flex justify-center h-12 laptop:h-[64px] !rounded-xl laptop:!rounded-2xl"
                >
                  <Button
                    loading={isLoadingUnStake}
                    disabled={false}
                    loadingText={'Processing...'}
                    scale="md"
                    className="h-12 laptop:h-[64px] disabled:bg-[#4A4A4A] disabled:!shadow-none disabled:text-[#92929299] disabled:!border-[#8C8C99] p-4 w-full !rounded-xl laptop:!rounded-2xl bg-[#4651F6] hover:!bg-transparent text-white hover:text-[#7EFFC5]  flex items-center justify-center gap-1 border border-solid hover:!border-[#7EFFC5] !border-[#4651F6]"
                    onClick={handleUnStakeV1}
                  >
                    Withdraw
                  </Button>
                </ConnectWalletButton>
              )}
            </div>
          </div>
          <div className="p-5 laptop:p-8 flex flex-col w-full gap-8 rounded-2xl bg-[#14141480] backdrop-blur-[2px] border border-solid border-[#4A4A4A]">
            <div className="">
              <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                  <p className="text-base laptop:text-xl font-semibold">
                    Section
                  </p>
                  <p className="text-lg laptop:text-2xl font-bold text-[#7EFFC5]">
                    2
                  </p>
                </div>
                <hr className="border-[#4A4A4A]" />
                <div className="flex justify-between items-center">
                  <p className="text-base laptop:text-xl font-semibold">
                    Wallet Address
                  </p>
                  <p className="text-lg laptop:text-2xl font-bold text-[#7EFFC5]">
                    {shortenAddress(address)}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-base laptop:text-xl font-semibold">
                    Staked
                  </p>
                  <p className="text-lg laptop:text-2xl font-bold text-[#7EFFC5]">
                    {formatDisplayedTokenAmount(Number(totalStakedV2 || 0), 6)}{' '}
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
                      Number(
                        formatUnits(BigInt(Number(pendingRewardV2) || 0), 18),
                      ),
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
                    {toNumberNoRound(estimateRewardsPerDayV2, 3)} $U2U/day
                  </p>
                </div>
              </div>
              {/*{isClaimable && (*/}
              {/*  <div className="w-full flex items-center gap-2 mt-6">*/}
              {/*    <Icon.IconWarning width={24} height={24} />*/}
              {/*    <p className="text-sm laptop:text-base font-semibold text-[#FF72B4]">*/}
              {/*      Note: Rewards can be instantly claimed after TGE 7 days (*/}
              {/*      approximately in the middle of December)*/}
              {/*      /!*Rewards can be claimed at{' '}*!/*/}
              {/*      /!*{format(*!/*/}
              {/*      /!*  new Date(1000 * Number(claimableTime)),*!/*/}
              {/*      /!*  'yyyy-MM-dd HH:mm:ss',*!/*/}
              {/*      /!*)}*!/*/}
              {/*      /!*. Please check back later.*!/*/}
              {/*    </p>*/}
              {/*  </div>*/}
              {/*)}*/}
              {/*{isClaimableV2 && (*/}
              {/*  <div className="w-full flex items-center gap-2 mt-6">*/}
              {/*    <Icon.IconWarning width={24} height={24} />*/}
              {/*    <p className="text-sm laptop:text-base font-semibold text-[#FF72B4]">*/}
              {/*      Note: Rewards can be instantly claimed after TGE 7 days (*/}
              {/*      approximately in the middle of December)*/}
              {/*    </p>*/}
              {/*  </div>*/}
              {/*)}*/}
            </div>
            <hr className="border-[#4A4A4A]" />
            <div className="flex items-center gap-6 mt-4">
              <ConnectWalletButton
                showConnectButton
                className="flex justify-center h-12 laptop:h-[64px] !rounded-xl laptop:!rounded-2xl"
              >
                <Button
                  loading={isLoadingV2}
                  disabled={isClaimableV2}
                  loadingText={'Claiming...'}
                  scale="md"
                  className="h-12 laptop:h-[64px] disabled:bg-[#4A4A4A] disabled:!shadow-none disabled:text-[#92929299] p-4 w-full !rounded-xl laptop:!rounded-2xl bg-[#7EFFC5] hover:!bg-transparent text-[#141414] hover:text-[#7EFFC5]  flex items-center justify-center gap-1 border border-solid hover:!border-[#7EFFC5] !border-[#8C8C99]"
                  onClick={handleClaimV2}
                >
                  Claim
                </Button>
              </ConnectWalletButton>

              {!isWithdraw ? (
                <Button
                  // loading={isPendingV2 || isLoadingUnStakeV2}
                  disabled={true}
                  loadingText={'Processing...'}
                  scale="md"
                  className="h-12 laptop:h-[64px] disabled:bg-[#4A4A4A] disabled:!shadow-none disabled:text-[#92929299] disabled:!border-[#8C8C99] p-4 w-full !rounded-xl laptop:!rounded-2xl bg-[#4651F6] hover:!bg-transparent text-white hover:text-[#7EFFC5]  flex items-center justify-center gap-1 border border-solid hover:!border-[#7EFFC5] !border-[#4651F6]"
                  onClick={handleUnStakeV2}
                >
                  Withdraw
                </Button>
              ) : (
                <ConnectWalletButton
                  showConnectButton
                  className="flex justify-center h-12 laptop:h-[64px] !rounded-xl laptop:!rounded-2xl"
                >
                  <Button
                    loading={isLoadingUnStakeV2}
                    disabled={false}
                    loadingText={'Processing...'}
                    scale="md"
                    className="h-12 laptop:h-[64px] disabled:bg-[#4A4A4A] disabled:!shadow-none disabled:text-[#92929299] disabled:!border-[#8C8C99] p-4 w-full !rounded-xl laptop:!rounded-2xl bg-[#4651F6] hover:!bg-transparent text-white hover:text-[#7EFFC5]  flex items-center justify-center gap-1 border border-solid hover:!border-[#7EFFC5] !border-[#4651F6]"
                    onClick={handleUnStakeV2}
                  >
                    Withdraw
                  </Button>
                </ConnectWalletButton>
              )}
            </div>
          </div>
        </div>

        <div
          className={classNames(
            'col-span-full tablet:col-span-5 laptop:col-span-7 flex flex-col',
            'bg-gray-custom rounded-2xl overflow-hidden',
            'pb-[2rem] tablet:py-0',
          )}
        >
          {/* Slides */}
          <div className="block laptop:hidden relative w-auto h-full">
            <Swiper
              modules={[Pagination, Navigation]}
              slidesPerView={1}
              slidesPerGroup={1}
              // -- Module
              navigation={{
                prevEl: '.swiper-for-buy-phone-btn-prev',
                nextEl: '.swiper-for-buy-phone-btn-next',
                disabledClass: 'btn-disabled',
                enabled: true,
              }}
              pagination={{
                horizontalClass: 'swiper-for-buy-phone-horizontal',
                bulletClass: 'swiper-for-buy-phone-pagination',
                bulletActiveClass: 'swiper-for-buy-phone-pagination-active',
                clickable: true,
              }}
              grabCursor
              wrapperClass="flex flex-row w-fit h-full item-center"
              className="h-full"
              // onActiveIndexChange={(swiper) => {
              //   setActiveSlide(dataList[swiper.activeIndex] || null);
              // }}
            >
              {/* Slide Prev */}
              <div className="absolute inset-y-0 left-[1rem] flex flex-row items-center">
                <div className="swiper-for-buy-phone-btn-prev group">
                  <div
                    className={classNames(
                      'flex flex-row items-center justify-center cursor-pointer z-30',
                      'rounded-full bg-gray4-custom size-[3.25rem]',
                      'group-[.btn-disabled]:cursor-not-allowed group-[.btn-disabled]:opacity-50',
                    )}
                  >
                    <Icon.ArrowRightIcon className="size-7 text-gray2-custom" />
                  </div>
                </div>
              </div>

              {/* Slide Next */}
              <div className="absolute inset-y-0 right-[1rem] flex flex-row items-center">
                <div className="swiper-for-buy-phone-btn-next group">
                  <div
                    className={classNames(
                      'flex flex-row items-center justify-center cursor-pointer z-30',
                      'rounded-full bg-gray4-custom size-[3.25rem]',
                      'group-[.btn-disabled]:cursor-not-allowed group-[.btn-disabled]:opacity-50',
                    )}
                  >
                    <Icon.ArrowRightIcon className="rotate-180 size-7 text-gray2-custom" />
                  </div>
                </div>
              </div>

              <SwiperSlide className="relative w-full flex flex-col justify-center items-center">
                <div className="flex justify-center w-full items-center gap-8">
                  <div className="p-5 laptop:p-8 flex flex-col w-full gap-8 rounded-2xl bg-[#14141480] backdrop-blur-[2px] border border-solid border-[#4A4A4A]">
                    <div className="">
                      <div className="flex flex-col gap-5">
                        <div className="flex justify-between items-center">
                          <p className="text-base laptop:text-xl font-semibold">
                            Section
                          </p>
                          <p className="text-lg laptop:text-2xl font-bold text-[#7EFFC5]">
                            1
                          </p>
                        </div>
                        <hr className="border-[#4A4A4A]" />
                        <div className="flex justify-between items-center">
                          <p className="text-base laptop:text-xl font-semibold">
                            Wallet Address
                          </p>
                          <p className="text-lg laptop:text-2xl font-bold text-[#7EFFC5]">
                            {shortenAddress(address)}
                          </p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-base laptop:text-xl font-semibold">
                            Staked
                          </p>
                          <p className="text-lg laptop:text-2xl font-bold text-[#7EFFC5]">
                            {formatDisplayedTokenAmount(
                              Number(totalStaked || 0),
                              6,
                            )}{' '}
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
                              Number(
                                formatUnits(
                                  BigInt(Number(pendingReward) || 0),
                                  18,
                                ),
                              ),
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
                            {toNumberNoRound(estimateRewardsPerDay, 3)} $U2U/day
                          </p>
                        </div>
                      </div>
                      {/*{isClaimable && (*/}
                      {/*  <div className="w-full flex items-center gap-2 mt-6">*/}
                      {/*    <Icon.IconWarning width={24} height={24} />*/}
                      {/*    <p className="text-sm laptop:text-base font-semibold text-[#FF72B4]">*/}
                      {/*      Note: Rewards can be instantly claimed after TGE 7 days (*/}
                      {/*      approximately in the middle of December)*/}
                      {/*      /!*Rewards can be claimed at{' '}*!/*/}
                      {/*      /!*{format(*!/*/}
                      {/*      /!*  new Date(1000 * Number(claimableTime)),*!/*/}
                      {/*      /!*  'yyyy-MM-dd HH:mm:ss',*!/*/}
                      {/*      /!*)}*!/*/}
                      {/*      /!*. Please check back later.*!/*/}
                      {/*    </p>*/}
                      {/*  </div>*/}
                      {/*)}*/}
                      {/*{isClaimable && (*/}
                      {/*  <div className="w-full flex items-center gap-2 mt-6">*/}
                      {/*    <Icon.IconWarning width={24} height={24} />*/}
                      {/*    <p className="text-sm laptop:text-base font-semibold text-[#FF72B4]">*/}
                      {/*      Note: Rewards can be instantly claimed after TGE 7*/}
                      {/*      days ( approximately in the middle of December)*/}
                      {/*    </p>*/}
                      {/*  </div>*/}
                      {/*)}*/}
                    </div>
                    <hr className="border-[#4A4A4A]" />
                    <div className="flex items-center gap-6 mt-4">
                      <ConnectWalletButton
                        showConnectButton
                        className="flex justify-center h-12 laptop:h-[64px] !rounded-xl laptop:!rounded-2xl"
                      >
                        <Button
                          loading={isLoading}
                          disabled={isClaimable}
                          loadingText={'Claiming...'}
                          scale="md"
                          className="h-12 laptop:h-[64px] disabled:bg-[#4A4A4A] disabled:!shadow-none disabled:text-[#92929299] p-4 w-full !rounded-xl laptop:!rounded-2xl bg-[#7EFFC5] hover:!bg-transparent text-[#141414] hover:text-[#7EFFC5]  flex items-center justify-center gap-1 border border-solid hover:!border-[#7EFFC5] !border-[#8C8C99]"
                          onClick={handleClaimV1}
                        >
                          Claim
                        </Button>
                      </ConnectWalletButton>

                      {!isWithdraw ? (
                        <Button
                          // loading={isPending || isLoadingUnStake}
                          disabled={true}
                          loadingText={'Processing...'}
                          scale="md"
                          className="h-12 laptop:h-[64px] disabled:bg-[#4A4A4A] disabled:!shadow-none disabled:text-[#92929299] disabled:!border-[#8C8C99] p-4 w-full !rounded-xl laptop:!rounded-2xl bg-[#4651F6] hover:!bg-transparent text-white hover:text-[#7EFFC5]  flex items-center justify-center gap-1 border border-solid hover:!border-[#7EFFC5] !border-[#4651F6]"
                          onClick={handleUnStakeV1}
                        >
                          Withdraw
                        </Button>
                      ) : (
                        <ConnectWalletButton
                          showConnectButton
                          className="flex justify-center h-12 laptop:h-[64px] !rounded-xl laptop:!rounded-2xl"
                        >
                          <Button
                            loading={isLoadingUnStake}
                            disabled={false}
                            loadingText={'Processing...'}
                            scale="md"
                            className="h-12 laptop:h-[64px] disabled:bg-[#4A4A4A] disabled:!shadow-none disabled:text-[#92929299] disabled:!border-[#8C8C99] p-4 w-full !rounded-xl laptop:!rounded-2xl bg-[#4651F6] hover:!bg-transparent text-white hover:text-[#7EFFC5]  flex items-center justify-center gap-1 border border-solid hover:!border-[#7EFFC5] !border-[#4651F6]"
                            onClick={handleUnStakeV1}
                          >
                            Withdraw
                          </Button>
                        </ConnectWalletButton>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="relative w-full flex flex-col justify-center items-center">
                <div className="flex justify-center w-full items-center gap-8">
                  <div className="p-5 laptop:p-8 flex flex-col w-full gap-8 rounded-2xl bg-[#14141480] backdrop-blur-[2px] border border-solid border-[#4A4A4A]">
                    <div className="">
                      <div className="flex flex-col gap-5">
                        <div className="flex justify-between items-center">
                          <p className="text-base laptop:text-xl font-semibold">
                            Section
                          </p>
                          <p className="text-lg laptop:text-2xl font-bold text-[#7EFFC5]">
                            2
                          </p>
                        </div>
                        <hr className="border-[#4A4A4A]" />
                        <div className="flex justify-between items-center">
                          <p className="text-base laptop:text-xl font-semibold">
                            Wallet Address
                          </p>
                          <p className="text-lg laptop:text-2xl font-bold text-[#7EFFC5]">
                            {shortenAddress(address)}
                          </p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-base laptop:text-xl font-semibold">
                            Staked
                          </p>
                          <p className="text-lg laptop:text-2xl font-bold text-[#7EFFC5]">
                            {formatDisplayedTokenAmount(
                              Number(totalStakedV2 || 0),
                              6,
                            )}{' '}
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
                              Number(
                                formatUnits(
                                  BigInt(Number(pendingRewardV2) || 0),
                                  18,
                                ),
                              ),
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
                            {toNumberNoRound(estimateRewardsPerDayV2, 3)}{' '}
                            $U2U/day
                          </p>
                        </div>
                      </div>
                      {/*{isClaimable && (*/}
                      {/*  <div className="w-full flex items-center gap-2 mt-6">*/}
                      {/*    <Icon.IconWarning width={24} height={24} />*/}
                      {/*    <p className="text-sm laptop:text-base font-semibold text-[#FF72B4]">*/}
                      {/*      Note: Rewards can be instantly claimed after TGE 7 days (*/}
                      {/*      approximately in the middle of December)*/}
                      {/*      /!*Rewards can be claimed at{' '}*!/*/}
                      {/*      /!*{format(*!/*/}
                      {/*      /!*  new Date(1000 * Number(claimableTime)),*!/*/}
                      {/*      /!*  'yyyy-MM-dd HH:mm:ss',*!/*/}
                      {/*      /!*)}*!/*/}
                      {/*      /!*. Please check back later.*!/*/}
                      {/*    </p>*/}
                      {/*  </div>*/}
                      {/*)}*/}
                      {/*{isClaimableV2 && (*/}
                      {/*  <div className="w-full flex items-center gap-2 mt-6">*/}
                      {/*    <Icon.IconWarning width={24} height={24} />*/}
                      {/*    <p className="text-sm laptop:text-base font-semibold text-[#FF72B4]">*/}
                      {/*      Note: Rewards can be instantly claimed after TGE 7*/}
                      {/*      days ( approximately in the middle of December)*/}
                      {/*    </p>*/}
                      {/*  </div>*/}
                      {/*)}*/}
                    </div>
                    <hr className="border-[#4A4A4A]" />
                    <div className="flex items-center gap-6 mt-4">
                      <ConnectWalletButton
                        showConnectButton
                        className="flex justify-center h-12 laptop:h-[64px] !rounded-xl laptop:!rounded-2xl"
                      >
                        <Button
                          loading={isLoadingV2}
                          disabled={isClaimableV2}
                          loadingText={'Claiming...'}
                          scale="md"
                          className="h-12 laptop:h-[64px] disabled:bg-[#4A4A4A] disabled:!shadow-none disabled:text-[#92929299] p-4 w-full !rounded-xl laptop:!rounded-2xl bg-[#7EFFC5] hover:!bg-transparent text-[#141414] hover:text-[#7EFFC5]  flex items-center justify-center gap-1 border border-solid hover:!border-[#7EFFC5] !border-[#8C8C99]"
                          onClick={handleClaimV2}
                        >
                          Claim
                        </Button>
                      </ConnectWalletButton>

                      {!isWithdraw ? (
                        <Button
                          // loading={isPendingV2 || isLoadingUnStakeV2}
                          disabled={true}
                          loadingText={'Processing...'}
                          scale="md"
                          className="h-12 laptop:h-[64px] disabled:bg-[#4A4A4A] disabled:!shadow-none disabled:text-[#92929299] disabled:!border-[#8C8C99] p-4 w-full !rounded-xl laptop:!rounded-2xl bg-[#4651F6] hover:!bg-transparent text-white hover:text-[#7EFFC5]  flex items-center justify-center gap-1 border border-solid hover:!border-[#7EFFC5] !border-[#4651F6]"
                          onClick={handleUnStakeV2}
                        >
                          Withdraw
                        </Button>
                      ) : (
                        <ConnectWalletButton
                          showConnectButton
                          className="flex justify-center h-12 laptop:h-[64px] !rounded-xl laptop:!rounded-2xl"
                        >
                          <Button
                            loading={isLoadingUnStakeV2}
                            disabled={false}
                            loadingText={'Processing...'}
                            scale="md"
                            className="h-12 laptop:h-[64px] disabled:bg-[#4A4A4A] disabled:!shadow-none disabled:text-[#92929299] disabled:!border-[#8C8C99] p-4 w-full !rounded-xl laptop:!rounded-2xl bg-[#4651F6] hover:!bg-transparent text-white hover:text-[#7EFFC5]  flex items-center justify-center gap-1 border border-solid hover:!border-[#7EFFC5] !border-[#4651F6]"
                            onClick={handleUnStakeV2}
                          >
                            Withdraw
                          </Button>
                        </ConnectWalletButton>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}
