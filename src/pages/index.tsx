import Head from 'next/head';
import Link from 'next/link';

import type { Article } from '@/types/article';

import { fetchArticles } from '@/lib/api';

const Home = ({ articles }: { articles: Article[] }) => (
  <>
    <Head>
      <title>Newt・Next.jsブログ</title>
      <meta name="description" content="NewtとNext.jsを利用したブログです" />
    </Head>
    <main>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <Link href={`articles/${article.slug}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  </>
);

export const getStaticProps = async () => {
  const { articles } = await fetchArticles();
  return {
    props: {
      articles,
    },
  };
};

export default Home;
