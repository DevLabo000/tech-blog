import { AppMeta } from 'newt-client-js';
import Image from 'next/image';
import React from 'react';

import { SubHeader } from '../SubHeader';

export type HeaderProps = {
  app: AppMeta;
};

export const Header: React.FC<HeaderProps> = (props) => {
  const { app } = props;
  return (
    <div className="z-999999 text-center">
      <header className="bg-white h-20">
        <div className="flex justify-center">
          {app.cover && (
            <Image
              src={app.cover?.value}
              alt="logo"
              style={{
                width: '20%',
                height: '10%',
              }}
              className=""
              width={1000}
              height={200}
            />
          )}
        </div>
      </header>
      <SubHeader />
    </div>
  );
};
