import { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useTranslations } from 'next-intl';

import RegisterIcon from '@/components/Icon/Register';
import Modal from '@/components/Modal';

interface PurchaseSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PurchaseSuccessModal: FC<PurchaseSuccessModalProps> = (
  props: PurchaseSuccessModalProps,
) => {
  const { isOpen, onClose } = props;
  const t = useTranslations();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isOpen) {
        onClose();
      }
    }, 30000);

    return () => {
      clearTimeout(timeout);
    };
  }, [isOpen]);

  return ReactDOM.createPortal(
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="relative max-w-[300px] tablet:max-w-[450px] p-6 w-full flex flex-col gap-5"
    >
      <div className="absolute w-5 h-5 bg-[#7EFFC5] top-[-3%] left-[-10px] rotate-45" />
      <div className="absolute w-5 h-5 bg-[#7EFFC5] top-[-3%] right-[-10px] rotate-45" />
      <div className="absolute w-5 h-5 bg-[#7EFFC5] bottom-[-3%] left-[-10px] rotate-45" />
      <div className="absolute w-5 h-5 bg-[#7EFFC5] bottom-[-3%] right-[-10px] rotate-45" />
      <div className="flex flex-col items-center gap-4">
        <h2 className="font-roboto text-2xl font-semibold text-[#7EFFC5]">
          {t('modal_success.title')}
        </h2>
        <p className="font-inter text-center font-semibold text-[18px]">
          {`${t('modal_success.description')} 🎉`}
        </p>
        <RegisterIcon />
        <p className="font-inter text-xs font-light text-[#929292]">
          {t('modal_success.description_2')}
        </p>
        <button
          className="mt-3 bg-[#7EFFC5] text-black w-full px-4 py-2 rounded-xl"
          onClick={onClose}
        >
          {t('modal_purchase.continue')}
        </button>
      </div>
    </Modal>,
    document.body,
  );
};

export default PurchaseSuccessModal;
