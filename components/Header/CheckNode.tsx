import React, { FC, useState } from 'react';

import { useSearchNodeApi } from '@/hooks/useQueryApi';
import Input from '@/components/Form/Input';
import Modal from '@/components/Modal';
import { shortenAddress } from '@/utils/string';
import Button from '@/components/Button';

import CloseIcon from '../Icon/Close';
import NoPurchasedImg from '../Icon/NoPurchased';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CheckNode: FC<Props> = (props) => {
  const { isOpen, onClose } = props;
  const [searchAddress, setSearchAddress] = useState('');

  const { data } = useSearchNodeApi({
    params: searchAddress ? { address: searchAddress } : null,
  });
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchAddress(e.target.value);
  };

  const handleOnClose = () => {
    setSearchAddress('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => handleOnClose}
      className="relative border border-[#7EFFC5] max-w-[390px] tablet:max-w-[450px] w-full flex flex-col gap-5"
    >
      <div className="absolute w-5 h-5 bg-[#7EFFC5]  top-[-1%] left-[-9px] rotate-45 "></div>
      <div className="absolute w-5 h-5 bg-[#7EFFC5] top-[-1%] right-[-9px] rotate-45 "></div>
      <div className="absolute w-5 h-5 bg-[#7EFFC5] bottom-[-1%] left-[-9px] rotate-45 "></div>
      <div className="absolute w-5 h-5 bg-[#7EFFC5] bottom-[-1%] right-[-9px] rotate-45 "></div>

      <div className="flex justify-between mb-2">
        <h2 className="font-inter text-lg tablet:text-2xl text-[#7EFFC5] font-semibold">
          Node Purchase Search
        </h2>
        <CloseIcon
          className="cursor-pointer"
          width={24}
          height={24}
          onClick={handleOnClose}
        />
      </div>
      <p className=" font-inter text-sm text-[#929292]">
        Enter a wallet address to view node purchases.
      </p>
      {/* Wallet Address */}
      <div className=" flex flex-col my-4 gap-2">
        <p className=" font-inter text-sm text-[#929292]">Wallet Address</p>
        <div className="flex w-full items-center border border-solid rounded-xl border-[#4A4A4A]">
          <Input
            containerClass="w-full"
            type="text"
            value={searchAddress}
            onChange={handleSearchChange}
            placeholder="Enter Wallet Address"
            className="flex-1 font-inter text-sm text-[#929292 w-full bg-transparent"
          />
          {/*<CloseIcon className="cursor-pointer" width={24} height={24} />*/}
        </div>
      </div>
      <hr className="border-[#4A4A4A]" />

      {/* Bottom Content */}
      <div className="my-4">
        <div className="flex justify-between items-center">
          <p className=" font-inter text-sm text-[#929292]">Wallet Address</p>
          <p className="font-inter text-base font-semibold">
            {shortenAddress(searchAddress) || '0xxx'}
          </p>
        </div>
        {/* Columns */}
        {data && data?.data?.data?.length > 0 ? (
          <div className="flex flex-col p-4 rounded-2xl bg-[#4A4A4A] my-4">
            <div className=" flex justify-between">
              <p className=" font-inter text-sm text-[#929292]">Node Type</p>
              <p className=" font-inter text-sm text-[#929292]">Quantity</p>
            </div>
            <div className="scroll-horizontal-lg h-[228px] flex flex-col overflow-auto">
              {data?.data?.data.map((item, index) => (
                <div
                  key={index}
                  className="my-[10px] pr-4 flex justify-between items-center "
                >
                  <p className="flex flex-1 font-inter text-base">
                    {item.type}
                  </p>
                  <p className="font-inter text-base  text-center">
                    {item.nodes}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center p-4 rounded-2xl bg-[#4A4A4A] my-4">
            <NoPurchasedImg />
            <p className="font-inter text-base mt-6">No Nodes Purchased</p>
          </div>
        )}

        {/* Done Button */}
        <Button
          className="px-4 py-2 mt-4 w-full bg-[#7EFFC5] text-black flex items-center justify-center border border-solid border-[#8C8C99] rounded-[32px]"
          onClick={handleOnClose}
        >
          Done
        </Button>
      </div>
      {/*</div>*/}
    </Modal>
  );
};

export default CheckNode;
