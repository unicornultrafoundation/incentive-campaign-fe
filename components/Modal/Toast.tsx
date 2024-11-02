import React from 'react';

import Modal from '@/components/Modal';
import Icon from '@/components/Icon';
import { useUIStore } from '@/store/ui';
import Button from '@/components/Button';
import { classNames } from '@/utils/string';

export default function ToastModal() {
  const {
    toast: { visible, type, title, message, action, actionName },
    clearToast,
  } = useUIStore();

  return (
    <Modal
      className="toast w-[350px] tablet:w-[499px]"
      isOpen={visible}
      onClose={clearToast}
    >
      <div className="content">
        {type === 'error' && (
          <Icon.Close className={classNames('icon', type)} />
        )}
        {type === 'success' && (
          <Icon.Check className={classNames('icon', type)} />
        )}
        <p className="title">
          {title
            ? title
            : type === 'error'
              ? 'Error report'
              : type === 'success'
                ? 'Successfully !!'
                : ''}
        </p>
        <div className="message">{message}</div>

        {!!action && (
          <Button className="w-full p-3" onClick={action}>
            {actionName}
          </Button>
        )}
      </div>
    </Modal>
  );
}
