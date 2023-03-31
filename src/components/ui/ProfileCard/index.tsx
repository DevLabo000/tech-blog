import Image from 'next/image';

import { Author } from '@/types/author';

type ProfileCardProps = {
  authors: Author;
};

export const ProfileCard = (props: ProfileCardProps) => {
  const { authors } = props;
  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="relative flex flex-col items-center rounded-[20px]  mx-auto p-4 bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none">
        <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover">
          <Image
            src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png"
            className="absolute flex h-32 w-full justify-center rounded-xl bg-cover"
            alt="aaa"
            fill
            style={{
              objectFit: 'contain',
            }}
          />
          <div className="absolute -bottom-12 flex h-32 w-32 items-center justify-center rounded-full border-[4px] border-white bg-pink-400">
            <Image
              className="h-full w-full rounded-full"
              src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar11.1060b63041fdffa5f8ef.png"
              alt="sss"
              fill
              style={{
                objectFit: 'contain',
              }}
            />
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center">
          <p className="text-base font-normal text-gray-600">{authors.fullName}</p>
        </div>
        <div className="mt-6 mb-3 flex gap-20 md:!gap-14">
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-normal text-gray-600">Posts</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-normal text-gray-600">Followers</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-normal text-gray-600">Following</p>
          </div>
        </div>
      </div>
    </div>
  );
};
