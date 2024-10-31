'use client';

import Button from '@/components/Button';
import Icon from '@/components/Icon';
import useIsMobile from '@/hooks/useIsMobile';
import { useTranslations } from 'next-intl';
import Marquee from 'react-fast-marquee';

type Step = {
  title: React.ReactNode;
  description: React.ReactNode;
  isCompleted: boolean;
};

const initialSteps: Step[] = [
  {
    title: 'Bridge & Start - Move $USDT with Owlto',
    description: 'Begin by bridging your $USDT to the U2U Chain with Owlto.',
    isCompleted: true,
  },
  {
    title: (
      <>
        Claim Your Free Gas Fees at &nbsp;
        <span className="text-[#9299FF] underline cursor-pointer">Here</span>
      </>
    ),
    description: 'Receive free gas fees to kickstart your journey.',
    isCompleted: true,
  },
  {
    title: 'Stake & Earn Big - Boost Your U2U Rewards',
    description: 'Stake your $USDT to earn U2U tokens instantly!',
    isCompleted: true,
  },
];

const TitleWithDes = () => {
  const t = useTranslations();
  return (
    <div className="flex flex-col gap-6 max-[1000px]:gap-1 w-[100%]">
      <h1 className=" text-white font-jockey text-2xl tablet:text-3xl desktop:text-[64px] max-[1000px]:text-[30px] font-normal mb-4">
        U2U Incentivized Mainnet Saga
      </h1>
      <p
        style={{
          background: 'linear-gradient(to right,#9299FF, #4651F6)',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
        className=" font-jockey text-base font-normal tablet:text-lg desktop:text-[32px] max-[1000px]:text-[24px]"
      >
        Stake, Earn $U2U Instantly, and Watch Your Rewards Grow!
      </p>
    </div>
  );
};

const Crystal = () => {
  const t = useTranslations();
  return (
    <div className="flex items-center justify-center w-[100%] flex-1 !pointer-events-none">
      <Icon.Crystal />
    </div>
  );
};

const Steps = ({ steps }: { steps: Step[] }) => {
  const t = useTranslations();
  return (
    <div className="flex w-[100%] flex-col gap-0">
      {steps.map((step, stepIndex) => (
        <div key={stepIndex} className="w-full flex flex-row items-center">
          <div className="w-[50px] h-[120px] max-[728px]:h-[180px] flex flex-col items-center justify-center">
            <div
              style={{
                background: step.isCompleted ? '#5FCC8A' : '#4451BB',
                opacity: step.isCompleted ? 1 : 0.25,
                borderRadius: stepIndex === 0 ? '8px 8px 0px 0px' : 0,
              }}
              className="w-[6px] h-[35px]"
            ></div>
            <div
              style={{
                background: '#5FCC8A',
                color: '#4651F6',
              }}
              className="w-[50px] h-[50px] bg-[black] flex items-center justify-center rounded-full font-jockey font-medium text-[20px]"
            >
              {stepIndex + 1}
            </div>
            <div
              style={{
                background: step.isCompleted ? '#5FCC8A' : '#4451BB',
                opacity:
                  stepIndex !== steps.length - 1
                    ? step.isCompleted
                      ? 1
                      : 0.25
                    : 0,
              }}
              className="w-[6px] flex-1"
            ></div>
          </div>
          <div className="flex-1 flex justify-center flex-col px-5 gap-1">
            <div className="font-jockey font-normal text-white text-[24px]">
              {step.title}
            </div>
            <div className="font-normal text-[#AFAFAF] text-[20px]">
              {step.description}
            </div>
          </div>
        </div>
      ))}
      <div className="w-full mt-5">
        <Button
          style={{
            fontFamily: 'Inter Bolder',
          }}
          onClick={() => {
            const section2Ele = document.getElementById('section_2');
            if (!section2Ele) return;
            window.scrollTo({ top: section2Ele.offsetTop, behavior: 'smooth' });
          }}
          className="px-16 h-[56px] bg-[#7EFFC5] text-black rounded-lg text-[20px] cursor-pointer max-[1000px]:w-[100%]"
        >
          Stake pUSDT
        </Button>
      </div>
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

export default function SectionOne({
  steps = initialSteps,
}: {
  steps: Step[];
}) {
  const t = useTranslations();
  const isMobile = useIsMobile(1000);

  const renderMobile = () => {
    return (
      <div className="w-full z-10 flex flex-col py-10 px-5">
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
        className="w-full z-10 flex flex-row pt-32 max-w-screen-desktop"
      >
        <div className="w-[55%] flex flex-col">
          <TitleWithDes />
          <div className="w-full mt-16">
            <Steps steps={steps} />
          </div>
        </div>
        <div className="w-[45%]">
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
      <div className="w-full h-[80px] flex items-center bg-[#7EFFC5]">
        <SectionMarquee />
      </div>
    </div>
  );
}
