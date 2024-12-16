'use client';

// import { useTranslations } from 'next-intl';
import React, { useMemo, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { Tooltip } from 'react-tooltip';

import Button from '@/components/Button';
import Icon from '@/components/Icon';
import useIsMobile from '@/hooks/useIsMobile';
import { useAuth } from '@/hooks/useAuth';
import useUserStore from '@/store/auth';
import { ClaimStatus } from '@/types/entities';
import useWalletStore from '@/store/connect-wallet';
import { CAMPAIGN_TYPE } from '@/config/env';

import AirdropModal from '../../../Modal/airdrop-modal';
import 'react-tooltip/dist/react-tooltip.css';

type Step = {
  title: React.ReactNode;
  type: 'Bridge' | 'Claim' | 'Stake';
  description: React.ReactNode;
  isCompleted: boolean;
  actionButton?: React.ReactNode;
};

const TitleWithDes = () => {
  // const t = useTranslations();
  return (
    <div className="flex flex-col gap-6 max-[1000px]:gap-1 w-[100%]">
      <h1 className=" text-white font-jockey text-2xl leading-[64px] text-[64px] max-[1000px]:text-[30px] font-normal mb-4">
        {CAMPAIGN_TYPE.toLowerCase() === 'public'
          ? `U2U Incentivized Mainnet Saga`
          : `Unlock Rewards  with Bitget Wallet Staking!`}
      </h1>
      <p
        style={{
          background: 'linear-gradient(to right,#9299FF, #4651F6)',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
        className=" font-jockey font-normal text-[32px] leading-[35px] max-[1000px]:text-[24px]"
      >
        {CAMPAIGN_TYPE.toLowerCase() === 'public'
          ? `Stake, Earn $U2U Instantly, and Watch Your Rewards Grow!`
          : `Stake $pUSDT & Claim $U2U Instantly`}
      </p>
    </div>
  );
};

const Crystal = () => {
  // const t = useTranslations();
  return (
    <div className="flex items-center justify-center w-[100%] flex-1 !pointer-events-none">
      <Icon.Crystal />
    </div>
  );
};

const Steps = ({ steps }: { steps: Step[] }) => {
  // const t = useTranslations();
  return (
    <div className="flex w-[100%] flex-col gap-0">
      {steps.map((step, stepIndex) => (
        <div key={stepIndex} className="w-full flex flex-row items-center">
          <div className="w-[50px] h-[172px] max-[728px]:h-[270px] flex flex-col items-center justify-center">
            <div
              style={{
                background: step.isCompleted
                  ? stepIndex === 0
                    ? '#7EFFC5'
                    : stepIndex > 0 && steps[stepIndex - 1].isCompleted
                      ? 'linear-gradient(#164f1e, #0a260e)'
                      : '#7EFFC5'
                  : stepIndex > 0 && steps[stepIndex - 1].isCompleted
                    ? 'linear-gradient(#3ac84d, #164f1e)'
                    : '#4451BB',
                opacity: step.isCompleted ? 1 : 0.25,
                borderRadius: stepIndex === 0 ? '8px 8px 0px 0px' : 0,
              }}
              className="w-[6px] flex-1"
            />
            <div
              style={{
                background: step.isCompleted
                  ? '#7EFFC5'
                  : 'linear-gradient(180deg, #4A4C54 0%, #202020 100%)',
                color: step.isCompleted ? '#4651F6' : 'white',
                border: step.isCompleted ? 'none' : '1px solid #242424',
                boxShadow: step.isCompleted
                  ? 'none'
                  : '0px 2px 2px 0px rgba(255, 255, 255, 0.25) inset',
              }}
              className="w-[50px] h-[50px] bg-[black] flex items-center justify-center rounded-full font-jockey font-medium text-[20px]"
            >
              {stepIndex + 1}
            </div>
            <div
              style={{
                background: step.isCompleted
                  ? 'linear-gradient(#6cdaa9, #164f1e)'
                  : '#4451BB',
                opacity:
                  stepIndex !== steps.length - 1
                    ? step.isCompleted
                      ? 1
                      : 0.25
                    : 0,
              }}
              className="w-[6px] flex-1"
            />
          </div>
          <div className="flex-1 flex justify-center flex-col px-5 gap-1">
            {step.isCompleted ? (
              <div className="font-jockey font-normal text-[#7EFFC5] text-[24px]">
                <a
                  data-tooltip-id={`step_${stepIndex}`}
                  className="cursor-pointer"
                  data-tooltip-content={`${step.type} completed. Ready for the next step!`}
                >
                  {step.isCompleted && `✅`}&nbsp;&nbsp;&nbsp;
                  {step.type} Completed
                </a>
                <Tooltip
                  id={`step_${stepIndex}`}
                  style={{
                    backgroundColor: '#4651F6',
                    color: 'white',
                    fontFamily: 'Inter Bold',
                    fontSize: '14px',
                  }}
                />
              </div>
            ) : (
              <div className="font-jockey font-normal text-white text-[24px]">
                {step.title}
              </div>
            )}
            <div className="font-normal text-[#AFAFAF] text-[20px]">
              {step.description}
            </div>
            <div className="font-normal text-[#AFAFAF] text-[20px]">
              {step.actionButton && step.actionButton}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const SectionMarquee = () => {
  return (
    <Marquee style={{ height: '100%' }}>
      <div
        style={{
          background: 'linear-gradient(90deg, #67C99D 0%, #28513F 100%)',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
        className="flex flex-row gap-10 items-center tracking-[4px] font-jockey text-[36px]"
      >
        <div className="h-full flex items-center">
          Deposit locked until campaign ended.
        </div>
        <div className="w-[45px] aspect-square">
          <Icon.Star />
        </div>
        <div className="h-full flex items-center">
          Join before campaign ends
        </div>
        <div className="w-[45px] aspect-square">
          <Icon.Star />
        </div>
        <div className="h-full flex items-center">
          Deposit locked until campaign ended.
        </div>
        <div className="w-[45px] aspect-square">
          <Icon.Star />
        </div>
        <div className="h-full flex items-center">
          Join before campaign ends
        </div>
        <div className="w-[45px] aspect-square">
          <Icon.Star />
        </div>
        &nbsp;
      </div>
    </Marquee>
  );
};

export default function SectionOne() {
  const { isValidSession } = useAuth();
  const { setOpen } = useWalletStore();
  const { userClaimStatus } = useUserStore();
  // const t = useTranslations();
  const isMobile = useIsMobile(1000);
  const [isOpenAirdropModal, setOpenAidropModal] = useState(false);
  const steps: Step[] = [
    {
      title: <>Bridge & Start - Move $USDT with Owlto</>,
      description: 'Begin by bridging your $USDT to the U2U Chain with Owlto.',
      type: 'Bridge',
      isCompleted:
        isValidSession && userClaimStatus?.isEligibility ? true : false,
      actionButton: (
        <Button
          style={{
            fontFamily: 'Inter Bolder',
            pointerEvents:
              isValidSession && userClaimStatus?.isEligibility
                ? 'none'
                : 'auto',
            filter:
              isValidSession && userClaimStatus?.isEligibility
                ? 'grayscale(100%) brightness(60%)'
                : 'none',
          }}
          onClick={() => {
            if (!isValidSession) {
              setOpen(true);
              return;
            }
            setOpenAidropModal(!isOpenAirdropModal);
          }}
          className="px-10 py-3 bg-[#4651F6] border-none text-white rounded-lg text-[16px] cursor-pointer max-[1000px]:w-[100%] mt-2 mb-10 hover:bg-[#4651F6] hover:text-[white]"
        >
          Bridge to U2U
        </Button>
      ),
    },
    {
      title: <>Claim Your Free Gas Fees</>,
      type: 'Claim',
      description: 'Receive free gas fees to kickstart your journey.',
      isCompleted:
        isValidSession &&
        userClaimStatus?.isEligibility &&
        userClaimStatus?.claimStatus === ClaimStatus.SUCCESS
          ? true
          : false,
      actionButton:
        isValidSession && userClaimStatus?.isEligibility === false ? (
          <Button
            style={{
              pointerEvents: 'none',
              filter: 'grayscale(100%) brightness(60%)',
            }}
            onClick={() => {
              if (!isValidSession) {
                setOpen(true);
                return;
              }
              setOpenAidropModal(!isOpenAirdropModal);
            }}
            className="px-10 py-3 bg-[#4651F6] border-none text-white rounded-lg text-[16px] cursor-pointer max-[1000px]:w-[100%] mt-2 mb-10 hover:bg-[#4651F6] hover:text-[white]"
          >
            Claim Free Gas
          </Button>
        ) : (
          <Button
            style={{
              pointerEvents:
                isValidSession &&
                userClaimStatus?.claimStatus === ClaimStatus.SUCCESS
                  ? 'none'
                  : 'auto',
              filter:
                isValidSession &&
                userClaimStatus?.claimStatus === ClaimStatus.SUCCESS
                  ? 'grayscale(100%) brightness(60%)'
                  : 'none',
            }}
            onClick={() => {
              if (!isValidSession) {
                setOpen(true);
                return;
              }
              setOpenAidropModal(!isOpenAirdropModal);
            }}
            className="px-10 py-3 bg-[#4651F6] border-none text-white rounded-lg text-[16px] cursor-pointer max-[1000px]:w-[100%] mt-2 mb-10 hover:bg-[#4651F6] hover:text-[white]"
          >
            Claim Free Gas
          </Button>
        ),
    },
    {
      title: 'Stake & Earn Big - Boost Your U2U Rewards',
      description: 'Stake your $USDT to earn U2U tokens instantly!',
      isCompleted: false,
      type: 'Stake',
      actionButton: (
        <Button
          style={{
            fontFamily: 'Inter Bolder',
          }}
          onClick={() => {
            const section2Ele = document.getElementById('section_2');
            if (!section2Ele) return;
            window.scrollTo({
              top: section2Ele.offsetTop,
              behavior: 'smooth',
            });
          }}
          className="px-10 py-3 bg-[#4651F6] border-none text-white rounded-lg text-[16px] cursor-pointer max-[1000px]:w-[100%] mt-2 mb-10 hover:bg-[#4651F6] hover:text-[white]"
        >
          Stake pUSDT
        </Button>
      ),
    },
  ];

  const renderMobile = () => {
    return (
      <div className="w-full z-10 flex flex-col py-10 px-10 max-w-screen-mobile">
        <div className="w-[100%] flex flex-col text-center text-balance">
          <TitleWithDes />
        </div>
        <div className="w-[100%]">
          <Crystal />
        </div>
        <div className="w-full mt-16">
          <Steps steps={steps} />
        </div>
      </div>
    );
  };

  const renderDesktop = () => {
    return (
      <div
        style={{
          minHeight: 'calc(100vh - 160px)',
        }}
        className="w-full z-10 flex flex-row pt-32 max-w-screen-desktop max-[1600px]:px-20 max-[768px]:px-0"
      >
        <div className="w-[55%] flex flex-col">
          <TitleWithDes />
          <div className="w-full mt-16">
            <Steps steps={steps} />
          </div>
        </div>
        <div className="w-[45%] px-8 flex items-center">
          <Crystal />
        </div>
      </div>
    );
  };

  return (
    <div className="w-[100%] desktop:max-w-[100%] min-h-[100vh] relative flex flex-col items-center">
      <div className="absolute left-0 top-0 w-[100%] h-[100%]">
        <div className="absolute z-0 landing-page w-full h-full px-4 tablet:px-8 desktop:px-[10%] top-5 flex flex-col items-center justify-center tablet:pb-0">
          <Icon.EllipseSectionOne className="absolute tablet:block z-0 -translate-x-[50%] max-[728px]:translate-x-0 max-[728px]:-top-[15%]" />
          <div className="relative">
            <div className="absolute flex w-full justify-center z-0 ">
              <Icon.EllipseSectionOne className="z-0 h-revert-layer" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute left-0 top-0 w-[100%] h-[100%] overflow-hidden">
        <div className="absolute z-0 w-full h-full px-4 tablet:px-8 flex flex-col items-center justify-center tablet:pb-0">
          <Icon.EllipseBackground className="absolute tablet:block z-0 translate-x-[110%] translate-y-[30%] max-[728px]:translate-x-[30%] max-[728px]:top-[20%]" />
          <div className="relative">
            <div className="absolute flex w-full justify-center z-0 ">
              <Icon.EllipseBackground className="z-0 h-revert-layer" />
            </div>
          </div>
        </div>
      </div>
      {isMobile ? renderMobile() : renderDesktop()}
      <div className="w-full h-[80px] flex items-center bg-[#7EFFC5] mt-10">
        <SectionMarquee />
      </div>
      <AirdropModal
        isOpen={isOpenAirdropModal}
        onClose={() => setOpenAidropModal(false)}
      />
    </div>
  );
}
