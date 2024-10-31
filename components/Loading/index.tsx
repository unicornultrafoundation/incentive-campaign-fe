import React from 'react';

import { classNames } from '@/utils/string';

export default function Loading({
  text,
  isLoading,
}: {
  text?: React.ReactNode;
  isLoading: boolean;
}) {
  let count = 3;

  return (
    <div className={classNames('app-loading', isLoading ? 'block' : 'hidden')}>
      <div className="background">
        <div className="text">
          {text || 'Loading'}
          <br />
          {Array.from(Array(count)).fill('.').join('')}
        </div>
      </div>
    </div>
  );
}
