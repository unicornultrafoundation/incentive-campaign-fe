import React, { InputHTMLAttributes, useMemo } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { classNames } from '@/utils/string';

export interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  containerClass?: string;
  scale?: 'md' | 'lg' | 'sm';
  prependIcon?: React.ReactNode;
  prependIconContainerClass?: string;
  appendIcon?: React.ReactNode;
  appendIconContainerClass?: string;
  error?: boolean;
  success?: boolean;
  // errorMessage?: string;
  register?: UseFormRegisterReturn;
}

export default function Input({
  prependIcon,
  prependIconContainerClass,
  appendIcon,
  appendIconContainerClass,
  containerClass,
  scale,
  success,
  error,
  // errorMessage,
  className,
  register,
  ...rest
}: BaseInputProps) {
  const baseClass =
    ' outline-none bg-black placeholder:text-tertiary w-full transition-all';

  const scaleClass = useMemo(() => {
    switch (scale) {
      case 'lg':
        return classNames(
          'text-body-16 rounded-2xl h-14 p-4',
          !!prependIcon && 'ps-10',
          !!appendIcon && 'pe-10',
        );
      case 'sm':
        return classNames(
          'text-body-14 rounded-xl h-10 px-4 py-2',
          !!prependIcon && 'ps-9',
          !!appendIcon && 'pe-9',
        );
      case 'md':
      default:
        return classNames(
          'text-body-16 rounded-xl h-12 p-3',
          !!prependIcon && 'ps-10',
          !!appendIcon && 'pe-10',
        );
    }
  }, [scale, prependIcon, appendIcon]);

  const colorClass = useMemo(() => {
    switch (true) {
      case success:
        return 'text-success ring-success';
      case error:
        return 'text-error border-error border-[0.5px]';
      default:
        return 'text-primary focus-visible:ring-primary border-none';
    }
  }, [success, error]);

  return (
    <div
      className={classNames(
        'flex items-center relative w-auto',
        containerClass,
      )}
    >
      {!!prependIcon && (
        <div
          className={classNames(
            'absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none',
            prependIconContainerClass,
          )}
        >
          {prependIcon}
        </div>
      )}
      <input
        className={classNames(baseClass, scaleClass, colorClass, className)}
        {...register}
        {...rest}
      />
      {!!appendIcon && (
        <div
          className={classNames(
            'absolute inset-y-0 end-0 flex items-center pe-3.5 pointer-events-none',
            appendIconContainerClass,
          )}
        >
          {appendIcon}
        </div>
      )}
    </div>
  );
}
