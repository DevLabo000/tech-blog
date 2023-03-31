import React from 'react';

import { AppMeta } from 'newt-client-js';

import { Footer } from '../Footer';
import { Header } from '../Header';

export type LayoutProps = {
  app: AppMeta;
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = (props) => {
  const { app, children } = props;
  return (
    <div className="bg-gray-50 h-full">
      <Header title={app.name} />
      <section className="container mx-auto h-full">
        <div className="mt-10 p-2">
          <main className="bg-white w-auto m-1 p-2 rounded-md">{children}</main>
          <div className="bg-white w-auto h-96 m-1 p-2 rounded-md">プロフィール</div>
        </div>
      </section>
      <Footer />
    </div>
  );
};
