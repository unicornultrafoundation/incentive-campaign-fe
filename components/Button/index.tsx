import React from 'react';

import { classNames } from '@/utils/string';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'icon' | 'trapezoid' | 'transparent' | 'back';
  loading?: boolean;
  scale?: 'sm' | 'md' | 'lg';
  loadingText?: string;
}

export default function Button({
  className,
  loading,
  loadingText,
  variant = 'default',
  children,
  scale,
  disabled,
  type,
  ...rest
}: ButtonProps) {
  return (
    <>
      <button
        type={type ?? 'button'}
        disabled={disabled}
        className={classNames(
          `base-btn`,
          variant,
          scale,
          loading && 'loading',
          className,
        )}
        {...rest}
      >
        <div className="btn-inner">
          {loading ? <>{loadingText || 'Loading...'}</> : children}
        </div>
      </button>
    </>
  );
}
