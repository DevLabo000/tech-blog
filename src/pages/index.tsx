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
      <Home side={<ProfileCard authors={author} />}>
        <>
          {articles.map((article) => (
            // eslint-disable-next-line no-underscore-dangle
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
