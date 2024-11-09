import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import { useAccount, useSignMessage } from 'wagmi';

import Button from '@/components/Button';
import Modal from '@/components/Modal/index';
import { useAuth } from '@/hooks/useAuth';
// import { useGetProfileApi } from '@/hooks/useMutationApi';
// import useUserStore from '@/store/auth';

import Icon from '@/components/Icon';

import LoadingModal from './loading-modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignConnectMessageModal({ isOpen, onClose }: Props) {
  const { address, chainId, isConnected } = useAccount();
  const { isError, error } = useSignMessage();
  const { onSignMessage } = useAuth();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState('');
  // const { setProfile } = useUserStore();
  const t = useTranslations();

  const [isCheckingChain, setIsCheckingChain] = useState<boolean>(false);

  // const { trigger: getProfile } = useGetProfileApi();

  const handleSignMessage = useCallback(async () => {
    setAuthError('');

    if (!address) return;
    // const date = new Date().toISOString();

    try {
      setIsAuthenticating(true);
      await onSignMessage();

      // const data = await getProfile();
      // if (data) {
      //   setProfile(data.data);
      // }

      setIsCheckingChain(true);
      // setValue('isShowChooseChain', true);
    } catch (e: any) {
      setAuthError(e.message);
      setIsAuthenticating(false);
      console.error('Error signing connect message:', e);
    } finally {
      // setIsAuthenticating(false);
      // onClose();
    }
  }, [address]);

  const renderContent = () => {
    switch (true) {
      case isAuthenticating:
        return (
          <LoadingModal
            className=""
            title={
              <>
                <div className="font-inter text-primary text-center text-heading-sm">
                  {t('modal_connect_wallet.authenticating')}
                </div>
                <div className="font-inter text-secondary text-center">
                  {t('modal_connect_wallet.description_2')}
                </div>
              </>
            }
            isLoading={isAuthenticating}
            onClose={onClose}
          />
        );
      case isError || !!authError:
        return (
          <>
            <div className="font-semibold text-error text-center text-2xl text-heading-sm">
              {t('common.error_report')}
            </div>
            <a
              data-tooltip-id="error-report-msg"
              data-tooltip-content={error?.message || authError}
            >
              <div className="max-w-full text-secondary text-center text-ellipsis">
                {error?.message || authError}
              </div>
            </a>
            <Icon.ToastFail className="mx-auto" />

            <div className="w-full flex justify-between gap-6">
              <Button
                className="w-full h-12 p-4 !rounded-lg"
                onClick={handleSignMessage}
              >
                {t('common.try_again')}
              </Button>
              <Button
                className="h-12 disabled:bg-[#4A4A4A] disabled:!shadow-none disabled:text-[#92929299] disabled:!border-[#8C8C99] p-4 w-full !rounded-lg bg-[#7EFFC5] hover:!bg-transparent text-black hover:text-[#7EFFC5]  flex items-center justify-center gap-1 border border-solid hover:!border-[#7EFFC5] !border-[#7EFFC5]"
                onClick={onClose}
              >
                Close & continue
              </Button>
            </div>
          </>
        );
      default:
        return (
          <>
            <div className="font-inter text-primary text-center text-heading-sm">
              Please sign the message to connect your wallet
            </div>
            <div className="w-full flex justify-between gap-6">
              <Button
                className="w-full h-12 p-4 !rounded-lg"
                onClick={handleSignMessage}
              >
                Sign Message
              </Button>
              <Button
                className="h-12 disabled:bg-[#4A4A4A] disabled:!shadow-none disabled:text-[#92929299] disabled:!border-[#8C8C99] p-4 w-full !rounded-lg bg-[#7EFFC5] hover:!bg-transparent text-black hover:text-[#7EFFC5]  flex items-center justify-center gap-1 border border-solid hover:!border-[#7EFFC5] !border-[#7EFFC5]"
                onClick={onClose}
              >
                Close & continue
              </Button>
            </div>
          </>
        );
    }
  };

  useEffect(() => {
    if (isOpen) {
      handleSignMessage();
    } else {
      setAuthError('');
      setIsCheckingChain(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isCheckingChain && chainId && isConnected) {
        onClose();
      }
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [isCheckingChain, chainId, isConnected]);

  return (
    <Modal
      className="w-full max-w-[370px]  tablet:max-w-[468px]"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="mx-auto flex flex-col gap-8 p-4 items-center overflow-ellipsis">
        {renderContent()}
      </div>
    </Modal>
  );
}
