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
    <Link href={`/article/${article.slug}`}>
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
        <div style={{ position: 'relative', maxWidth: '100%', height: '250px' }}>
          <Image
            src={article.coverImage.src}
            alt="tete"
            fill
            style={{
              objectFit: 'contain',
            }}
          />
        </div>
        <div />
        <div className="border-b">
          <div className="mb-10">
            <button type="button" className="w-full bg-pink-400 hover:bg-pink-700 text-white py-2 px-4 rounded-full">
              READ MORE
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
