import { useTranslations } from 'next-intl';
import React from 'react';

import { useAuth } from '@/hooks/useAuth';
import useWalletStore from '@/store/connect-wallet';
import Button from '@/components/Button';

interface Props {
  className?: string;
  children?: React.ReactNode;
  action?: (accessToken?: string) => void;
  showConnectButton?: boolean;
}

export default function ConnectWalletButton({
  action,
  className,
  showConnectButton,
  children,
}: Props) {
  const t = useTranslations();
  const { isValidSession } = useAuth();
  const { setOpen } = useWalletStore((state) => state);

  const handleConnectWallet = () => {
    if (typeof localStorage !== 'undefined') {
      if (!isValidSession) {
        localStorage.removeItem('auth-storage');
        setOpen(true);
      } else {
        // Access Token has been saved in auth store
        action?.();
      }
    }
  };

  return (
    <>
      <div className="w-full" onClick={handleConnectWallet}>
        {showConnectButton && !isValidSession ? (
          // <button
          //   onClick={handleConnectWallet}
          //   className={`${className} py-4 w-full h-full rounded-xl laptop:rounded-[20px] bg-[#7EFFC5] text-[#141414] hover:!bg-transparent hover:text-[#7EFFC5] border border-solid border-[#8C8C99] font-roboto flex justify-center items-center text-center `}
          // >
          //   <p className="w-full text-xs tablet:text-sm text-[#7EFFC5] font-semibold text-center text-nowrap">
          //     {t('common.connect_wallet')}
          //   </p>
          //   {/*<ArrowRightIcon*/}
          //   {/*  stroke="#7EFFC5"*/}
          //   {/*  className="w-4 h-4 tablet:w-5 tablet:h-5"*/}
          //   {/*/>*/}
          // </button>

          <Button
            scale="md"
            className={`${className} p-4 w-full bg-[#7EFFC5] text-[#141414] hover:!bg-transparent hover:text-[#7EFFC5]  flex items-center justify-center gap-1 border border-solid border-[#8C8C99]`}
            onClick={handleConnectWallet}
          >
            {t('common.connect_wallet')}
          </Button>
        ) : (
          children
        )}
      </div>
    </>
  );
}
