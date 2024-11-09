import React, { useEffect } from 'react';

import Modal from '@/components/Modal';
import Icon from '@/components/Icon';
import { useUIStore } from '@/store/ui';
import Button from '@/components/Button';

export default function ToastModal() {
  const {
    toast: { visible, type, title, message, action, actionName },
    clearToast,
  } = useUIStore();

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        clearToast();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [visible, clearToast]);

  return (
    <Modal
      className="toast w-[350px] tablet:w-[499px]"
      isOpen={visible}
      onClose={clearToast}
      title={
        title
          ? title
          : type === 'error'
            ? 'Error'
            : type === 'success'
              ? 'Successfully'
              : ''
      }
    >
      <div className="content mt-6">
        <hr className="w-full border-[#1F1F1F] border-solid" />
        <p className="title">{message}</p>
        <div className="relative w-full">
          {type === 'error' ? (
            <Icon.ToastFail className="mx-auto" />
          ) : (
            <Icon.ToastSuccess className="mx-auto" />
          )}
        </div>
        <p className="text-xs text-[#929292]">
          This will auto-close in 5 seconds. Thank you!
        </p>

        {!!action && (
          <Button className="w-full rounded-lg p-3" onClick={action}>
            {actionName}
          </Button>
        )}
      </div>
    </Modal>
  );
}
