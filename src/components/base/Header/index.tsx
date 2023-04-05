import React from 'react';

import { AppMeta } from 'newt-client-js';

import { SubHeader } from '../SubHeader';

export type HeaderProps = {
  /* eslint react/require-default-props: 0 */
  app: AppMeta;
};

export const Header: React.FC<HeaderProps> = (props) => {
  const { app } = props;
  return (
    <div className="z-999999 text-center">
      <header className="bg-white h-20">
        <h1>{app.name}</h1>
        {/* 
        <div>
          {app.cover && (
            <Image
              src={app.cover?.value}
              alt="tete"
              style={{
                width: '10%',
                height: 'auto',
              }}
              className="transition-all duration-500 ease-out group-hover:scale-110"
              width={100}
              height={100}
            />
          )}
          
        </div>
        */}
      </header>
      <SubHeader />
    </div>
  );
};
