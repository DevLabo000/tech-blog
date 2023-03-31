import React from 'react';

import { AppMeta } from 'newt-client-js';

import { Footer } from '../Footer';
import { Header } from '../Header';
import { Meta } from '../Meta';

export type LayoutProps = {
  app: AppMeta;
  meta: {
    description: string;
    ogImage: string;
  };
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = (props) => {
  const { app, meta, children } = props;
  return (
    <>
      <Meta title={app.name} description={meta.description} ogImage={meta.ogImage} />
      <div className="bg-gray-50 h-full">
        <Header title={app.name} />
        <section className="container mx-auto h-full">
          <div className=" mt-10 p-2">{children}</div>
        </section>
        <Footer />
      </div>
    </>
  );
};
