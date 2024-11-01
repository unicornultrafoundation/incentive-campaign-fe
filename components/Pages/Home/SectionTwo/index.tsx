import Icon from '@/components/Icon';
import FormStaking from '@/components/Pages/Home/SectionTwo/FormStaking';
import Statistics from '@/components/Pages/Home/SectionTwo/Statistics';

export default function HomeSectionTwo() {
  return (
    <div
      id="section_2"
      className="relative mt-10 laptop:mt-[110px] mb-[80px] laptop:mb-[125px] w-full min-h-screen overflow-hidden"
    >
      <div className="absolute top-0 left-0 z-0">
        <Icon.HomeSection2Ellipse className="w-full h-full" />
      </div>
      <div className="absolute top-0 left-0 z-0">
        <Icon.HomeSection2Ellipse2 className="w-full h-full" />
      </div>
      <div className="absolute top-[-15%] right-0 z-0">
        <Icon.HomeSection2Bg className="w-full h-full" />
      </div>
      <div className="px-4 laptop:px-4 desktop:px-0 laptop:max-w-screen-laptop desktop:max-w-screen-desktop w-full mx-auto relative z-10">
        <div className="w-full flex flex-col items-center justify-center gap-2">
          <h2 className="font-jockey text-5xl">Staking</h2>
          <p className="text-[#929292] text-base laptop:text-xl font-semibold text-center">
            Connect, stake, and let the profits speak for themselves.
          </p>
        </div>
        <div className="mt-5 laptop:mt-[64px] flex flex-col-reverse gap-10 laptop:flex-row justify-between items-center">
          <FormStaking />
          <Statistics />
        </div>
      </div>
    </div>
  );
}
