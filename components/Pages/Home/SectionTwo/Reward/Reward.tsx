import ClaimReward from '@/components/Pages/Home/SectionTwo/Reward/ClaimReward';
import TransactionReward from '@/components/Pages/Home/SectionTwo/Reward/TransactionReward';

export const Reward = () => {
  return (
    <div className="bg-[#1F1F1F] p-4 laptop:p-8 rounded-2xl flex flex-col gap-6 laptop:gap-10 justify-between items-start">
      <ClaimReward />
      <TransactionReward />
    </div>
  );
};
