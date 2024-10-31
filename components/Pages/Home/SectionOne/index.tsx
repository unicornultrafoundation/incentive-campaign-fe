'use client';

import Button from '@/components/Button';
import Icon from '@/components/Icon';
import useIsMobile from '@/hooks/useIsMobile';
import { useTranslations } from 'next-intl';
import Marquee from 'react-fast-marquee';

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

const Steps = () => {
  const t = useTranslations();
  return (
    <div className="flex w-[100%] flex-col gap-0">
      <div className="w-full flex flex-row items-center">
        <div className="w-[50px] h-[120px] flex flex-col items-center justify-center">
          <div className="w-[6px] h-[35px] bg-[#5FCC8A] rounded-t-lg"></div>
          <div
            style={{
              background: '#5FCC8A',
              color: '#4651F6',
            }}
            className="w-[50px] h-[50px] bg-[black] flex items-center justify-center rounded-full font-jockey font-medium text-[20px]"
          >
            1
          </div>
          <div className="w-[6px] flex-1 bg-[#4451BB] opacity-25"></div>
        </div>
        <div className="flex-1 flex justify-center flex-col px-5 gap-1">
          <div className="font-jockey font-normal text-white text-[24px]">
            Bridge & Start - Move $USDT with Owlto
          </div>
          <div className="font-normal text-[#AFAFAF] text-[20px]">
            Begin by bridging your $USDT to the U2U Chain with Owlto.
          </div>
        </div>
      </div>
      <div className="w-full flex flex-row items-center">
        <div className="w-[50px] h-[120px] flex flex-col items-center justify-center">
          <div className="w-[6px] flex-1 bg-[#4451BB] opacity-25"></div>
          <div
            style={{
              border: '1px solid #242424',
              background: 'linear-gradient(180deg, #4A4C54 0%, #202020 100%)',
              boxShadow: '0px 2px 2px 0px rgba(255, 255, 255, 0.25) inset',
            }}
            className="w-[50px] h-[50px] bg-[black] text-[white] flex items-center justify-center rounded-full font-jockey font-medium text-[20px]"
          >
            2
          </div>
          <div className="w-[6px] flex-1 bg-[#4451BB] opacity-25"></div>
        </div>
        <div className="flex-1 flex justify-center flex-col px-5 gap-1">
          <div className="font-jockey font-normal text-white text-[24px]">
            Claim Your Free Gas Fees at &nbsp;
            <span className="text-[#9299FF] underline cursor-pointer">
              Here
            </span>
          </div>
          <div className="font-normal text-[#AFAFAF] text-[20px]">
            Receive free gas fees to kickstart your journey.
          </div>
        </div>
      </div>
      <div className="w-full flex flex-row items-center">
        <div className="w-[50px] h-[120px] flex flex-col items-center justify-center">
          <div className="w-[6px] flex-1 bg-[#4451BB] opacity-25"></div>
          <div
            style={{
              border: '1px solid #242424',
              background: 'linear-gradient(180deg, #4A4C54 0%, #202020 100%)',
              boxShadow: '0px 2px 2px 0px rgba(255, 255, 255, 0.25) inset',
            }}
            className="w-[50px] h-[50px] bg-[black] text-[white] flex items-center justify-center rounded-full font-jockey font-medium text-[20px]"
          >
            3
          </div>
          <div className="w-[6px] flex-1 bg-transparent"></div>
        </div>
        <div className="flex-1 flex justify-center flex-col px-5 gap-1">
          <div className="font-jockey font-normal text-white text-[24px]">
            Stake & Earn Big - Boost Your U2U Rewards
          </div>
          <div className="font-normal text-[#AFAFAF] text-[20px]">
            Stake your $USDT to earn U2U tokens instantly!
          </div>
        </div>
      </div>
      <div className="w-full mt-5">
        <Button
          style={{
            fontFamily: 'Inter Bolder',
          }}
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
          }
          className="px-16 py-5 bg-[#7EFFC5] text-black rounded-lg text-[20px] cursor-pointer max-[1000px]:w-[100%]"
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

export default function SectionOne() {
  const t = useTranslations();
  const isMobile = useIsMobile(1000);

  const renderMobile = () => {
    return (
      <div className="w-full flex flex-col py-10 px-5">
        <div className="w-[100%] flex flex-col text-center text-balance">
          <TitleWithDes />
        </div>
        <div className="w-[100%]">
          <Crystal />
        </div>
        <div className="w-full mt-16">
          <Steps />
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
            <Steps />
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
      <div className="absolute z-0 landing-page w-full h-full px-4 tablet:px-8 desktop:px-[10%] flex flex-col items-center justify-center pb-10 tablet:pb-0">
        <Icon.EllipseSectionOne className="absolute hidden tablet:block  z-0 -translate-x-[30%]" />
        <div className="relative">
          <div className="absolute flex w-full justify-center z-0 ">
            <Icon.EllipseSectionOne className="z-0 h-revert-layer" />
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
