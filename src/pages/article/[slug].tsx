/* eslint no-underscore-dangle:0 no-shadow:0 */
/* eslint-disable */

import { AppMeta, Content } from 'newt-client-js';

import { fetchApp, fetchArticles, getArticleBySlug } from '@/lib/api';
import { Article } from '@/types/article';

export type ArticlePageProps = {
  app: AppMeta;
  currentArticle: Content & Article;
};

export const ArticlePage = (props: ArticlePageProps) => {
  const { app, currentArticle } = props;
  return (
    <div>
      <div>{app.name}</div>
      <main>{currentArticle.body}</main>
    </div>
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

  return {
    props: {
      app,
      currentArticle,
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
