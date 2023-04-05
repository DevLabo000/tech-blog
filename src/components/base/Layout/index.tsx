import React from 'react';

import { AppMeta } from 'newt-client-js';

import { Footer } from '../Footer';
import { Header } from '../Header';
import { Meta, MetaProps } from '../Meta';

export type LayoutProps = {
  app: AppMeta;
  meta: MetaProps;
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = (props) => {
  const { app, meta, children } = props;
  return (
    <>
      <Meta {...meta} />
      <div className="bg-gray-50 h-full">
        <Header app={app} />
        {children}
        <Footer />
      </div>
    </>
  );
};

/*
        <section className="container mx-auto h-full">
          <div className="mt-10 p-2">{children}</div>
        </section>
*/
