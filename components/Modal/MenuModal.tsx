import Link from 'next/link';
import React from 'react';

import { navs } from '@/config/nav';
import { classNames } from '@/utils/string';

import Button from '../Button';

export interface BaseModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose?: () => void;
}
export default function MenuModal({ className, isOpen }: BaseModalProps) {
  return (
    <div
      className={classNames(
        isOpen
          ? 'flex animate-slide-in-right tablet:hidden '
          : 'hidden animate-slide-out-right',
        'flex-1 flex-col w-full z-30',
        'fixed h-full',
        className,
      )}
    >
      <div className="h-[66px]"></div>
      {/* <Header /> */}
      <div className="px-4 py-6 bg-base flex flex-col w-full h-full justify-between">
        <div className="flex flex-col">
          <div className="flex flex-col p-4 gap-2 border border-gray-900 bg-light rounded-xl shadow-md">
            {navs.map((nav, index) => (
              <div className="flex items-center" key={index}>
                <Link
                  href={nav.href ?? '#'}
                  className="text-base py-2 text-gray-500 font-semibold uppercase"
                  aria-current="page"
                >
                  {nav.label}
                </Link>
              </div>
            ))}
          </div>
          <div className="flex justify-around p-4 border bg-light border-gray-900 rounded-xl shadow-md">
            <Link href={'#'} className="" aria-current="page">
              {/*<Icon.Twitter width={24} height={24} className="" />*/}
            </Link>
            <Link href={'#'} className="" aria-current="page">
              {/*<Icon.Telegram width={24} height={24} />*/}
            </Link>
            <Link href={'#'} className="" aria-current="page">
              {/*<Icon.U2U width={24} height={24} />*/}
            </Link>
          </div>
          <p className="text-small text-center mt-8 text-gray-500">
            © 2024 U2SocialHub. All rights reserved.
          </p>
        </div>
        <Button className="flex w-full h-full" variant="trapezoid">
          join socialhub
        </Button>
      </div>
    </div>
  );
}
