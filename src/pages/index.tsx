/* eslint no-underscore-dangle:0 no-shadow:0 */

import { AppMeta, Content } from 'newt-client-js';

import type { Article } from '@/types/article';

import { Layout } from '@/components/base/Layout';
import { ArticleCard } from '@/components/ui/ArticleCard';
import { ProfileCard } from '@/components/ui/ProfileCard';
import { fetchApp, fetchArchives, fetchArticles, fetchAuthors, fetchCategorys, fetchTags } from '@/lib/api';
import { Author } from '@/types/author';
// import { Category } from '@/types/category';
// import { Tag } from '@/types/tag';

export type TopProps = {
  /* eslint react/require-default-props: 0 */
  app: AppMeta;
  // categorys: (Content & Category & { total: number })[];
  // tags: (Content & Tag & { total: number })[];
  // authors: (Content & Author & Category & { total: number })[];
  // archives: Archive[];
  articles: (Content & Article)[];
  // total: number;
  // page?: number;
  // tagSlug?: string;
  // authorSlug?: string;
  // year?: number;
};

const bbbb: Author = {
  slug: 'a',
  name: 'aa',
  fullName: 'hk',
  profileImage: {
    src: 'a',
  },
  biography: 'bbbb',
};
//
export const Top = (props: TopProps) => {
  const { app, articles } = props;
  return (
    <Layout app={app} meta={{ description: 'aaaa', ogImage: 'a' }}>
      <main className="md:flex md:flex-wrap md:justify-center">
        <div className="bg-white rounded-md md:w-2/3">
          {articles.map((article) => (
            <ArticleCard article={article} key={article._id} />
          ))}
        </div>
        <div className="mt-3 rounded-md md:w-2/3">
          <div className=" bg-white">
            <ProfileCard authors={bbbb} />
          </div>
          <div className=" bg-white w-auto h-52 mt-10" />
        </div>
      </main>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const app = await fetchApp();
  const { categorys } = await fetchCategorys();
  const { tags } = await fetchTags();
  const { authors } = await fetchAuthors();
  const { archives } = await fetchArchives();
  const { articles, total } = await fetchArticles();
  return {
    props: {
      app,
      categorys,
      tags,
      authors,
      archives,
      articles,
      total,
    },
  };
};

export default Top;
