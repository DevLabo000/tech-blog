/* eslint no-underscore-dangle:0 no-shadow:0 */
/* eslint-disable */
import GitHubIcon from '@/public/github.svg';
import { Author } from '@/types/author';
import Link from 'next/link';

type ProfileCardProps = {
  authors: Author;
};

export const ProfileCard = (props: ProfileCardProps) => {
  const { authors } = props;
  return (
    <div className="flex justify-center items-center w-auto">
      <div className="flex flex-col justify-center items-center">
        <img className="mt-10 h-32 w-32 rounded-full" src={authors.profileImage.src} />
        <h1 className="text-gray-800 text-2xl mt-2 font-bold">{authors.fullName}</h1>
        <div
          className="prose prose:text-gray-400 text-sm pt-4"
          dangerouslySetInnerHTML={{ __html: authors.biography }}
        ></div>
        <div className="flex flex-col justify-center items-center mt-3 mb-6">
          <h1>SNS</h1>
          <div className="flex mt-4">
            <Link href="https://github.com/DevLabo000">
              <GitHubIcon width={40} height={40} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

/*
    <div className="flex flex-col justify-center items-center ">
      <div className="relative w-full">
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
*/
