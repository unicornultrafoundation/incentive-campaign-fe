'use client';

import { useEffect, useState } from 'react';
import useSWR from 'swr';

import Button from '@/components/Button';
import Icon from '@/components/Icon';
import Modal from '@/components/Modal';
import { shortenAddress } from '@/utils/string';
import { nextAPI } from '@/services/api';
import useUserStore from '@/store/auth';

import LoadingModal from './loading-modal';

enum ClaimStatus {
  NONE = 0, // 0 - not claim requested yet
  REQUESTED = 1, // 1 - submit request
  PENDING = 2, // 2 - Transaction send airdrop submiting and pending mint
  SUCCESS = 3, // 3 -  Transaction send airdrop minted
  FAILED = 4, // 4 - Transaction send airdrop failed
}

const ClaimGasFeeModal = ({
  isOpen,
  onClose,
  onClaim,
}: {
  isOpen: boolean;
  onClose: () => void;
  onClaim: () => void;
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Free U2U Gas Fee"
      description="Make a $10 USDT transaction to the U2U Network and get 5 $U2U instantly!"
      className="relative border border-[#7EFFC5] !max-w-[550px] max-[550px]:w-[360px] w-[550px] tablet:max-w-[450px] p-6 flex flex-col gap-5"
    >
      <div className="w-full flex flex-col gap-5">
        <div
          style={{
            background: 'linear-gradient(90deg, #9299FF 0%, #4651F6 100%)',
          }}
          className="w-full h-[1px] bg-[#9299FF] mb-2"
        />
      </div>
      <div className="w-full relative">
        <Icon.AirdropBanner className="w-full" />
        <div className="absolute bottom-0 left-8 w-full h-[32%] max-[550px]:h-[34%] max-[550px]:left-5 font-jockey text-3xl max-[550px]:text-xl">
          5 $U2U Await you
        </div>
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
          className="!text-[17px] w-[49%] max-[768px]:w-[35%] p-4 mt-4 !rounded-xl laptop:!rounded-[20px] bg-[#7EFFC5] text-[#141414] hover:!bg-transparent hover:text-[#7EFFC5]  flex items-center justify-center gap-1 border border-solid border-[#8C8C99]"
          onClick={() => {}}
        >
          Learn More
        </Button>
        <Button
          scale="md"
          className="!text-[17px] w-[49%] max-[768px]:flex-1 p-4 mt-4 !rounded-xl laptop:!rounded-[20px] bg-[#7EFFC5] text-[#141414] hover:!bg-transparent hover:text-[#7EFFC5]  flex items-center justify-center gap-1 border border-solid border-[#8C8C99]"
          onClick={() => onClaim()}
        >
          Claim Free Gas Fee Here
        </Button>
      </div>
    </Modal>
  );
};

// const AlreadyClaimedModal = ({
//   isOpen,
//   onClose,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
// }) => {
//   return (
//     <Modal
//       isOpen={isOpen}
//       onClose={onClose}
//       title="Gas Fee Already Claimed"
//       className="relative border border-[#7EFFC5] !max-w-[600px] max-[600px]:w-[400px] w-[600px] tablet:max-w-[450px] p-6 flex flex-col gap-5"
//     >
//       <div className="w-full">
//         <Icon.AirdropClaimed className="w-[100%]" />
//       </div>
//       <div className="w-full text-center text-balance -mt-16">
//         Gas fees have already been claimed by your wallet.
//       </div>
//       <div className="w-full flex items-center justify-between max-[768px]:gap-2">
//         <Button
//           scale="md"
//           style={{
//             background: 'linear-gradient(90deg, #9299FF 0%, #4651F6 100%)',
//           }}
//           className="!text-[18px] w-full p-4 mt-4 rounded-lg text-[#fff] hover:!bg-transparent flex items-center justify-center gap-1 !border-none"
//           onClick={() => {}}
//         >
//           Got it!
//         </Button>
//       </div>
//     </Modal>
//   );
// };

const NotEligbleModal = ({
  isOpen,
  onClose,
  onAirdropNow,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAirdropNow: () => void;
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Ineligible"
      className="relative border border-[#7EFFC5] !max-w-[500px] max-[500px]:w-[350px] w-[500px] tablet:max-w-[450px] p-6 flex flex-col gap-5"
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
          onClick={() => onAirdropNow()}
        >
          Airdrop Now
        </Button>
      </div>
    </Modal>
  );
};

const ClaimSuccessModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="relative border border-[#7EFFC5] !max-w-[500px] max-[500px]:w-[350px] w-[500px] tablet:max-w-[450px] p-6 flex flex-col gap-5"
    >
      <div
        style={{
          fontFamily: 'Inter Bolder',
        }}
        className="w-full text-center text-balance text-[#7EFFC5] !text-[24px] pb-10"
      >
        Gas Fee Successfully Claimed
      </div>
      <div className="w-full flex justify-center">
        <Icon.ClaimSuccess className="w-[60%]" />
      </div>
      <div className="w-full text-center text-balance pt-5 text-[16px]">
        Your claim of 5 $U2U was successful! Thank you for being a part of the
        Coinlist campaign.
      </div>
      <div className="w-full flex flex-col gap-5">
        <div
          style={{
            background: 'linear-gradient(90deg, #9299FF 0%, #4651F6 100%)',
          }}
          className="w-full h-[1px] bg-[#9299FF]"
        />
      </div>
      <div className="w-full flex items-center justify-between">
        <div className="text-[#929292] text-[15px]">Tx Hash</div>
        <div className="text-[white] text-[16px] font-bold">
          {shortenAddress('0x35287h284jk24adasdasasddsdasd2x')}
        </div>
      </div>
      <Button
        onClick={onClose}
        scale="md"
        className="bg-[#7EFFC5] text-[#141414] hover:!bg-transparent hover:text-[#7EFFC5] py-4 mt-5"
      >
        Nice!
      </Button>
    </Modal>
  );
};

const getClaimStatus = async () => {
  const res = await nextAPI.get('/airdrop/bridge/get');
  const data = res.data as {
    data: {
      isEligibility: boolean;
      claimStatus: ClaimStatus;
    };
    message: string;
  };
  return data.data;
};

export default function AirdropModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [initialLoading, setInitialLoading] = useState(true);
  const { userClaimStatus, setUserClaimStatus } = useUserStore();
  useSWR(isOpen ? 'get-claim-status' : null, getClaimStatus, {
    refreshInterval:
      userClaimStatus !== null &&
      userClaimStatus.claimStatus !== ClaimStatus.PENDING &&
      userClaimStatus.claimStatus !== ClaimStatus.REQUESTED
        ? 0
        : 1000,
    onSuccess: (data) => {
      setUserClaimStatus(data);
      if (initialLoading) {
        setInitialLoading(false);
      }
    },
  });

  const onClaim = async () => {
    await nextAPI.post('/airdrop/bridge/claim');
    const getClaimStatusRes = await getClaimStatus();
    setUserClaimStatus(getClaimStatusRes);
  };

  useEffect(() => {
    if (isOpen) {
      getClaimStatus();
    }
  }, [isOpen]);

  if (initialLoading) {
    return (
      <LoadingModal
        isLoading={isOpen}
        title="Loading claim data. Please wait..."
        onClose={onClose}
      />
    );
  }

  if (!userClaimStatus) {
    return null;
  }

  if (!userClaimStatus.isEligibility) {
    return (
      <NotEligbleModal
        isOpen={isOpen}
        onClose={onClose}
        onAirdropNow={() => {}}
      />
    );
  }

  if (userClaimStatus.claimStatus === ClaimStatus.NONE) {
    return (
      <ClaimGasFeeModal isOpen={isOpen} onClose={onClose} onClaim={onClaim} />
    );
  }

  if (userClaimStatus.claimStatus === ClaimStatus.SUCCESS) {
    return <ClaimSuccessModal isOpen={isOpen} onClose={onClose} />;
  }

  if (userClaimStatus.claimStatus === ClaimStatus.FAILED) {
    return (
      <NotEligbleModal
        isOpen={isOpen}
        onClose={onClose}
        onAirdropNow={() => {}}
      />
    );
  }

  if (
    userClaimStatus.claimStatus === ClaimStatus.REQUESTED ||
    userClaimStatus.claimStatus === ClaimStatus.PENDING
  ) {
    return (
      <LoadingModal
        isLoading={isOpen}
        title="Processing your claim... Please wait."
        onClose={onClose}
      />
    );
  }
}
