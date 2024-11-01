import { FC } from 'react';

import Modal from '@/components/Modal';
import Button from '@/components/Button';
import Icon from '@/components/Icon';

interface UpdatePercentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ClaimFreeU2UModal: FC<UpdatePercentSuccessModalProps> = (
  props: UpdatePercentSuccessModalProps,
) => {
  const { isOpen, onClose } = props;
  const handleApprove = () => {
    console.log('Approve');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Insufficient U2U for Transaction Fee"
      className="relative max-w-[390px] tablet:max-w-[499px] !p-8 w-full flex flex-col gap-8"
    >
      <hr className="border-[#1F1F1F]" />
      <Icon.NotEligible className="w-1/2 mx-auto" />
      <p className="font-semibold text-center">
        Claim free U2U gas fees first or deposit $U2U to your wallet before
        proceeding
      </p>
      <div className="flex gap-6 justify-between items-center">
        <Button
          onClick={onClose}
          className="w-full py-4 px-8 rounded-lg text-[#7EFFC5]"
        >
          Cancel
        </Button>
        <Button
          onClick={handleApprove}
          className="text-sm laptop:text-base w-full py-4 px-8 rounded-lg bg-[#7EFFC5] text-[#141414] hover:!bg-transparent hover:text-[#7EFFC5]"
        >
          Claim U2U Gas Fee
        </Button>
      </div>
    </Modal>
  );
};

export default ClaimFreeU2UModal;
