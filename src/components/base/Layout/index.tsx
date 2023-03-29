import React from 'react';

import Head from 'next/head';

import { AppMeta } from 'newt-client-js';

import { Header } from '../Header';

export type LayoutProps = {
  app: AppMeta;
  children: React.ReactNode;
  header: React.ReactNode;
  subheader: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = (props) => {
  const { app, children, header, subheader } = props;
  return (
    <div>
      <Header title={app.name} />
      <Head>
        <meta name="description" content={app.name} />
      </Head>
      <div>{header}</div>
      <div>{subheader}</div>
      <div>{children}</div>
    </div>
  );
};
