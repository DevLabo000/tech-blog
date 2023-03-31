import React from 'react';

import Head from 'next/head';

export type MetaProps = {
  title: string;
  description: string;
  ogImage: string;
};

export const Meta: React.FC<MetaProps> = (props) => {
  const { title, description, ogImage } = props;
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
    </Head>
  );
};

/**
<meta property="og:url" content={url} />
<meta property="og:image" content={imgUrl} />
<meta property="og:image:width" content={String(imgWidth)} />
<meta property="og:image:height" content={String(imgHeight)} />
<link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&amp;display=swap" rel="stylesheet"/>
 */
