import { useAccount, useBalance } from 'wagmi';
import { useEffect, useMemo, useState } from 'react';
import { formatUnits } from 'viem';
import { format } from 'date-fns';

import Icon from '@/components/Icon';
import ConnectWalletButton from '@/components/ConnectWalletButton/ConnectWalletButton';
import Button from '@/components/Button';
import { usePUSDT } from '@/hooks/usePUsdt';
import { useAuth } from '@/hooks/useAuth';
import { toNumberNoRound } from '@/utils';
import { useStake } from '@/hooks/useStake';
import ApproveModal from '@/components/Modal/ApproveModal';

export default function FormStaking() {
  const { balanceWallet } = useAuth();
  const { allowancePUSDT, balanceOfUsdt } = usePUSDT();
  const { rewardsRatePerSecond, endTime, getUserInfo } = useStake();
  const onStaking = useStake();
  const { onStake, isPending, isSuccess, isError, totalStaked } = onStaking;
  const [isOpenApprove, setIsOpenApprove] = useState<boolean>(false);

  const [currentDate, setCurrentDate] = useState<number>(Date.now());

  const [selectedType, setSelectedType] = useState<string | null>('10');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const isApprove = useMemo<boolean>(() => {
    if (balanceWallet) {
      return (
        Number(formatUnits(BigInt((allowancePUSDT as any) || 0), 6)) >
        Number(balanceOfUsdt)
      );
    }

    return true;
  }, [allowancePUSDT, balanceOfUsdt]);
  const options: { value: string; label: string; type: string }[] = [
    {
      value: '10',
      type: 'number',
      label: 'Min: 10$',
    },
    {
      value: '40',
      type: 'percent',
      label: '40%',
    },
    {
      value: '60',
      type: 'percent',
      label: '60%',
    },
    {
      value: '80',
      type: 'percent',
      label: '80%',
    },
    {
      value: '10000',
      type: 'number',
      label: 'Max: 10,000$',
    },
  ];

  const handleOpenApprove = async () => {
    setIsOpenApprove(true);
  };
  console.log({ totalStaked });
  return (
    <>
      <div className="p-8 flex flex-col w-full gap-8 rounded-2xl bg-[#1f1f1feb] backdrop-blur-[2px] border border-solid border-[#4A4A4A]">
        <div>
          <div className="p-5 rounded-2xl bg-[#141414]">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <p className="text-sm laptop:text-xl font-semibold">
                  Staking Amount:
                </p>
                <p className="text-base laptop:text-2xl font-bold text-[#7EFFC5]">
                  {toNumberNoRound(Number(totalStaked || 0), 2)} $pUSDT
                </p>
              </div>
              <div className="hidden laptop:flex gap-2 items-center">
                <p className="text-[#4A4A4A] text-xl">U2U Available:</p>
                <p className="text-[#AFAFAF] text-xl font-semibold">
                  {toNumberNoRound(balanceWallet || 0, 2)} U2U
                </p>
              </div>
            </div>
            <div className="w-full overflow-hidden flex gap-4 justify-between px-4 py-2 border border-solid rounded-lg border-[#4A4A4A] mt-4 laptop:mt-8">
              <input
                type="text"
                name=""
                id=""
                placeholder="Ex. 10000"
                className="bg-transparent w-full outline-none"
              />
            </div>
            <div className="flex laptop:hidden gap-2 items-center mt-3">
              <p className="text-[#4A4A4A] text-base laptop:text-xl">
                U2U Available:
              </p>
              <p className="text-[#AFAFAF] text-base laptop:text-xl font-semibold">
                50 000 U2U
              </p>
            </div>
            <div className="scrollbar-hide overflow-x-scroll mt-3 laptop:mt-5 flex items-center gap-2 laptop:gap-4 w-full">
              {options.map((option) => (
                <div
                  onClick={() => setSelectedType(option.value)}
                  key={option.value}
                  className={`${selectedType === option.value && '!bg-gradient-to-r'} cursor-pointer w-full min-w-[98px] rounded-lg flex justify-center items-center bg-[#1F1F1F] h-[35px] py-2 hover:bg-gradient-to-r from-[#9299FF] to-[#4651F6]`}
                >
                  {option.label}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 block laptop:flex gap-1 items-center">
            <p className="text-[#929292]">
              *Maximum pUSDT can be deposited to this pool:
            </p>
            <p className="text-[#7EFFC5] font-semibold">1,500,000 pUSDT</p>
          </div>
        </div>
        <hr className="border-[#4A4A4A]" />
        <div className="">
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <p className="text-base laptop:text-xl font-semibold">
                Default Term
              </p>
              <p className="text-lg laptop:text-2xl font-bold text-[#929292]">
                90 Days
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-base laptop:text-xl font-semibold">
                Estimate rewards
              </p>
              <p className="text-lg laptop:text-2xl font-bold text-[#7EFFC5]">
                10000 $U2U
              </p>
            </div>
            <div className="flex justify-between items-start laptop:items-center">
              <div className="flex flex-1 flex-col gap-1 laptop:flex-row items-start laptop:items-center">
                <p className="text-base laptop:text-xl font-semibold">
                  Current rate
                </p>
                <p className="text-sm laptop:text-base text-[#AFAFAF]">
                  (Interest in U2U can be withdrawn instantly)
                </p>
              </div>
              <p className="text-lg laptop:text-2xl font-bold text-[#7EFFC5]">
                10 U2U/day
              </p>
            </div>
          </div>
          <div className="w-full flex items-center gap-2 mt-6">
            <Icon.IconWarning width={24} height={24} />
            <p className="text-sm laptop:text-base font-semibold text-[#7EFFC5]">
              Deposit locked until campaign ended.
            </p>
          </div>
        </div>
        <ConnectWalletButton
          showConnectButton
          className="flex justify-center mt-4"
        >
          {isApprove ? (
            <Button
              scale="md"
              className="p-4 mt-4 w-full !rounded-xl laptop:!rounded-[20px] bg-[#4651F6] text-white hover:!bg-transparent hover:text-[#7EFFC5]  flex items-center justify-center gap-1 border border-solid hover:!border-[#7EFFC5] !border-[#4651F6]"
              onClick={() => {}}
            >
              Stake now
            </Button>
          ) : (
            <Button
              scale="md"
              className="p-4 mt-4 w-full !rounded-xl laptop:!rounded-[20px] bg-[#4651F6] text-white hover:!bg-transparent hover:text-[#7EFFC5]  flex items-center justify-center gap-1 border border-solid hover:!border-[#7EFFC5] !border-[#4651F6]"
              onClick={handleOpenApprove}
            >
              Approve
            </Button>
          )}
        </ConnectWalletButton>
      </div>
      <ApproveModal
        isOpen={isOpenApprove}
        onClose={() => setIsOpenApprove(false)}
      />
    </>
  );
}
