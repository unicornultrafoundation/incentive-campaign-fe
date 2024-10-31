import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAccount } from 'wagmi';

import { useAuth } from '@/hooks/useAuth';
import { shortenAddress } from '@/utils/string';

import ArrowRightIcon from '../Icon/ArrowRight';

import ConnectWalletButton from './ConnectWalletButton';

export default function ConnectWallet() {
  const { address } = useAccount();
  const t = useTranslations();
  const { onLogout } = useAuth();
  const [showDisconnect, setShowDisconnect] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await onLogout();
      setShowDisconnect(false);
      router.push('/');
    } catch (e) {
      console.error('Error logout wallet:', e);
    }
  };
  return (
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
            className="mt-2 w-[150px] px-3 py-2 tablet:px-4 tablet:py-2 bg-[#282828] text-[14px] text-gray-400 rounded-[24px] tablet:rounded-[32px] absolute z-10"
          >
            {t('common.disconnect')}
          </button>
        )}
      </div>
    </ConnectWalletButton>
  );
}
