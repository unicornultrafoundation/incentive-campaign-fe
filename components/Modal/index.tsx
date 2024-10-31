import React from 'react';

import { classNames } from '@/utils/string';

export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ModalProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BaseModalProps {
  children: React.ReactNode;
}

export default function Modal({
  children,
  className,
  isOpen,
  onClose,
}: ModalProps) {
  return (
    <div className={classNames('base-modal', isOpen ? 'block' : 'hidden')}>
      <div className="overlay" aria-hidden onClick={onClose} />
      <div className={classNames('modal-content', className)}>{children}</div>
    </div>
  );
}
