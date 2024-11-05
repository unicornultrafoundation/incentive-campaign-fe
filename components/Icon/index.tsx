import Image, { ImageProps } from 'next/image';
import React from 'react';

import TwoUserIcon from '@/components/Icon/2Users';
import ARBChain from '@/components/Icon/ARB.png';
import AdminImg from '@/components/Icon/AdminImg.png';
import ArrowIcon from '@/components/Icon/Arrow';
import ArrowRightIcon from '@/components/Icon/ArrowRight';
import BSCChain from '@/components/Icon/BSC.png';
import BgImg from '@/components/Icon/Background.png';
import BannerBackground from '@/components/Icon/BannerBackground.png';
import BgPresaleAdmin from '@/components/Icon/BgPresaleAdmin.png';
import BgSubmit from '@/components/Icon/BgSubmit.png';
import CardIcon from '@/components/Icon/Card';
import Cards from '@/components/Icon/Cards.png';
import CheckIcon from '@/components/Icon/Check';
import ClockIcon from '@/components/Icon/Clock';
import CloseIcon from '@/components/Icon/Close';
import EditIcon from '@/components/Icon/Edit';
import EllipseBackground from '@/components/Icon/EllipseBackground.png';
import LineBackground from '@/components/Icon/LineBackground.png';
import LineBgMobile from '@/components/Icon/LineBg-1.png';
import LoadingIcon from '@/components/Icon/Loading';
import Logo from '@/components/Icon/Logo';
import MenuIcon from '@/components/Icon/Menu';
import MetamaskIcon from '@/components/Icon/Metamask';
import PeopleIcon from '@/components/Icon/People';
import ProcessIcon from '@/components/Icon/Process';
import RefBannerMobile from '@/components/Icon/RefBannerMobile.png';
import ReferralIcon from '@/components/Icon/Referral';
import RefImg from '@/components/Icon/ReferralImg.png';
import RemoveIcon from '@/components/Icon/Remove';
import StarsIcon from '@/components/Icon/Stars';
import U2UIcon from '@/components/Icon/U2U';
import U2UChain from '@/components/Icon/U2U.png';
import U2UsmIcon from '@/components/Icon/U2Usm';
import UnicornUltra from '@/components/Icon/UnicornUltra';
import UploadIcon from '@/components/Icon/Upload';
import WarningIcon from '@/components/Icon/Warning';
import bgPresale from '@/components/Icon/bg-presale.png';
import bgPresaleMb from '@/components/Icon/bg-presale_mb.png';
import ExcelImg from '@/components/Icon/excel.png';
import NoDataImg from '@/assets/Image/NoData.png';
import WalletConnect from '@/assets/Image/walletconnect.png';
import SearchIcon from '@/components/Icon/Search';
import U2UWalletIcon from '@/components/Icon/U2UWallet';
import HomeSection2Ellipse from '@/components/Icon/home-section2-ellipse-bg.png';
import HomeSection2Ellipse2 from '@/components/Icon/home-section2-ellipse-2.png';
import HomeSection2Bg from '@/components/Icon/home-section2-bg.png';
import IconWarning from '@/components/Icon/icon-warning.png';
import LogoCoinList from '@/components/Icon/logo-coinlist.png';
import EllipseSection1 from '@/components/Icon/EllipseSection1.png';
import Crystal from '@/components/Icon/Crystal.png';
import Star from '@/components/Icon/Star.png';
import StarPurple from '@/components/Icon/StarPurple.png';
import AirdropBanner from '@/components/Icon/AirdropBanner.png';
import AirdropClaimed from '@/components/Icon/AirdropClaimed.png';
import NotEligible from '@/components/Icon/NotEligible.png';
import ApproveLogo from '@/components/Icon/LogoApporve.png';
import StarWhite from '@/components/Icon/StarWhite.png';
import ClaimSuccess from '@/components/Icon/ClaimSuccess.png';
import AirdropClaimError from '@/components/Icon/AirdropClaimError.png';
import Bitget from '@/components/Icon/Bitget.png';
import Okx from '@/components/Icon/Okx.png';
import StakingTabActive from '@/components/Icon/StakingTabActive';
import StakingTabNotActive from '@/components/Icon/StakingTabNotActive';
import AirdropClaimBitget from '@/components/Icon/airdrop-claim-bitget.png';

export type IconProps = React.SVGProps<SVGSVGElement>;
//
export default function Icon() {
  return null;
}
Icon.Logo = (props: IconProps & { width?: string; height?: string }) => (
  <Logo {...props} />
);
Icon.UnicornUltra = (props: IconProps) => <UnicornUltra {...props} />;
Icon.ArrowRightIcon = (props: IconProps) => <ArrowRightIcon {...props} />;
Icon.StarsIcon = (props: IconProps) => <StarsIcon {...props} />;
Icon.Card = (props: IconProps) => <CardIcon {...props} />;
Icon.Menu = (props: IconProps) => <MenuIcon {...props} />;
Icon.Close = (props: IconProps) => <CloseIcon {...props} />;
Icon.Process = (props: IconProps) => <ProcessIcon {...props} />;
Icon.People = (props: IconProps) => <PeopleIcon {...props} />;
Icon.U2Usm = (props: IconProps) => <U2UsmIcon {...props} />;
Icon.Arrow = (props: IconProps) => <ArrowIcon {...props} />;
Icon.TwoUser = (props: IconProps) => <TwoUserIcon {...props} />;
Icon.Referral = (props: IconProps) => <ReferralIcon {...props} />;
Icon.Edit = (props: IconProps) => <EditIcon {...props} />;
Icon.Upload = (props: IconProps) => <UploadIcon {...props} />;
Icon.Remove = (props: IconProps) => <RemoveIcon {...props} />;
Icon.Clock = (props: IconProps) => <ClockIcon {...props} />;
Icon.Check = (props: IconProps) => <CheckIcon {...props} />;
Icon.MetaMask = (props: IconProps) => <MetamaskIcon {...props} />;
Icon.U2U = (props: IconProps) => <U2UIcon {...props} />;
Icon.Warning = (props: IconProps) => <WarningIcon {...props} />;
Icon.Loading = (props: IconProps) => <LoadingIcon {...props} />;
Icon.Search = (props: IconProps) => <SearchIcon {...props} />;
Icon.U2UWallet = (props: IconProps) => <U2UWalletIcon {...props} />;
Icon.StakingTabActive = (props: IconProps) => <StakingTabActive {...props} />;
Icon.StakingTabNotActive = (props: IconProps) => (
  <StakingTabNotActive {...props} />
);

Icon.Cards = (props: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image alt="attention" src={Cards} {...props} />
);
Icon.LineBackground = (props: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image alt="attention" src={LineBackground} {...props} />
);
Icon.LineBgMobile = (props: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image alt="attention" src={LineBgMobile} {...props} />
);
Icon.EllipseBackground = (props: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image alt="attention" src={EllipseBackground} {...props} />
);
Icon.BannerBackground = (props: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image alt="attention" src={BannerBackground} {...props} />
);
// Icon.MetaMask = (props: Omit<ImageProps, 'src' | 'alt'>) => (
//   <Image alt="attention" src={MetaMask} {...props} />
// );
Icon.RefBannerMobile = (props: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image alt="" src={RefBannerMobile} {...props} />
);
Icon.BgImg = (props: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image alt="" src={BgImg} {...props} />
);
Icon.RefImg = (props: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image alt="" src={RefImg} {...props} />
);
Icon.AdminImg = (props: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image alt="" src={AdminImg} {...props} />
);
Icon.ExcelImg = (props: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image alt="" src={ExcelImg} {...props} />
);
Icon.BgSubmitImg = (props: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image alt="" src={BgSubmit} {...props} />
);

Icon.U2UChain = (props: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image alt="" src={U2UChain} {...props} />
);
Icon.BSCChain = (props: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image alt="" src={BSCChain} {...props} />
);
Icon.ARBChain = (props: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image alt="" src={ARBChain} {...props} />
);
Icon.BgPreSale = (props: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image alt="" src={bgPresale} {...props} />
);
Icon.BgPreSaleMb = (props: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image alt="" src={bgPresaleMb} {...props} />
);
Icon.BgPresaleAd = (props: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image alt="" src={BgPresaleAdmin} {...props} />
);
Icon.NoDataImg = (props: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image alt="" src={NoDataImg} {...props} />
);
Icon.WalletConnect = (props: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image alt="" src={WalletConnect} {...props} />
);

Icon.HomeSection2Ellipse = (props: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image alt="" src={HomeSection2Ellipse} {...props} />
);
Icon.HomeSection2Ellipse2 = (props: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image alt="" src={HomeSection2Ellipse2} {...props} />
);
Icon.HomeSection2Bg = (props: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image alt="" src={HomeSection2Bg} {...props} />
);
Icon.IconWarning = (props: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image alt="" src={IconWarning} {...props} />
);
Icon.LogoCoinList = (props: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image alt="" src={LogoCoinList} {...props} />
);

Icon.EllipseSectionOne = (props: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image alt="attention" src={EllipseSection1} {...props} />
);
Icon.Crystal = (props: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image alt="attention" src={Crystal} {...props} />
);
Icon.Star = (props: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image alt="attention" src={Star} {...props} />
);
Icon.AirdropBanner = (props: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image alt="attention" src={AirdropBanner} {...props} />
);
Icon.StarPurple = (props: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image alt="attention" src={StarPurple} {...props} />
);
Icon.AirdropClaimed = (props: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image alt="attention" src={AirdropClaimed} {...props} />
);
Icon.NotEligible = (props: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image alt="attention" src={NotEligible} {...props} />
);
Icon.ApproveLogo = (props: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image alt="attention" src={ApproveLogo} {...props} />
);
Icon.StarWhite = (props: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image alt="attention" src={StarWhite} {...props} />
);
Icon.ClaimSuccess = (props: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image alt="attention" src={ClaimSuccess} {...props} />
);
Icon.AirdropClaimError = (props: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image alt="attention" src={AirdropClaimError} {...props} />
);
Icon.Bitget = (props: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image alt="attention" src={Bitget} {...props} />
);
Icon.Okx = (props: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image alt="attention" src={Okx} {...props} />
);
Icon.AirdropClaimBitget = (props: Omit<ImageProps, 'src' | 'alt'>) => (
  <Image alt="attention" src={AirdropClaimBitget} {...props} />
);
