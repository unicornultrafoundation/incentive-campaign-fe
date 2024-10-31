import Link from 'next/link';
import { useTranslations } from 'next-intl';

import TwitterIcon from '@/components/Icon/Twitter';
import TelegramIcon from '@/components/Icon/Telegram';
import FacebookIcon from '@/components/Icon/Facebook';
import DiscordIcon from '@/components/Icon/Discord';
import Icon from '@/components/Icon';
import { NODE_TYPES_LINK, SOCIAL } from '@/config/constants';
import YoutubeIcon from '@/components/Icon/Youtube';
import LinkedinIcon from '@/components/Icon/Linkedin';
import ArrowLink from '@/components/Icon/ArrowLink';

const Footer = () => {
  const t = useTranslations();
  return (
    <footer className="w-full h-full desktop:px-[100px] px-4 bg-[#141414]">
      <div className="tablet:flex desktop:py-9 py-4 border-t border-[#7EFFC5] ">
        <div className="mb-4 flex tablet:flex-col justify-between items-center tablet:items-start w-full gap-5">
          <Icon.Logo className="tablet:w-10 tablet:h-10 w-[26px] h-[32px] " />
          <div className="flex flex-col gap-2 tablet:gap-4">
            <div className="flex gap-4 tablet:gap-6">
              <Link
                href={SOCIAL.FACEBOOK}
                rel="noopener noreferrer"
                target="_blank"
                className="link-icons"
                aria-current="page"
              >
                <FacebookIcon
                  width={20}
                  height={20}
                  className="desktop:w-[24px] desktop:h-[24px]"
                />
              </Link>
              <Link
                href={SOCIAL.TWITTER}
                rel="noopener noreferrer"
                target="_blank"
                className="link-icons"
                aria-current="page"
              >
                <TwitterIcon
                  width={20}
                  height={20}
                  className="desktop:w-[24px] desktop:h-[24px]"
                />
              </Link>
              <Link
                href={SOCIAL.YOUTUBE}
                rel="noopener noreferrer"
                target="_blank"
                className="link-icons"
                aria-current="page"
              >
                <YoutubeIcon
                  width={20}
                  height={20}
                  className="desktop:w-[24px] desktop:h-[24px]"
                />
              </Link>
              <Link
                href={SOCIAL.TELEGRAM}
                rel="noopener noreferrer"
                target="_blank"
                className="link-icons"
                aria-current="page"
              >
                <TelegramIcon
                  width={20}
                  height={20}
                  className="desktop:w-[24px] desktop:h-[24px]"
                />
              </Link>
              <Link
                href={SOCIAL.LINKEDIN}
                rel="noopener noreferrer"
                target="_blank"
                className="link-icons"
                aria-current="page"
              >
                <LinkedinIcon
                  width={20}
                  height={20}
                  className="desktop:w-[24px] desktop:h-[24px]"
                />
              </Link>
              <Link
                href={SOCIAL.DISCORD}
                rel="noopener noreferrer"
                target="_blank"
                className="link-icons"
                aria-current="page"
              >
                <DiscordIcon
                  width={20}
                  height={20}
                  className="desktop:w-[24px] desktop:h-[24px]"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center gap-4">
          <Link
            href={NODE_TYPES_LINK}
            rel="noopener noreferrer"
            target="_blank"
            className="link-icons tablet:w-[180px] tablet:h-[64px] p-4 tablet:px-4 tablet:py-2 flex items-center gap-1 tablet:gap-2 font-roboto bg-[#1F1F1F] rounded-[32px] tablet:rounded-lg hover:border hover:border-solid hover:border-[#7EFFC5] hover:bg-[#141414]"
            aria-current="page"
          >
            <span className="w-full h-full flex  tablet:justify-start tablet:items-end font-semibold text-sm tracking-[-0.686px] text-[#5FCC8A] hover:text-[#7EFFC5]">
              {t('footer.node_type')}
            </span>
            <div className="h-full tablet:flex tablet:items-start">
              <ArrowLink
                width={24}
                height={24}
                stroke={'#5FCC8A'}
                className="desktop:w-[24px] desktop:h-[24px]"
              />
            </div>
          </Link>
          <Link
            href={SOCIAL.U2U}
            rel="noopener noreferrer"
            target="_blank"
            className="link-icons tablet:w-[180px] tablet:h-[64px] p-4 tablet:px-4 tablet:py-2 flex items-center gap-1 tablet:gap-2 font-roboto bg-[#1F1F1F] rounded-[32px] tablet:rounded-lg hover:border hover:border-solid hover:border-[#7EFFC5] hover:bg-[#141414]"
            aria-current="page"
          >
            <span className="w-full h-full flex tablet:justify-start tablet:items-end font-semibold text-sm tracking-[-0.686px] text-[#5FCC8A] hover:text-[#7EFFC5]">
              {t('footer.step_into_our_world')}
            </span>
            <div className="h-full tablet:flex tablet:items-start">
              <ArrowLink
                width={24}
                height={24}
                stroke={'#5FCC8A'}
                className="desktop:w-[24px] desktop:h-[24px]"
              />
            </div>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
