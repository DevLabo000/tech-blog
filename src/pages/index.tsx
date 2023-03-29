import Link from 'next/link';

import { AppMeta, Content } from 'newt-client-js';

import type { Article } from '@/types/article';

import { Layout } from '@/components/base/Layout';
import { fetchApp, fetchArchives, fetchArticles, fetchAuthors, fetchCategorys, fetchTags } from '@/lib/api';
// import { Author } from '@/types/author';
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

export const Top = (props: TopProps) => {
  const { app, articles } = props;
  return (
    <Layout app={app} header={<title>Newt・Next.jsブログ</title>} subheader={<title>Newt・Next.jsブログ</title>}>
      <main>
        <ul>
          {articles.map((article) => (
            <li key={article.id}>
              <Link href={`article/${article.slug}`}>{article.title}</Link>
            </li>
          ))}
        </ul>
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
