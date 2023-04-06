/* eslint-disable */
import { load } from 'cheerio';
import hljs from 'highlight.js';
import { AppMeta, Content } from 'newt-client-js';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import tocbot from 'tocbot';

import { Home } from '@/components/base/Home';
import { Layout } from '@/components/base/Layout';
import SnsShare from '@/components/ui/SnsShare';
import { fetchApp, fetchArticles, fetchNextArticle, fetchPreviousArticle, getArticleBySlug } from '@/lib/api';
import ChevronLeft from '@/public/chevron-left.svg';
import ChevronRigth from '@/public/chevron-right.svg';
import { Article } from '@/types/article';

export type ArticlePageProps = {
  app: AppMeta;
  currentArticle: Content & Article;
  highlightedBody: string;
  prevArticle: Content & Article;
  nextArticle: Content & Article;
};

export const ArticlePage = (props: ArticlePageProps) => {
  const { app, currentArticle, highlightedBody, prevArticle, nextArticle } = props;
  const router = useRouter();
  useEffect(() => {
    tocbot.init({
      tocSelector: '.toc',
      contentSelector: 'body',
      headingSelector: 'h2, h3',
    });
    return () => tocbot.destroy();
  }, [highlightedBody]);

  const yyyy = currentArticle._sys.createdAt.substring(0, 4);
  const mm = currentArticle._sys.createdAt.substring(5, 7);
  const dd = currentArticle._sys.createdAt.substring(8, 10);
  const mmdd = `${mm}/${dd}`;

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
          <>
            <p className="text-lg pb-3 font-bold">目次</p>
            <nav className="toc" />
          </>
        }
      >
        <div className="p-5 md:p-10">
          <div className="flex flex-wrap w-auto mb-5">
            <div className="border-r">
              <div className="text-gray-500 text-center mr-3">
                <p className="text-xs">{yyyy}</p>
                <p className="text-md">{mmdd}</p>
              </div>
            </div>
            <h1 className="px-3 w-auto text-bold text-xl">{currentArticle.title}</h1>
          </div>
          <div className="flex justify-center bg-red-50 rounded-3xl overflow-hidden mb-5">
            <Image
              src={currentArticle.coverImage.src}
              alt="tete"
              style={{
                width: '40%',
                height: 'auto',
              }}
              width={1980}
              height={1150}
              sizes="100vw"
            />
          </div>
          <SnsShare />
          <div className="prose text-black mt-5 w-auto" dangerouslySetInnerHTML={{ __html: highlightedBody }} />

          <div className="md:flex md:justify-between mt-10">
            <div className="md:w-1/2 h-16 my-auto flex justify-start">
              {nextArticle && (
                <div className="inline-flex">
                  <button
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white rounded-l hover:text-gray-800"
                    onClick={() => router.push(`/article/${nextArticle.slug}`)}
                  >
                    <ChevronLeft width={20} height={20} />
                    次の記事へ
                  </button>
                </div>
              )}
            </div>
            <div className="md:w-1/2 h-16 my-auto flex justify-end">
              {prevArticle && (
                <div className="inline-flex">
                  <button
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white rounded-l hover:text-gray-800"
                    onClick={() => router.push(`/article/${prevArticle.slug}`)}
                  >
                    前の記事
                    <ChevronRigth width={20} height={20} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Home>
    </Layout>
  );
};

type Context = {
  params: {
    slug: string;
  };
  preview?: boolean;
};

export async function getStaticProps(context: Context) {
  const { params, preview = false } = context;
  const app = await fetchApp();
  const currentArticle = await getArticleBySlug(params.slug, preview);
  if (!currentArticle) {
    return;
  }

  const $ = load(currentArticle.body, { decodeEntities: false });
  $('h1, h2').each((index, elm) => {
    const headerText = $(elm).text();
    $(elm).contents().wrap(`<a id="${headerText}" href="#${headerText}"></a>`); // ④
  });
  $('h2, h3').each((index, elm) => {
    $(elm).html();
    $(elm).addClass('headings');
    $(elm).attr('id', `${index}`);
  });
  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value); // リッチエディタ内のタグ付きhtml文字列を挿入
    $(elm).addClass('hljs'); // クラス名に'hljs'を追記
  });

  const prevArticle = currentArticle ? await fetchPreviousArticle({ createdAt: currentArticle._sys.createdAt }) : null;
  const nextArticle = currentArticle ? await fetchNextArticle({ createdAt: currentArticle._sys.createdAt }) : null;

  return {
    props: {
      app,
      currentArticle,
      highlightedBody: $.html(),
      prevArticle,
      nextArticle,
    },
  };
}

export async function getStaticPaths() {
  const { articles } = await fetchArticles({
    limit: 1000,
  });
  return {
    paths: articles.map((article) => ({
      params: {
        slug: article.slug,
      },
    })),
    fallback: 'blocking',
  };
}

export default ArticlePage;
