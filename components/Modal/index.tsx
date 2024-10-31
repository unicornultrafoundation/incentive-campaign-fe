import React from 'react';

import { classNames } from '@/utils/string';
import CloseIcon from '@/components/Icon/Close';

export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
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
  title,
  description,
  onClose,
}: ModalProps) {
  return (
    <div className={classNames('base-modal', isOpen ? 'block' : 'hidden')}>
      <div className="overlay" aria-hidden onClick={onClose} />
      <div className={classNames('modal-content', className)}>
        <div className="flex justify-between mb-4">
          <h2 className="font-inter text-lg tablet:text-2xl text-[#7EFFC5] font-semibold">
            {title ?? ''}
          </h2>
          <CloseIcon
            className="cursor-pointer"
            width={24}
            height={24}
            onClick={onClose}
          />
        </div>
        {description && <p className="font-semibold mt-[8px]">{description}</p>}
        {children}
      </div>
    </div>
  );
}
