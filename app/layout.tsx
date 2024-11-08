import type { Metadata } from 'next';
import { getLocale, getMessages } from 'next-intl/server';
import React from 'react';
import './globals.scss';

import AppProviders from '@/components/Providers';
import { CAMPAIGN_TYPE, CLIENT_URL } from '@/config/env';

const publicKeywords = [
  'staking',
  'yield',
  'U2U',
  'mainnet',
  'campaigns',
  'coinlist',
  'incentives',
  'reward',
];
const bitgetKeywords = [
  'staking',
  'yield',
  'U2U',
  'mainnet',
  'campaigns',
  'bitget',
  'incentives',
  'reward',
];

export const metadata: Metadata = {
  title:
    CAMPAIGN_TYPE === 'public'
      ? 'U2U Incentivized Mainnet Saga'
      : 'U2U x Bitget Incentivized Campaigns',
  description:
    CAMPAIGN_TYPE === 'public'
      ? 'Staking pUSDT and earn attractive yield on U2U token'
      : 'Staking pUSDT and earn attractive yield on U2U token',
  keywords: CAMPAIGN_TYPE === 'public' ? publicKeywords : bitgetKeywords,
  openGraph: {
    images:
      CAMPAIGN_TYPE === 'public'
        ? {
            url: `${CLIENT_URL}/images/thumbnail/Coinlist.png`,
            width: 1200,
            height: 600,
            type: 'png',
          }
        : {
            url: `${CLIENT_URL}/images/thumbnail/Bitget.png`,
            width: 1200,
            height: 600,
            type: 'png',
          },
  },
  twitter: {
    images:
      CAMPAIGN_TYPE === 'public'
        ? {
            url: `${CLIENT_URL}/images/thumbnail/Coinlist.png`,
            width: 1200,
            height: 600,
            type: 'png',
          }
        : {
            url: `${CLIENT_URL}/images/thumbnail/Bitget.png`,
            width: 1200,
            height: 600,
            type: 'png',
          },
    card: 'summary_large_image',
    title:
      CAMPAIGN_TYPE === 'public'
        ? 'U2U Incentivized Mainnet Saga'
        : 'U2U x Bitget Incentivized Campaigns',
    description:
      CAMPAIGN_TYPE === 'public'
        ? 'Staking pUSDT and earn attractive yield on U2U token'
        : 'Staking pUSDT and earn attractive yield on U2U token',
  },
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // const messages = await getMessages();
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} prefix="og: http://ogp.me/ns#">
      <head>
        <meta prefix="og: http://ogp.me/ns#" />
      </head>
      <body>
        {/* <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MCFFZQVB"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript> */}
        <AppProviders messages={messages} locale={locale}>
          <main className="root-layout">{children}</main>
        </AppProviders>
      </body>
    </html>
  );
};

export default RootLayout;
