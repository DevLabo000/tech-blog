import React from 'react';

import { HeaderStyled } from './index.styled';

export type HeaderProps = {
  /* eslint react/require-default-props: 0 */
  title?: string;
};

export const Header: React.FC<HeaderProps> = (props) => {
  const { title } = props;
  return (
    <header className={HeaderStyled}>
      <h1>{title}</h1>
    </header>
  );
};
