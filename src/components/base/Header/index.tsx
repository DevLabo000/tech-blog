import React from 'react';

import Link from 'next/link';

export type HeaderProps = {
  /* eslint react/require-default-props: 0 */
  title?: string;
};

export const Header: React.FC<HeaderProps> = (props) => {
  const { title } = props;
  return (
    <>
      <header className="bg-white h-12 sticky top-0 z-999999 text-center">
        <h1>{title}</h1>
      </header>
      <nav className="bg-pink-300">
        <ul className=" flex ">
          <li className="text-white">
            <Link href="/">ホーム</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
