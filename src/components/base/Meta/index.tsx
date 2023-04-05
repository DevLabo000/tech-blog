/* eslint no-underscore-dangle:0 no-shadow:0 */
/* eslint-disable */
import React from 'react';

import Head from 'next/head';

export type MetaProps = {
  title: string;
  siteName: string;
  description: string;
  ogImage?: string;
  favicon?: string;
};

export const Meta: React.FC<MetaProps> = (props) => {
  const { title, siteName, description, ogImage, favicon } = props;
  const faviconUrl = favicon || '/favicon.ico';
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="icon" href={faviconUrl} />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
    </Head>
  );
};
