import { FC } from 'react';

import Modal from '@/components/Modal';
import Button from '@/components/Button';

interface UpdatePercentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClaim: () => void;
  isClaiming: boolean;
}

const ClaimNFTModal: FC<UpdatePercentSuccessModalProps> = (
  props: UpdatePercentSuccessModalProps,
) => {
  const { isOpen, onClose, onClaim, isClaiming } = props;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="relative max-w-[390px] tablet:max-w-[450px] p-6 w-full flex flex-col gap-5"
    >
      <div className="absolute w-5 h-5 bg-[#7EFFC5] top-[-3%] left-[-10px] rotate-45"></div>
      <div className="absolute w-5 h-5 bg-[#7EFFC5] top-[-3%] right-[-10px] rotate-45"></div>
      <div className="absolute w-5 h-5 bg-[#7EFFC5] bottom-[-3%] left-[-10px] rotate-45"></div>
      <div className="absolute w-5 h-5 bg-[#7EFFC5] bottom-[-3%] right-[-10px] rotate-45"></div>
      <div className="flex flex-col items-center gap-4">
        <h2 className="font-roboto text-2xl font-semibold text-[#7EFFC5]">
          Confirm License Claim !
        </h2>
        <p className="font-inter text-center font-semibold text-[18px]">
          Are you sure you want to claim this license?
        </p>
        {/*<RegisterIcon />*/}
        <div className="flex gap-2 items-center w-full">
          <Button
            className="mt-3 bg-[#7EFFC5] text-black w-full px-4 py-2"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            loading={isClaiming}
            className="mt-3 bg-[#7EFFC5] text-black w-full px-4 py-2"
            onClick={onClaim}
          >
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ClaimNFTModal;
