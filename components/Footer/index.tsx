import Link from 'next/link';
import { useTranslations } from 'next-intl';

import TwitterIcon from '@/components/Icon/Twitter';
import TelegramIcon from '@/components/Icon/Telegram';
import FacebookIcon from '@/components/Icon/Facebook';
import DiscordIcon from '@/components/Icon/Discord';
import Icon from '@/components/Icon';
import { SOCIAL } from '@/config/constants';
import YoutubeIcon from '@/components/Icon/Youtube';
import LinkedinIcon from '@/components/Icon/Linkedin';
import useIsMobile from '@/hooks/useIsMobile';

const Footer = () => {
  const t = useTranslations();
  const isMobile = useIsMobile();

  return (
    <footer className="w-full h-full desktop:px-[100px] px-4 bg-[#141414]">
      <div className="items-center gap-4 flex-col tablet:flex-row flex justify-between desktop:py-9 py-4 border-t border-[#7EFFC5] ">
        <div className="flex items-center gap-4">
          {isMobile ? (
            <Icon.Logo
              width={'80%'}
              className="tablet:w-10 tablet:h-10 w-[32px] h-[32px]"
            />
          ) : (
            <Icon.Logo className="tablet:w-10 tablet:h-10 w-[32px] h-[32px]" />
          )}
          {/* <Icon.Logo className="flex-1 tablet:w-10 tablet:h-10 w-[26px] h-[32px] " /> */}
        </div>
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
    </footer>
  );
};

export default Footer;
