/* eslint no-underscore-dangle:0 no-shadow:0 */
/* eslint-disable */
import Image from 'next/image';
import Link from 'next/link';

import { Content } from 'newt-client-js';

import { Article } from '@/types/article';

export type ArticleCardProps = {
  article: Content & Article;
};

export const ArticleCard = (props: ArticleCardProps) => {
  const { article } = props;
  const yyyy = article._sys.createdAt.substring(0, 4);
  const mm = article._sys.createdAt.substring(5, 7);
  const dd = article._sys.createdAt.substring(8, 10);
  const mmdd = `${mm}/${dd}`;
  return (
    <Link className="group transition-all duration-500 ease-out" href={`/article/${article.slug}`}>
      <div className="p-2">
        <div className="flex flex-wrap w-auto">
          <div className="border-r">
            <div className="text-gray-500 text-center mr-3">
              <p className="text-xs">{yyyy}</p>
              <p className="text-md">{mmdd}</p>
            </div>
          </div>
          <h1 className="px-3 w-auto text-bold">{article.title}</h1>
        </div>
        {/* <div style={{ position: 'relative', maxWidth: '100%', height: '250px' }}> */}
        <div>
          <div className="m-5 flex justify-center bg-red-50 rounded-3xl overflow-hidden">
            <Image
              src={article.coverImage.src}
              alt="tete"
              style={{
                width: '45%',
                height: 'auto',
              }}
              className="transition-all duration-500 ease-out group-hover:scale-110"
              width={1980}
              height={1150}
              sizes="100vw"
            />
          </div>
        </div>
        <div />
        <div className="border-b">
          <div className="mb-10 px-10 md:px-32">
            <button
              type="button"
              className="w-full bg-white border border-gray-400 group-hover:bg-pink-400 group-hover:text-white py-2 px-4 rounded-full transition-all duration-500 ease-out"
            >
              READ MORE
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
