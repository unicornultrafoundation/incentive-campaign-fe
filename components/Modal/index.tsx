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
      <div
        className={classNames(
          'modal-content border border-[#7EFFC5]',
          className,
        )}
        style={{
          boxShadow: '8px 8px 0px 0px #7EFFC5',
        }}
      >
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
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
          {description && (
            <p className="font-semibold mt-[0px]">{description}</p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
