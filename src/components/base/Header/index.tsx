import React from 'react';

import { SubHeader } from '../SubHeader';

export type HeaderProps = {
  /* eslint react/require-default-props: 0 */
  title?: string;
};

export const Header: React.FC<HeaderProps> = (props) => {
  const { title } = props;
  return (
    <div className="z-999999 text-center">
      <header className="bg-white h-20">
        <h1>{title}</h1>
      </header>
      <SubHeader />
    </div>
  );
};
