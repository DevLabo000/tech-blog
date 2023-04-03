/* eslint no-underscore-dangle:0 no-shadow:0 */
/* eslint-disable */

import SnsShare from '@/components/ui/SnsShare';
import { load } from 'cheerio';
import hljs from 'highlight.js';
import { AppMeta, Content } from 'newt-client-js';
import Image from 'next/image';
import { useEffect } from 'react';
import tocbot from 'tocbot';

import { Layout } from '@/components/base/Layout';
import { fetchApp, fetchArticles, getArticleBySlug } from '@/lib/api';
import { Article } from '@/types/article';

export type ArticlePageProps = {
  app: AppMeta;
  currentArticle: Content & Article;
  highlightedBody: string;
};

export const ArticlePage = (props: ArticlePageProps) => {
  const { app, currentArticle, highlightedBody } = props;

  useEffect(() => {
    tocbot.init({
      tocSelector: '.toc',
      contentSelector: 'body',
      headingSelector: 'h2, h3',
    });
    return () => tocbot.destroy();
  }, [highlightedBody]);

  /*
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
  currentArticle.body = $.html();
*/

  const yyyy = currentArticle._sys.createdAt.substring(0, 4);
  const mm = currentArticle._sys.createdAt.substring(5, 7);
  const dd = currentArticle._sys.createdAt.substring(8, 10);
  const mmdd = `${mm}/${dd}`;

  return (
    <Layout app={app} meta={{ description: 'aaaa', ogImage: 'a' }}>
      <div className="md:flex md:flex-wrap md:justify-center">
        <main className="bg-white rounded-md md:w-2/3 p-5 md:p-10">
          <div className="flex flex-wrap w-auto mb-5">
            <div className="border-r">
              <div className="text-gray-500 text-center mr-3">
                <p className="text-xs">{yyyy}</p>
                <p className="text-md">{mmdd}</p>
              </div>
            </div>
            <h1 className="px-3 w-auto text-bold text-xl">{currentArticle.title}</h1>
          </div>

          {/* 
            <ul className="">
              {currentArticle.tags.map((tag) => (
                <li key={tag._id}>
                  <Link href={`/tag/${tag.slug}`}>#{tag.name}</Link>
                </li>
              ))}
            </ul>
            */}
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
        </main>
        <aside className="ml-10 w-1/5 hidden sm:hidden md:hidden lg:block xl:block">
          <div className="sticky top-12 bg-white p-5 md:p-10 rounded-md">
            <div className="">
              <p className="text-lg pb-3 font-bold">目次</p>
              <nav className="toc" />
            </div>
          </div>
        </aside>
      </div>
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

  return {
    props: {
      app,
      currentArticle,
      highlightedBody: $.html(),
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

/*
export default function ArticlePage({
  app,
  currentArticle,
  prevArticle,
  nextArticle,
}: {
  app: AppMeta;
  currentArticle: (Content & Article) | null;
  prevArticle: (Content & Article) | null;
  nextArticle: (Content & Article) | null;
}) {
  /*
  const meta = useMemo(() => {
    if (currentArticle?.meta) {
      return currentArticle.meta;
    }
    return null;
  }, [currentArticle]);

  const title = useMemo(() => {
    if (meta?.title) {
      return meta.title;
    }
    if (currentArticle?.title) {
      return currentArticle.title;
    }
    return app.name || app.uid || '';
  }, [app, meta, currentArticle?.title]);

  const description = useMemo(() => {
    if (meta?.description) {
      return meta.description;
    }
    if (currentArticle?.body) {
      return htmlToText(currentArticle.body, {
        selectors: [{ selector: 'img', format: 'skip' }],
      }).slice(0, 200);
    }
    return '';
  }, [meta, currentArticle?.body]);

  const ogImage = useMemo(() => {
    if (meta?.ogImage) {
      return meta.ogImage.src;
    }
    if (currentArticle?.author?.profileImage) {
      return currentArticle.author.profileImage.src;
    }
    return '';
  }, [meta?.ogImage, currentArticle?.author]);

  const authorName = useMemo(() => currentArticle?.author?.fullName || 'NO NAME', [currentArticle?.author?.fullName]);

  const publishDate = useMemo(
    () => (currentArticle?._sys?.createdAt ? formatDate(currentArticle._sys.createdAt) : ''),
    [currentArticle?._sys?.createdAt]
  );

  const body = useMemo(() => {
    if (currentArticle?.body) {
      return {
        __html: currentArticle.body,
      };
    }
    return {
      __html: '',
    };
  }, [currentArticle?.body]);

  const authorBio = useMemo(() => {
    if (currentArticle?.author?.biography) {
      return {
        __html: currentArticle.author.biography,
      };
    }
    return {
      __html: '',
    };
  }, [currentArticle?.author?.biography]);

  const shareOnTwitter = useCallback(() => {
    window.open(
      `https://twitter.com/share?url=${encodeURIComponent(window.location.href)}&text=${document.title}`,
      '',
      'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600'
    );
  }, []);

  const shareOnFacebook = useCallback(() => {
    window.open(
      `//www.facebook.com/sharer.php?src=bm&u=${encodeURIComponent(location.href)}`,
      '_blank',
      'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600'
    );
  }, []);
 
  return (
    <Layout app={app}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.Container}>
        <article className={styles.Article} />
      </main>
    </Layout>
  );
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const app = await fetchApp();
  const currentArticle = await fetchCurrentArticle({ slug });
  const prevArticle = currentArticle ? await fetchPreviousArticle({ createdAt: currentArticle._sys.createdAt }) : null;
  const nextArticle = currentArticle ? await fetchNextArticle({ createdAt: currentArticle._sys.createdAt }) : null;

  return {
    props: {
      app,
      currentArticle,
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
 */
