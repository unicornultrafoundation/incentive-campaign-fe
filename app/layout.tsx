/* eslint-disable @next/next/no-img-element */

import type { Metadata } from 'next';
import { getLocale, getMessages } from 'next-intl/server';
import React from 'react';
import Script from 'next/script';

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
            type: 'image/png',
          }
        : {
            url: `${CLIENT_URL}/images/thumbnail/Bitget.png`,
            width: 1200,
            height: 600,
            type: 'image/png',
          },
  },
  twitter: {
    images:
      CAMPAIGN_TYPE === 'public'
        ? {
            url: `${CLIENT_URL}/images/thumbnail/Coinlist.png`,
            width: 1200,
            height: 600,
            type: 'image/png',
          }
        : {
            url: `${CLIENT_URL}/images/thumbnail/Bitget.png`,
            width: 1200,
            height: 600,
            type: 'image/png',
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
        {CAMPAIGN_TYPE === 'public' && (
          <Script
            id="facebook-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '2026508811116522');
              fbq('track', 'PageView');
          `,
            }}
          />
        )}
        {CAMPAIGN_TYPE === 'public' && (
          <noscript>
            <img
              height="1"
              width="1"
              style={{
                display: 'none',
              }}
              alt="facebook-pixel"
              src="https://www.facebook.com/tr?id=2026508811116522&ev=PageView&noscript=1"
            />
          </noscript>
        )}
      </head>
      <body>
        <AppProviders messages={messages} locale={locale}>
          <main className="root-layout">{children}</main>
        </AppProviders>
      </body>
    </html>
  );
};

export default RootLayout;
