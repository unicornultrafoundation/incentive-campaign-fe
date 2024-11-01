'use client';

import Button from '@/components/Button';
import Icon from '@/components/Icon';
import Modal from '@/components/Modal';
import { useState } from 'react';

const ClaimGasFeeModal = () => {
  return (
    <Modal
      isOpen={true}
      onClose={() => {}}
      title="Free U2U Gas Fee"
      description="Make a $10 USDT transaction to the U2U Network and get 5 $U2U instantly!"
      className="relative border border-[#7EFFC5] !max-w-[600px] max-[600px]:w-[400px] w-[600px] tablet:max-w-[450px] p-6 flex flex-col gap-5"
    >
      <div className="w-full flex flex-col gap-5">
        <div
          style={{
            background: 'linear-gradient(90deg, #9299FF 0%, #4651F6 100%)',
          }}
          className="w-full h-[1px] bg-[#9299FF] mb-2"
        />
      </div>
      <div className="w-full">
        <Icon.AirdropBanner className="w-full" />
      </div>
      <div className="w-full flex flex-col gap-5">
        <div className="w-full flex items-center gap-5">
          <div>
            <Icon.StarPurple className="w-[30px]" />
          </div>
          <div className="flex-1 flex items-center">
            Simple transaction, get 5 U2U instantly
          </div>
        </div>
        <div className="w-full flex items-center gap-5">
          <div>
            <Icon.StarPurple className="w-[30px]" />
          </div>
          <div className="flex-1 flex items-center">
            Limited to 1 claim per wallet
          </div>
        </div>
        <div className="w-full flex items-center gap-5">
          <div>
            <Icon.StarPurple className="w-[30px]" />
          </div>
          <div className="flex-1 flex items-center">
            Explore U2U Network Ecosystem in early stage
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-between max-[768px]:gap-2">
        <Button
          scale="md"
          className="!text-[18px] w-[48.5%] max-[768px]:w-[35%] p-4 mt-4 !rounded-xl laptop:!rounded-[20px] bg-[#7EFFC5] text-[#141414] hover:!bg-transparent hover:text-[#7EFFC5]  flex items-center justify-center gap-1 border border-solid border-[#8C8C99]"
          onClick={() => {}}
        >
          Learn More
        </Button>
        <Button
          scale="md"
          className="!text-[18px] w-[48.5%] max-[768px]:flex-1 p-4 mt-4 !rounded-xl laptop:!rounded-[20px] bg-[#7EFFC5] text-[#141414] hover:!bg-transparent hover:text-[#7EFFC5]  flex items-center justify-center gap-1 border border-solid border-[#8C8C99]"
          onClick={() => {}}
        >
          Claim Free Gas Fee Here
        </Button>
      </div>
    </Modal>
  );
};

const AlreadyClaimedModal = () => {
  return (
    <Modal
      isOpen={true}
      onClose={() => {}}
      title="Gas Fee Already Claimed"
      className="relative border border-[#7EFFC5] !max-w-[600px] max-[600px]:w-[400px] w-[600px] tablet:max-w-[450px] p-6 flex flex-col gap-5"
    >
      <div className="w-full">
        <Icon.AirdropClaimed className="w-[100%]" />
      </div>
      <div className="w-full text-center text-balance -mt-16">
        Gas fees have already been claimed by your wallet.
      </div>
      <div className="w-full flex items-center justify-between max-[768px]:gap-2">
        <Button
          scale="md"
          style={{
            background: 'linear-gradient(90deg, #9299FF 0%, #4651F6 100%)',
          }}
          className="!text-[18px] w-full p-4 mt-4 rounded-lg text-[#fff] hover:!bg-transparent flex items-center justify-center gap-1 !border-none"
          onClick={() => {}}
        >
          Got it!
        </Button>
      </div>
    </Modal>
  );
};

const NotEligbleModal = () => {
  return (
    <Modal
      isOpen={true}
      onClose={() => {}}
      title="Ineligible"
      className="relative border border-[#7EFFC5] !max-w-[600px] max-[600px]:w-[400px] w-[600px] tablet:max-w-[450px] p-6 flex flex-col gap-5"
    >
      <div className="w-full flex flex-col gap-5">
        <div className="w-full h-[1px] bg-[#1F1F1F] mb-2" />
      </div>
      <div className="w-full flex justify-center">
        <Icon.NotEligible className="w-[40%]" />
      </div>
      <div className="w-full flex flex-col gap-5 text-center text-balance px-2 py-5">
        You need a successful bridge transaction from $USDT to U2U Network with
        at least $10. Complete the transaction and return to claim your reward!
      </div>
      <div className="w-full flex items-center justify-between max-[768px]:gap-2">
        <Button
          scale="md"
          className="!text-[18px] w-[48.5%] max-[768px]:w-[35%] p-4 mt-4 !rounded-xl laptop:!rounded-[20px] bg-[#7EFFC5] text-[#141414] hover:!bg-transparent hover:text-[#7EFFC5]  flex items-center justify-center gap-1 border border-solid border-[#8C8C99]"
          onClick={() => {}}
        >
          Learn More
        </Button>
        <Button
          scale="md"
          className="!text-[18px] w-[48.5%] max-[768px]:flex-1 p-4 mt-4 !rounded-xl laptop:!rounded-[20px] bg-[#7EFFC5] text-[#141414] hover:!bg-transparent hover:text-[#7EFFC5]  flex items-center justify-center gap-1 border border-solid border-[#8C8C99]"
          onClick={() => {}}
        >
          Airdrop Now
        </Button>
      </div>
    </Modal>
  );
};



export default function AirdropModal() {
  const [status, setStatus] = useState<
    'NOT_CLAIMED' | 'ALREADY_CLAIMED' | 'NOT_ELIGIBLE' | 'CLAIM_SUCCESS'
  >('NOT_ELIGIBLE');

  if (status === 'NOT_CLAIMED') {
    return <ClaimGasFeeModal />;
  }

  if (status === 'ALREADY_CLAIMED') {
    return <AlreadyClaimedModal />;
  }

  if (status === 'CLAIM_SUCCESS') {
    return <AlreadyClaimedModal />;
  }

  if (status === 'NOT_ELIGIBLE') {
    return <NotEligbleModal />;
  }

  if (status === 'CLAIM_SUCCESS') {
    return <NotEligbleModal />;
  }
}
