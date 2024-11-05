import { FC } from 'react';

import Modal from '@/components/Modal';
import Button from '@/components/Button';
import Icon from '@/components/Icon';

interface WalletErrorModalProps {
  isOpen: boolean;
  link: string | null;
  walletName: string | null;
  onClose: () => void;
}

const WalletErrorModal: FC<WalletErrorModalProps> = (
  props: WalletErrorModalProps,
) => {
  const { isOpen, onClose, link, walletName } = props;
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Connect ${walletName} Wallet to Stake`}
      className="relative max-w-[390px] tablet:max-w-[499px] !p-8 w-full flex flex-col gap-8"
    >
      <hr className="border-[#1F1F1F]" />
      <Icon.ErrorWallet className="w-1/2 mx-auto" />
      <p className="font-semibold text-center">
        Connect a {walletName} wallet to start staking and earning U2U rewards.
        Don’t have one? Create a {walletName} wallet now!
      </p>
      <div className="flex gap-6 justify-between items-center">
        <Button
          onClick={onClose}
          className="w-full py-4 px-8 rounded-lg text-[#7EFFC5]"
        >
          Cancel
        </Button>
        <Button
          onClick={() => window.open(link ?? '', '_blank')}
          className="text-sm laptop:text-base w-full py-4 px-8 rounded-lg bg-[#7EFFC5] text-[#141414] hover:!bg-transparent hover:text-[#7EFFC5]"
        >
          Connect Wallet
        </Button>
      </div>
    </Modal>
  );
};

export default WalletErrorModal;
