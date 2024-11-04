import FormStaking from '@/components/Pages/Home/SectionTwo/Staking/FormStaking';
import Statistics from '@/components/Pages/Home/SectionTwo/Staking/Statistics';

export const Staking = () => {
  return (
    <div className="bg-[#1F1F1F] p-4 laptop:p-8 rounded-2xl flex flex-col-reverse gap-10 laptop:flex-row justify-between items-center">
      <FormStaking />
      <Statistics />
    </div>
  );
};
