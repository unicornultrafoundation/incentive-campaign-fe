import { FC } from 'react';

import Modal from '@/components/Modal';

interface UpdatePercentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApproveModal: FC<UpdatePercentSuccessModalProps> = (
  props: UpdatePercentSuccessModalProps,
) => {
  const { isOpen, onClose } = props;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="fsdfdsfsdfsf"
      className="relative max-w-[390px] tablet:max-w-[450px] p-6 w-full flex flex-col gap-5"
    >
      aaaaa
    </Modal>
  );
};

export default ApproveModal;
