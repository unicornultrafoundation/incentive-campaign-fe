import { useTranslations } from 'next-intl';
import { useAccount } from 'wagmi';
import { useState } from 'react';

import LanguageDropdownMobile from '@/components/Dropdown/LanguageDropdownMobile';
import Icon from '@/components/Icon';
import { useAuth } from '@/hooks/useAuth';
import useWalletStore from '@/store/connect-wallet';
import Button from '@/components/Button';

import AirdropModal from '../Modal/airdrop-modal';

interface SlideMenuProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const SlideMenu = ({ isOpen, onClose }: SlideMenuProps) => {
  // const router = useRouter();
  const t = useTranslations();
  const { isValidSession } = useAuth();
  const { setOpen } = useWalletStore();
  const [isOpenAirdropModal, setOpenAidropModal] = useState(false);

  // const handleNavigation = (path: string) => {
  //   if (!isValidSession) {
  //     setOpen(true);
  //     if (onClose) onClose();
  //     return;
  //   }
  //   router.push(path);
  //   if (onClose) onClose();
  // };

  const { onLogout } = useAuth();

  const { isConnected } = useAccount();

  const handleLogout = () => {
    onLogout();
    if (onClose) onClose();
  };

  const handleConnect = () => {
    if (!isValidSession) {
      setOpen(true);
      if (onClose) onClose();
      return;
    }
    if (onClose) onClose();
  };

  return (
    <div>
      {/*{isOpen && <>*/}
      <button className="menu-icon" onClick={onClose}>
        {isOpen ? (
          <div className="w-full flex items-center justify-between pl-5">
            <Icon.Logo
              width={'70%'}
              className="tablet:w-10 tablet:h-10 w-[32px] h-[32px]"
            />
            <Icon.Close width={29} height={29} />
          </div>
        ) : (
          ''
        )}
      </button>

      {/* Tab Menu */}
      <div
        className={`fullscreen-menu flex flex-col justify-between h-full ${isOpen ? 'open' : ''}`}
      >
        <ul className="">
          <li>
            <LanguageDropdownMobile />
          </li>
        </ul>
        <div className="w-full">
          <Button
            onClick={() => {
              if (!isValidSession) {
                setOpen(true);
                return;
              }
              setOpenAidropModal(true);
            }}
            className="w-full p-4 hover:bg-gray-500 bg-[#141414] flex items-center justify-center gap-1 border border-solid border-[#8C8C99] rounded-lg text-[#000]"
          >
            <span className="text-xl text-[#7EFFC5] font-semibold">
              Claim your Gas fee
            </span>
          </Button>
          {isConnected ? (
            <Button
              scale="md"
              className="p-4 mt-4 w-full bg-[#141414] flex items-center justify-center gap-1 border border-solid border-[#8C8C99] rounded-lg text-[#000]"
              onClick={() => handleLogout()}
            >
              <p className="text-xl text-white font-semibold">
                {t('common.disconnect')}
              </p>
            </Button>
          ) : (
            <Button
              scale="md"
              className="p-4 mt-4 w-full bg-[#141414] flex items-center justify-center gap-1 border border-solid border-[#8C8C99] rounded-lg text-[#7EFFC5]"
              onClick={handleConnect}
            >
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
      <AirdropModal
        isOpen={isOpenAirdropModal}
        onClose={() => setOpenAidropModal(false)}
      />
    </div>
  );
};

export default SlideMenu;
