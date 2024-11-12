import { useState } from 'react';

import Icon from '@/components/Icon';
import { Staking } from '@/components/Pages/Home/SectionTwo/Staking/Staking';
import { Reward } from '@/components/Pages/Home/SectionTwo/Reward/Reward';
import { useAuth } from '@/hooks/useAuth';
import useWalletStore from '@/store/connect-wallet';

export default function HomeSectionTwo() {
  const [activeTab, setActiveTab] = useState<'staking' | 'reward'>('staking');
  const handleChangeTab = (tab: 'staking' | 'reward') => {
    if (tab === 'reward') {
      if (!isValidSession) {
        setOpen(true);
        setActiveTab('staking');
        return;
      }
      setActiveTab(tab);
    }
    setActiveTab(tab);
  };
  const { isValidSession } = useAuth();
  const { setOpen } = useWalletStore();
  return (
    <div
      id="section_2"
      className="relative mt-10 laptop:mt-[110px] mb-[80px] laptop:mb-[125px] w-full min-h-screen overflow-hidden"
    >
      <div className="absolute top-0 left-0 z-0">
        <Icon.HomeSection2Ellipse className="w-[500] h-full" />
      </div>
      <div className="absolute top-0 left-0 z-0">
        <Icon.HomeSection2Ellipse2 className="w-[500] h-full" />
      </div>
      <div className="absolute top-[-15%] right-0 z-0">
        <Icon.HomeSection2Bg className="w-full h-full" />
      </div>
      <div className="px-4 laptop:px-4 desktop:px-0 laptop:max-w-screen-laptop desktop:max-w-screen-desktop w-full mx-auto relative z-10">
        <div className="flex justify-center items-center">
          <div
            onClick={() => handleChangeTab('staking')}
            className={`${activeTab === 'staking' ? 'z-10' : 'z-0'} cursor-pointer relative flex justify-center items-center`}
          >
            {activeTab === 'staking' ? (
              <Icon.StakingTabActive className="relative w-[200px] laptop:w-auto" />
            ) : (
              <Icon.StakingTabNotActive className="relative w-[200px] laptop:w-auto" />
            )}

            <p
              className={`absolute font-jockey text-[32px] ${activeTab === 'staking' ? 'text-[#7EFFC5]' : 'text-[#929292]'}`}
            >
              Staking
            </p>
          </div>
          <div
            onClick={() => handleChangeTab('reward')}
            className={`${activeTab === 'reward' ? 'z-10' : 'z-0'} cursor-pointer relative flex justify-center items-center -ml-6`}
          >
            {activeTab === 'reward' ? (
              <Icon.StakingTabActive className="relative w-[200px] laptop:w-auto" />
            ) : (
              <Icon.StakingTabNotActive className="relative w-[200px] laptop:w-auto" />
            )}
            <p
              className={`absolute font-jockey text-[32px] ${activeTab === 'reward' ? 'text-[#7EFFC5]' : 'text-[#929292]'}`}
            >
              Rewards
            </p>
          </div>
        </div>
        {activeTab === 'staking' ? <Staking /> : <Reward />}
      </div>
    </div>
  );
}
