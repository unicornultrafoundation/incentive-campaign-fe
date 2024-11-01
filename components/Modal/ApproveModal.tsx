import { FC, useEffect, useState } from 'react';

import Modal from '@/components/Modal';
import Button from '@/components/Button';
import Icon from '@/components/Icon';
import { usePUSDT } from '@/hooks/usePUsdt';
import { toast } from '@/store/ui';

interface UpdatePercentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApproveModal: FC<UpdatePercentSuccessModalProps> = (
  props: UpdatePercentSuccessModalProps,
) => {
  const { isOpen, onClose } = props;
  const [isLoading, setIsLoading] = useState(false);
  const { onApprovePUsdt, isPending, isSuccess, isError } = usePUSDT();
  const handleApprove = async () => {
    try {
      setIsLoading(true);
      await onApprovePUsdt();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success({ message: 'Approve successfully!' });
      onClose();
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isError) {
      toast.error({ message: 'Approve failed!' });
    }
  }, [isError]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Approval Required"
      className="relative max-w-[390px] tablet:max-w-[499px] !p-8 w-full flex flex-col gap-8"
    >
      <hr className="border-[#1F1F1F]" />
      <h3 className="text-lg font-semibold text-center">
        Do you want to proceed with the approval?
      </h3>
      <Icon.ApproveLogo className="mx-auto" />
      <p className="font-semibold text-[#929292] text-center">
        To continue with staking, you need to approve the use of your pUSDT.
        This is a one-time authorization and will not be required again for
        future staking unless conditions change.
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
          loading={isLoading || isPending}
          loadingText={'Approving...'}
          className="w-full py-4 px-8 rounded-lg bg-[#7EFFC5] text-[#141414] hover:!bg-transparent hover:text-[#7EFFC5]"
        >
          Approve
        </Button>
      </div>
    </Modal>
  );
};

export default ApproveModal;
