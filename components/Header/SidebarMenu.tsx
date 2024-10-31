import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { useState } from 'react';

import LanguageDropdownMobile from '@/components/Dropdown/LanguageDropdownMobile';
import Icon from '@/components/Icon';
import { WHITELIST_LINK } from '@/config/constants';
import { useAuth } from '@/hooks/useAuth';
import useWalletStore from '@/store/connect-wallet';
import Button from '@/components/Button';

import HeaderSearchIcon from '../Icon/HeaderSearch';

import CheckNode from './CheckNode';

interface SlideMenuProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const SlideMenu = ({ isOpen, onClose }: SlideMenuProps) => {
  const router = useRouter();
  const t = useTranslations();
  const { isValidSession } = useAuth();
  const { setOpen } = useWalletStore();
  const [isOpenCheckNode, setIsOpenCheckNode] = useState(false);

  const handleNavigation = (path: string) => {
    if (!isValidSession) {
      setOpen(true);
      if (onClose) onClose();
      return;
    }
    router.push(path);
    if (onClose) onClose();
  };

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
        {isOpen ? <Icon.Close width={29} height={29} /> : ''}
      </button>

      {/* Tab Menu */}
      <div
        className={`fullscreen-menu flex flex-col justify-between h-full ${isOpen ? 'open' : ''}`}
      >
        <ul className="">
          <li>
            <button
              className="w-full px-4 py-2 flex justify-between items-center gap-4  border border-solid border-[#4A4A4A] rounded-[100px]"
              onClick={() => {
                if (onClose) {
                  onClose();
                  setIsOpenCheckNode(true);
                }
              }}
            >
              <p className="font-inter text-xs text-[#4A4A4A]">
                Check nodes by wallet
              </p>
              <HeaderSearchIcon width={32} height={32} />
            </button>
          </li>
          <li>
            <button
              className="uppercase text-2xl"
              onClick={() => handleNavigation('/')}
            >
              {t('header.node_sale')}
            </button>
          </li>
          <li>
            <button
              className="uppercase text-2xl"
              onClick={() => handleNavigation('/mynode')}
            >
              {t('header.my_node')}
            </button>
          </li>
          <li>
            <LanguageDropdownMobile />
          </li>
        </ul>
        <div className="w-full">
          <Link
            href={WHITELIST_LINK}
            className="p-4 hover:bg-gray-500 bg-[#141414] flex items-center justify-center gap-1 border border-solid border-[#8C8C99] rounded-lg text-[#000]"
          >
            <span className="text-xl text-[#7EFFC5] font-semibold">
              {t('header.become_promoter')}
            </span>
          </Link>
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
      <CheckNode
        isOpen={isOpenCheckNode}
        onClose={() => setIsOpenCheckNode(false)}
      />
    </div>
  );
};

export default SlideMenu;
