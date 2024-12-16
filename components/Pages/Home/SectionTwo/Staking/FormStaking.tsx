import { useEffect, useMemo, useState } from 'react';
import { formatUnits } from 'viem';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Icon from '@/components/Icon';
import ConnectWalletButton from '@/components/ConnectWalletButton/ConnectWalletButton';
import Button from '@/components/Button';
import { usePUSDT } from '@/hooks/usePUsdt';
import { formatDisplayedTokenAmount, toNumberNoRound } from '@/utils';
import ApproveModal from '@/components/Modal/ApproveModal';
import { FormState } from '@/types/form';
import FormMessageValidate from '@/components/Form/FormMessageValidate';
import {
  useSignatureBitgetApi,
  useSignaturePublicApi,
} from '@/hooks/useMutationApi';
import { toast } from '@/store/ui';
import { CAMPAIGN_TYPE } from '@/config/env';
import { useStakeV2 } from '@/hooks/useStakeV2';
import { useStake } from '@/hooks/useStake';

interface Option {
  value: number;
  label: string;
  type: string;
}

export default function FormStaking() {
  const { allowancePUSDT, balanceOfUsdt } = usePUSDT();
  const { rewardsRatePerSecond, endTime } = useStakeV2(); //endTime
  const onStaking = useStakeV2();
  const { onStake, isPending, isSuccess, isError, totalStaked } = onStaking;

  const onStakingV1 = useStake();
  const { totalStaked: totalStakedV1 } = onStakingV1;

  const [isOpenApprove, setIsOpenApprove] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<number>(Date.now());
  const [selectedType, setSelectedType] = useState<number>(10);
  const [maxAmount] = useState<number>(10000);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { trigger: signaturePublic } = useSignaturePublicApi();
  const { trigger: signatureBitget } = useSignatureBitgetApi();

  const schema = yup.object({
    maxAmount: yup.number(),
    amount: yup
      .number()
      .transform((value) => (Number.isNaN(value) ? undefined : value))
      .required('Amount is required')
      .min(10, 'Amount must be at least 10')
      .test('balance-check', `Balance not enough`, function (value) {
        return value <= Number(balanceOfUsdt || 0) / 1000000;
      })
      .test(
        'max-amount-check',
        `Total amount exceeds the maximum allowed ${toNumberNoRound(maxAmount, 2)} $pUSDT`,
        function (value) {
          return (
            value +
              Number(formatUnits(BigInt((totalStaked as any) || 0), 6)) +
              Number(formatUnits(BigInt((totalStakedV1 as any) || 0), 6)) <=
            maxAmount
          );
        },
      ),
  });

  const mainForm = useForm<FormState.Staking>({
    resolver: yupResolver(schema) as any,
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: { amount: 10 },
  });
  const { handleSubmit, watch, setValue, control, reset } = mainForm;
  const { amount } = watch();

  const isApprove = useMemo<boolean>(() => {
    if (balanceOfUsdt) {
      return (
        Number(formatUnits(BigInt((allowancePUSDT as any) || 0), 6)) >=
        Number(balanceOfUsdt) / 1000000
      );
    }
    return true;
  }, [allowancePUSDT, balanceOfUsdt]);
  const options: Option[] = [
    {
      value: 10,
      type: 'number',
      label: 'Min: 10$',
    },
    {
      value: 40,
      type: 'percent',
      label: '40%',
    },
    {
      value: 60,
      type: 'percent',
      label: '60%',
    },
    {
      value: 80,
      type: 'percent',
      label: '80%',
    },
    {
      value: 10000,
      type: 'number',
      label: 'Max',
    },
  ];

  const handleOpenApprove = async () => {
    setIsOpenApprove(true);
  };
  const handleStake = async () => {
    try {
      setIsLoading(true);
      const res =
        CAMPAIGN_TYPE.toLowerCase() === 'public'
          ? await signaturePublic()
          : await signatureBitget();
      const signature = res.data.data.sig;
      const expiresAt = res.data.data.expiresAt;
      if (signature && expiresAt) {
        await onStake({
          amount: Number(amount),
          expiresAt: expiresAt,
          signature: signature,
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  const handleSelectType = (option: Option) => () => {
    setSelectedType(option.value);
    if (option.type === 'number') {
      const balance = Number(balanceOfUsdt || 0) / 1000000;
      const total =
        Number(formatUnits(BigInt((totalStaked as any) || 0), 6)) +
          Number(formatUnits(BigInt((totalStakedV1 as any) || 0), 6)) >=
        10000
          ? 10000
          : Number(formatUnits(BigInt((totalStaked as any) || 0), 6)) +
            Number(formatUnits(BigInt((totalStakedV1 as any) || 0), 6));

      const actuallAmount = 10000 - total;
      if (option.value === 10000) {
        if (balance < option.value) {
          if (balance < actuallAmount) {
            return setValue('amount', balance);
          }
          // if (balance < 10000 - total)
          return setValue('amount', actuallAmount);
        } else {
          return setValue('amount', actuallAmount);
        }
      }
      return setValue('amount', option.value);
    } else {
      const balance = Number(balanceOfUsdt || 0) / 1000000;
      const total =
        Number(formatUnits(BigInt((totalStaked as any) || 0), 6)) +
          Number(formatUnits(BigInt((totalStakedV1 as any) || 0), 6)) >=
        10000
          ? 10000
          : Number(formatUnits(BigInt((totalStaked as any) || 0), 6)) +
            Number(formatUnits(BigInt((totalStakedV1 as any) || 0), 6));

      const actuallAmount = 10000 - total;
      if (balance < actuallAmount) {
        const value = (option.value * Number(balance)) / 100;
        return setValue('amount', value);
      }
      const value = (option.value * Number(actuallAmount)) / 100;
      return setValue('amount', value);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentRate = useMemo(() => {
    if (rewardsRatePerSecond) {
      const rate = rewardsRatePerSecond
        ? Number(rewardsRatePerSecond) * Number(amount)
        : 0;
      const rewards = Number(rate) * 86400;
      return Number(formatUnits(BigInt(rewards * 1000000), 18));
    }
  }, [rewardsRatePerSecond, amount]);

  const currentRatePerDay = useMemo(() => {
    if (rewardsRatePerSecond) {
      const rate = rewardsRatePerSecond ? Number(rewardsRatePerSecond) : 0;
      const rewards = Number(rate) * 86400;
      return Number(formatUnits(BigInt(rewards * 1000000), 18));
    }
  }, [rewardsRatePerSecond, amount]);

  useEffect(() => {
    if (isSuccess) {
      toast.success({ message: 'Staking successfully' });
      reset();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error({ message: 'Staking fail' });
      reset();
    }
  }, [isError]);

  const estimateRewards = useMemo(() => {
    const currentTime = currentDate / 1000;
    const timeDifferenceInSeconds = Number(endTime) - currentTime;
    const daysRemaining = timeDifferenceInSeconds / 86400;
    return (
      Number(amount) *
      Number(currentRatePerDay) *
      Number(Math.floor(daysRemaining))
    );
  }, [currentRatePerDay, endTime, amount]);

  const stakeable = useMemo(() => {
    const total =
      Number(formatUnits(BigInt(Number(totalStaked) || 0), 6)) +
      Number(formatUnits(BigInt(Number(totalStakedV1) || 0), 6));
    if (total >= 10000) return 0;
    return 10000 - total;
  }, [totalStaked, totalStakedV1]);

  return (
    <FormProvider {...mainForm}>
      <div className="p-5 laptop:p-8 flex flex-col w-full gap-8 rounded-2xl bg-[#14141480] backdrop-blur-[2px] border border-solid border-[#4A4A4A]">
        <div>
          <div className="p-5 rounded-2xl bg-[#1F1F1F]">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <p className="text-sm laptop:text-lg font-semibold">
                  Stakeable:
                </p>
                <p className="text-sm laptop:text-lg font-bold text-[#7EFFC5]">
                  {toNumberNoRound(stakeable, 3)} $pUSDT
                </p>
              </div>
              <div className="hidden laptop:flex gap-2 items-center">
                <p className="text-[#4A4A4A] text-sm laptop:text-lg">
                  pUSDT Available:
                </p>
                <p className="text-[#AFAFAF] text-sm laptop:text-lg font-semibold">
                  {formatDisplayedTokenAmount(Number(balanceOfUsdt) || 0, 6)}{' '}
                  $pUSDT
                </p>
              </div>
            </div>
            <div className="mb-2">
              <Controller
                control={control}
                name="amount"
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    name=""
                    id=""
                    placeholder="Ex. 10000"
                    className="outline-none w-full flex gap-4 justify-between px-4 py-2 border min-w-full !border-solid rounded-lg border-[#4A4A4A] mt-4 laptop:mt-8 bg-transparent"
                    onChange={(e) => {
                      field.onChange(e);
                      setSelectedType(0);
                    }}
                    onKeyPress={(e) => {
                      if (!/^\d*\.?\d*$/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                )}
              />
            </div>
            <FormMessageValidate mainForm={mainForm} fieldName="amount" />
            <div className="flex laptop:hidden gap-2 items-center mt-3">
              <p className="text-[#4A4A4A] text-base laptop:text-xl">
                pUSDT Available:
              </p>
              <p className="text-[#AFAFAF] text-base laptop:text-xl font-semibold">
                {formatDisplayedTokenAmount(Number(balanceOfUsdt) || 0, 6)}{' '}
                $pUSDT
              </p>
            </div>
            <div className="scrollbar-hide overflow-x-scroll mt-3 laptop:mt-5 flex items-center gap-2 laptop:gap-4 w-full">
              {options.map((option) => (
                <div
                  onClick={handleSelectType(option)}
                  key={option.value}
                  className={`${selectedType === option.value && '!bg-gradient-to-r'} cursor-pointer w-full min-w-[98px] rounded-lg flex justify-center items-center bg-[#4A4A4A] h-[35px] py-2 hover:bg-gradient-to-r from-[#9299FF] to-[#4651F6]`}
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
                Estimate rewards
              </p>
              <p className="text-lg laptop:text-2xl font-bold text-[#7EFFC5]">
                {toNumberNoRound(estimateRewards, 3)} $U2U
              </p>
            </div>
            <div className="flex justify-between items-start">
              <div className="flex flex-1 flex-col gap-1 items-start">
                <p className="text-base laptop:text-xl font-semibold">
                  Current rate
                </p>
              </div>
              <p className="text-lg laptop:text-2xl font-bold text-[#7EFFC5]">
                {toNumberNoRound(currentRate, 3)} U2U/day
              </p>
            </div>
          </div>
          <div className="w-full flex items-center gap-2 mt-6">
            <Icon.IconWarning width={24} height={24} />
            <p className="text-sm laptop:text-base font-semibold text-[#FF72B4]">
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
              loading={isPending || isLoading}
              disabled={isPending || isLoading}
              loadingText={'Staking...'}
              scale="md"
              className="disabled:bg-[#4A4A4A] disabled:!shadow-none disabled:text-[#92929299] disabled:!border-[#8C8C99] p-4 mt-4 w-full !rounded-xl laptop:!rounded-[20px] bg-[#4651F6] text-white hover:!bg-transparent hover:text-[#7EFFC5]  flex items-center justify-center gap-1 border border-solid hover:!border-[#7EFFC5] !border-[#4651F6]"
              onClick={() => {
                handleSubmit(handleStake)();
              }}
            >
              Stake now
            </Button>
          ) : (
            <Button
              scale="md"
              className="disabled:bg-[#4A4A4A] disabled:!shadow-none disabled:text-[#92929299] disabled:!border-[#8C8C99] p-4 mt-4 w-full !rounded-xl laptop:!rounded-[20px] bg-[#4651F6] text-white hover:!bg-transparent hover:text-[#7EFFC5]  flex items-center justify-center gap-1 border border-solid hover:!border-[#7EFFC5] !border-[#4651F6]"
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
    </FormProvider>
  );
}
