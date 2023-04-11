import { Content } from 'newt-client-js';
import Image from 'next/image';
import Link from 'next/link';

import { Article } from '@/types/article';

export type ArticleCardProps = {
  article: Content & Article;
};

export const ArticleCard = (props: ArticleCardProps) => {
  const { article } = props;
  const ogUrl = process.env.NEXT_PUBLIC_OG_IMAGE_DOMAIN;
  // eslint-disable-next-line no-underscore-dangle
  const yyyy = article._sys.createdAt.substring(0, 4);
  // eslint-disable-next-line no-underscore-dangle
  const mm = article._sys.createdAt.substring(5, 7);
  // eslint-disable-next-line no-underscore-dangle
  const dd = article._sys.createdAt.substring(8, 10);
  const mmdd = `${mm}/${dd}`;
  return (
    <Link className="group transition-all duration-500 ease-out" href={`/article/${article.slug}`}>
      <div className="p-8">
        <div className="container flex flex-wrap w-auto">
          <div className="border-r">
            <div className="text-gray-500 text-center mr-3">
              <p className="text-md">{yyyy}</p>
              <p className="text-xl font-bold">{mmdd}</p>
            </div>
          </div>
          <h1 className="px-3 font-extrabold text-lg">{article.title}</h1>
        </div>
        <div>
          <div className="m-5 flex justify-center bg-gradient-to-r from-pink-50 to-pink-100 overflow-hidden">
            <Image
              src={`${ogUrl}/api/og?title=${article.title}`}
              alt="tete"
              style={{
                width: '100%',
                height: 'auto',
              }}
              className="transition-all duration-500 ease-out group-hover:scale-110"
              width={1024}
              height={512}
              sizes="100vw"
            />
          </div>
        </div>
        <div />
        <div className="border-b">
          <div className="mb-10 px-10 md:px-32">
            <button
              type="button"
              className="w-full bg-white border border-gray-400 group-hover:bg-primary group-hover:text-white py-2 px-4 rounded-full transition-all duration-500 ease-out"
            >
              READ MORE
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
