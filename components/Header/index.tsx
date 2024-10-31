'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react'; // Import useRouter từ Next.js
import { FormProvider, useForm } from 'react-hook-form';
import { useAccount } from 'wagmi';

import ConnectWalletButton from '@/components/ConnectWalletButton/ConnectWalletButton';
import LanguageDropdown from '@/components/Dropdown/LanguageDropdown';
import SidebarMenu from '@/components/Header/SidebarMenu';
import Icon from '@/components/Icon';
import ArrowRightIcon from '@/components/Icon/ArrowRight';
import { useAuth } from '@/hooks/useAuth';
import useWalletStore from '@/store/connect-wallet';
import { FormState } from '@/types/form';
import { shortenAddress } from '@/utils/string';

import HeaderSearchIcon from '../Icon/HeaderSearch';

import CheckNode from './CheckNode';

// import LocaleSwitcher from '@/components/LocaleSwitcher/LocaleSwithcer';

const LandingHeader = () => {
  const method = useForm<FormState.Header>({
    defaultValues: {
      isOpenSideBar: false,
      isOpenConnectWallet: false,
    },
  });
  const t = useTranslations();
  const navs = [
    { label: t('header.node_sale'), href: '/' },
    { label: t('header.my_node'), href: '/mynode' },
  ];
  const { isValidSession, onLogout } = useAuth();
  const [activeNavIndex, setActiveNavIndex] = useState(0);
  const [isOpenCheckNode, setIsOpenCheckNode] = useState(false);
  const router = useRouter();
  const { setOpen } = useWalletStore();

  const toggleNav = (index: any) => {
    if (activeNavIndex !== index) {
      if (index === 1) {
        if (!isValidSession) {
          return setOpen(true);
        }
      }
      setActiveNavIndex(index);
      router.push(navs[index].href);
    }
  };
  const [showDisconnect, setShowDisconnect] = useState(false);

  const { address } = useAccount();

  const handleLogout = async () => {
    try {
      await onLogout();
      setShowDisconnect(false);
    } catch (e) {
      console.error('Error logout wallet:', e);
    }
  };

  return (
    <FormProvider {...method}>
      <nav className="p-4 bg-[#141414] tablet:px-[100px] tablet:py-4 w-full">
        <div className="flex w-full tablet:flex-row tablet:gap-2 desktop:gap-0 tablet:items-center justify-between">
          <div className="flex gap-6">
            {/* Logo */}
            <Link
              href="/"
              className="min-w-[150px] flex items-center tablet:mb-0"
            >
              <Icon.Logo className="tablet:w-10 tablet:h-10 w-[32px] h-[32px]" />
            </Link>
          </div>
          <button
            className="z-50 laptop:hidden block"
            onClick={() => method.setValue('isOpenSideBar', true)}
          >
            <Icon.Menu width={24} height={24} />
          </button>
          {/* Action Buttons */}
          <div className="gap-2 mt-4 tablet:mt-0 hidden laptop:flex">
            <ConnectWalletButton
              className="px-3 !py-0 tablet:px-4 bg-[#141414] flex items-center gap-1 rounded-[24px] tablet:rounded-[32px] text-[#7EFFC5]"
              showConnectButton
            >
              <div>
                <button
                  onClick={() => setShowDisconnect(!showDisconnect)}
                  className="px-3 py-2 tablet:px-4 tablet:py-2 bg-[#141414] flex items-center gap-1 border border-solid border-[#8C8C99] rounded-[24px] tablet:rounded-[32px] text-[#7EFFC5]"
                >
                  <p className="text-xs tablet:text-sm text-[#7EFFC5] font-semibold text-center">
                    {shortenAddress(address)}
                  </p>
                  <ArrowRightIcon
                    stroke="#7EFFC5"
                    className="w-4 h-4 tablet:w-5 tablet:h-5"
                  />
                </button>
                {showDisconnect && (
                  <button
                    onClick={handleLogout}
                    className="mt-2 w-[150px] px-3 py-2 tablet:px-4 tablet:py-2 bg-[#282828] text-[14px] text-gray-400 rounded-[24px] tablet:rounded-[32px] absolute z-20"
                  >
                    {t('common.disconnect')}
                  </button>
                )}
              </div>
            </ConnectWalletButton>
            <LanguageDropdown />
          </div>
        </div>
      </nav>

      {/* Modal */}
      {/*<ConnectWallet />*/}

      <SidebarMenu
        isOpen={method.watch('isOpenSideBar')}
        onClose={() => method.setValue('isOpenSideBar', false)}
      />
    </FormProvider>
  );
};

export default LandingHeader;
