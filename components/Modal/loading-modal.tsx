'use client';

import Button from '@/components/Button';
import Icon from '@/components/Icon';
import Modal from '@/components/Modal';
import { useState } from 'react';

export default function LoadingModal({
  title,
  isLoading,
  onClose,
  className = '',
}: {
  title: string | React.ReactNode;
  isLoading: boolean;
  onClose: () => void;
  className?: string;
}) {
  return (
    <Modal
      isOpen={isLoading}
      onClose={onClose}
      className={`${className} relative border border-[#7EFFC5] w-full max-w-[348px] tablet:max-w-[490px] p-6 flex flex-col gap-5`}
    >
      <div className="w-full text-center text-balance font-bold">{title}</div>
      <div className="w-full flex justify-center items-center gap-2">
        {Array(3)
          .fill('')
          .map((_, index) => (
            <Icon.StarWhite
              style={{
                animationDelay: `${index * 0.5}s`,
              }}
              className="w-10 animate-pulse"
              key={index}
            />
          ))}
      </div>
    </Modal>
  );
}
