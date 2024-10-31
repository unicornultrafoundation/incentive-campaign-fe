import Icon from '@/components/Icon';
import Button from '@/components/Button';
import ApproveModal from '@/components/Modal/ApproveModal';
import { useState } from 'react';

export default function HomeSectionTwo() {
  const [isOpen, setIsOpen] = useState(true);
  const options: { value: string; label: string }[] = [
    {
      value: '10',
      label: 'Min: 10$',
    },
    {
      value: '40',
      label: '40%',
    },
    {
      value: '60',
      label: '60%',
    },
    {
      value: '80',
      label: '80%',
    },
    {
      value: '10000',
      label: 'Max: 10,000$',
    },
  ];
  return (
    <div className="relative mt-10 laptop:mt-[110px] mb-[80px] laptop:mb-[125px] w-full min-h-screen overflow-hidden">
      <div className="absolute top-0 left-0 z-0">
        <Icon.HomeSection2Ellipse className="w-full h-full" />
      </div>
      <div className="absolute top-0 left-0 z-0">
        <Icon.HomeSection2Ellipse2 className="w-full h-full" />
      </div>
      <div className="absolute top-[-15%] right-0 z-0">
        <Icon.HomeSection2Bg className="w-full h-full" />
      </div>
      <div className="px-4 laptop:px-4 desktop:px-0 laptop:max-w-screen-laptop desktop:max-w-screen-desktop w-full mx-auto relative z-10">
        <div className="w-full flex flex-col items-center justify-center gap-2">
          <h2 className="font-jockey text-5xl">Staking</h2>
          <p className="text-[#929292] text-base laptop:text-xl font-semibold text-center">
            Connect, stake, and let the profits speak for themselves.
          </p>
        </div>
        <div className="mt-5 laptop:mt-[64px] flex flex-col-reverse gap-10 laptop:flex-row justify-between items-center">
          <div className="p-8 flex flex-col w-full laptop:w-[704px] gap-8 rounded-2xl bg-[#1f1f1feb] backdrop-blur-[2px] border border-solid border-[#4A4A4A]">
            <div>
              <div className="p-5 rounded-2xl bg-[#141414]">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <p className="text-base laptop:text-xl font-semibold">Staking Amount:</p>
                    <p className="text-xl laptop:text-2xl font-bold text-[#7EFFC5]">
                      5000$pUSDT
                    </p>
                  </div>
                  <div className="hidden laptop:flex gap-2 items-center">
                    <p className="text-[#4A4A4A] text-xl">U2U Available:</p>
                    <p className="text-[#AFAFAF] text-xl font-semibold">
                      50 000 U2U
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
                  <p className="text-[#4A4A4A] text-base laptop:text-xl">U2U Available:</p>
                  <p className="text-[#AFAFAF] text-base laptop:text-xl font-semibold">
                    50 000 U2U
                  </p>
                </div>
                <div className="overflow-scroll mt-3 laptop:mt-5 flex items-center gap-2 laptop:gap-4 w-full">
                  {options.map((option) => (
                    <div
                      key={option.value}
                      className="w-full min-w-[98px] rounded-lg flex justify-center items-center bg-[#1F1F1F] h-[35px] py-2 hover:bg-gradient-to-r from-[#9299FF] to-[#4651F6]"
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
                  <p className="text-lg laptop:text-xl font-semibold">Default Term</p>
                  <p className="text-xl laptop:text-2xl font-bold text-[#929292]">90 Days</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xl font-semibold">Estimate rewards</p>
                  <p className="text-2xl font-bold text-[#7EFFC5]">
                    10000 $U2U
                  </p>
                </div>
                <div className="flex justify-between items-start laptop:items-center">
                  <div className="flex flex-1 flex-col gap-1 laptop:flex-row items-start">
                    <p className="text-xl font-semibold">Current rate</p>
                    <p className="text-base text-[#AFAFAF]">(Interest in U2U can be withdrawn instantly)</p>
                  </div>
                  <p className="text-2xl font-bold text-[#7EFFC5]">
                    10 U2U/day
                  </p>
                </div>
              </div>
              <div className="w-full flex items-center gap-2 mt-6">
                <Icon.IconWarning width={24} height={24} />
                <p className="font-semibold text-[#7EFFC5]">
                  Deposit locked until campaign ended.
                </p>
              </div>
            </div>
            <Button
              scale="md"
              className="p-4 mt-4 w-full !rounded-xl laptop:!rounded-[20px] bg-[#7EFFC5] text-[#141414] hover:!bg-transparent hover:text-[#7EFFC5]  flex items-center justify-center gap-1 border border-solid border-[#8C8C99]"
              onClick={() => {}}
            >
              Connect Wallet
            </Button>
          </div>
          <div className="flex justify-center w-full flex-col p-0 laptop:p-5 min-w-full laptop:min-w-[437px] gap-1 laptop:gap-[48px]">
            <div className="flex justify-center w-full laptop:flex-col min-w-full laptop:min-w-[437px] gap-2 laptop:gap-[48px]">
              <div className="basis-6/12 py-[8px] laptop:py-6 flex flex-col items-center justify-center gap-4">
                <p className="font-semibold">Epoch Reward (U2U)</p>
                <p className="font-semibold text-3xl laptop:text-5xl text-gradient bg-gradient-to-r from-[#9299FF_48%] to-[#4651F6_168%]">
                  1,523,85
                </p>
              </div>
              <div className="basis-6/12 py-[8px] laptop:py-6 flex flex-col items-center justify-center gap-4">
                <p className="font-semibold">Total stake pUSDT</p>
                <p className="font-semibold text-3xl laptop:text-5xl text-gradient bg-gradient-to-r from-[#9299FF_48%] to-[#4651F6_168%]">
                  1,523,85
                </p>
              </div>
            </div>
            <div className="flex-1  py-[8px] laptop:py-6 flex flex-col items-center justify-center gap-4">
              <p className="font-semibold">Number of participants</p>
              <p className="font-semibold text-3xl laptop:text-5xl text-gradient bg-gradient-to-r from-[#9299FF_48%] to-[#4651F6_168%]">
                4,425 USER
              </p>
            </div>
          </div>
        </div>
      </div>

      {/*<ApproveModal isOpen={isOpen} onClose={() => setIsOpen(false)} />*/}
    </div>
  );
}
