import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/Button';
import { FormState } from '@/types/form';
import { classNames } from '@/utils/string';
import { useAuth } from '@/hooks/useAuth';

export default function WalletProceed() {
  // const toast = useToast();
  const { isValidSession } = useAuth();

  const method = useForm<FormState.ConnectWallet>({
    defaultValues: {
      isOpenConnectWallet: false,
      isShowSignMessage: false,
    },
  });

  return (
    <FormProvider {...method}>
      <div
        className={classNames(
          'network-switcher ',
          isValidSession ? 'hidden' : 'block',
        )}
      >
        <div className="overlay" aria-hidden />

        <div
          className={classNames(
            'modal-content',
            'flex justify-center items-center flex-col border-[2px] border-[#7EFFC5] min-w-[300px] tablet:min-w-[468px]',
            'w-[330px]',
          )}
        >
          <div className="absolute w-5 h-5 bg-[#7EFFC5] top-[-5%] left-[-10px] rotate-45 "></div>
          <div className="absolute w-5 h-5 bg-[#7EFFC5] top-[-5%] right-[-10px] rotate-45 "></div>
          <div className="absolute w-5 h-5 bg-[#7EFFC5] bottom-[-5%] left-[-10px] rotate-45 "></div>
          <div className="absolute w-5 h-5 bg-[#7EFFC5] bottom-[-5%] right-[-10px] rotate-45 "></div>
          <div className="flex flex-col gap-4 justify-center items-center  ">
            <p className="text-[20px] tablet:text-[24px] text-[#7EFFC5] font-roboto text-center">
              Connect Wallet to Proceed
            </p>
            <div className="separator" />
            <p className="w-auto tablet:w-[408px] text-center">
              To view your dashboard and manage your transactions, please
              connect your wallet.
            </p>

            <div className="flex gap-4 w-full">
              {/*<Link href='/' className={`w-full px-4 py-2 text-[14px] font-roboto `}>*/}
              {/*  Take Me Zone*/}
              {/*</Link>*/}
              <Button
                className={`w-full px-4 py-2 text-[14px] font-roboto `}
                onClick={() => method.setValue('isOpenConnectWallet', true)}
              >
                Connect Wallet
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/*<ConnectWallet isOpen={false} />*/}
    </FormProvider>
  );
}
