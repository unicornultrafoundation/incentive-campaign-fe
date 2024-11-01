import type { Metadata } from 'next';
import { getLocale, getMessages } from 'next-intl/server';
import React from 'react';
import './globals.scss';

import AppProviders from '@/components/Providers';

export const metadata: Metadata = {
  title: 'U2U Liquid',
  description: '',
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
    <html lang={locale}>
      <head>
        <title>Liquid Staking</title>

        <meta property="og:type" content="website" />
        <meta property="og:title" content="U2U Network DePIN Node Sale" />
        <meta
          property="og:description"
          content="The World’s First DePIN Subnet Node for Decentralized Infrastructure Growth"
        />
        <meta property="og:url" content="https://node.depinsubnet.com" />
        <meta property="og:image" content="/images/og-image.jpeg" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="600" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="U2U Network DePIN Node Sale" />
        <meta
          name="twitter:description"
          content="The World’s First DePIN Subnet Node for Decentralized Infrastructure Growth"
        />
        <meta name="twitter:image" content="/images/og-image.jpeg" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="600" />
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
