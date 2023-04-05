/* eslint no-underscore-dangle:0 no-shadow:0 */
/* eslint-disable */

import React from 'react';

import { useRouter } from 'next/router';

import HomeIcon from '@/public/home.svg';

export const SubHeader: React.FC = () => {
  const router = useRouter();
  return (
    <nav className="bg-pink-400">
      <button
        type="button"
        className="hover:bg-pink-300 text-white font-bold items-center px-4 pt-1"
        onClick={() => router.push('/')}
      >
        <div className="inline-flex">
          <HomeIcon width={25} height={25} />
          <span className="pl-2 font-bold">ホーム</span>
        </div>
      </button>
    </nav>
  );
};
