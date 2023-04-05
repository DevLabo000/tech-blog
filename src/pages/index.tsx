/* eslint no-underscore-dangle:0 no-shadow:0 */

import { AppMeta, Content } from 'newt-client-js';

import { Home } from '@/components/base/Home';
import { Layout } from '@/components/base/Layout';
import { ArticleCard } from '@/components/ui/ArticleCard';
import { ProfileCard } from '@/components/ui/ProfileCard';
import { fetchApp, fetchArchives, fetchArticles, fetchAuthors, fetchCategorys, fetchTags } from '@/lib/api';
import { Article } from '@/types/article';
import { Author } from '@/types/author';
// import { Tag } from '@/types/tag';

export type TopProps = {
  /* eslint react/require-default-props: 0 */
  app: AppMeta;
  // categorys: (Content & Category & { total: number })[];
  // tags: (Content & Tag & { total: number })[];
  author: Content & Author;
  // archives: Archive[];
  articles: (Content & Article)[];
  // total: number;
  // page?: number;
  // tagSlug?: string;
  // authorSlug?: string;
  // year?: number;
};

export const Top = (props: TopProps) => {
  const { app, articles, author } = props;
  return (
    <Layout
      app={app}
      meta={{
        title: app.name,
        siteName: app.name,
        description: app.name,
        ogImage: app.cover?.value,
        favicon: app.icon?.value,
      }}
    >
      <Home
        side={
          <div>
            <ProfileCard authors={author} />
          </div>
        }
      >
        <>
          {articles.map((article) => (
            <ArticleCard article={article} key={article._id} />
          ))}
        </>
      </Home>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const app = await fetchApp();
  const { categorys } = await fetchCategorys();
  const { tags } = await fetchTags();
  const { author } = await fetchAuthors();
  const { archives } = await fetchArchives();
  const { articles, total } = await fetchArticles();
  return {
    props: {
      app,
      categorys,
      tags,
      author,
      archives,
      articles,
      total,
    },
  };
};

export default Top;

/*
      <main className="md:flex md:flex-wrap md:justify-center">
        <div className="bg-white rounded-md md:w-1/2">
          {articles.map((article) => (
            <ArticleCard article={article} key={article._id} />
          ))}
        </div>
        <div className="mt-10 md:mt-0 md:ml-10 rounded-md md:w-1/5">
          <div className=" bg-white">
            <ProfileCard authors={bbbb} />
          </div>
          <Tag title="aaaaaa" />
          <Category title="bbbb" />
          <div className=" bg-white w-auto h-52 mt-10" />
        </div>
      </main>
*/
