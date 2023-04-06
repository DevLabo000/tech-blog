import { useRouter } from 'next/router';
import React from 'react';

import HomeIcon from '@/public/home.svg';

export const SubHeader: React.FC = () => {
  const router = useRouter();
  return (
    <nav className="bg-pink-400">
      <button
        type="button"
        className="hover:bg-pink-300 text-white font-bold items-center px-4 pt-1"
        /* eslint-disable-next-line */
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
