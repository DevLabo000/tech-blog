/* eslint no-underscore-dangle:0 no-shadow:0 */
/* eslint-disable */

import { Content, createClient } from 'newt-client-js';

import { Archive, Article } from '@/types/article';
import { Author } from '@/types/author';
import { Category } from '@/types/category';
import { Tag } from '@/types/tag';

const client = createClient({
  spaceUid: process.env.NEXT_PUBLIC_NEWT_SPACE_UID,
  token: process.env.NEXT_PUBLIC_NEWT_API_TOKEN,
  apiType: process.env.NEXT_PUBLIC_NEWT_API_TYPE as 'cdn' | 'api',
});

// Newt CDN APIのクライアント（公開コンテンツのみ取得）
const newtCdnClient = createClient({
  spaceUid: process.env.NEXT_PUBLIC_NEWT_SPACE_UID,
  token: process.env.NEXT_PUBLIC_NEWT_API_TOKEN,
  apiType: 'cdn',
});

// Newt APIのクライアント（全コンテンツ取得）
const newtApiClient = createClient({
  spaceUid: process.env.NEXT_PUBLIC_NEWT_SPACE_UID,
  token: process.env.NEXT_PUBLIC_NEWT_API_PREVIEW_TOKEN,
  apiType: 'api',
});

export async function getArticleBySlug(slug: string, preview: boolean): Promise<(Content & Article) | null> {
  const client = preview ? newtApiClient : newtCdnClient;
  const article = await client.getFirstContent<Content & Article>({
    appUid: process.env.NEXT_PUBLIC_NEWT_APP_UID,
    modelUid: process.env.NEXT_PUBLIC_NEWT_ARTICLE_MODEL_UID,
    query: { slug },
  });
  return article;
}

export const fetchApp = async () => {
  const app = await client.getApp({
    appUid: process.env.NEXT_PUBLIC_NEWT_APP_UID,
  });
  return app;
};

export const fetchCategorys = async () => {
  const { items, total } = await client.getContents<Content & Category>({
    appUid: process.env.NEXT_PUBLIC_NEWT_APP_UID,
    modelUid: process.env.NEXT_PUBLIC_NEWT_CATEGORY_MODEL_UID,
    query: {
      depth: 1,
    },
  });

  const categorys: (Content & Category & { total: number })[] = [];

  await items.reduce(async (prevPromise, category) => {
    await prevPromise;
    const { total } = await client.getContents({
      appUid: process.env.NEXT_PUBLIC_NEWT_APP_UID,
      modelUid: process.env.NEXT_PUBLIC_NEWT_ARTICLE_MODEL_UID,
      query: {
        category: category._id,
        select: ['slug'],
      },
    });
    categorys.push({ ...category, total });
  }, Promise.resolve());

  return {
    categorys,
    total,
  };
};

export const fetchTags = async () => {
  const { items, total } = await client.getContents<Content & Tag>({
    appUid: process.env.NEXT_PUBLIC_NEWT_APP_UID,
    modelUid: process.env.NEXT_PUBLIC_NEWT_TAG_MODEL_UID,
    query: {
      depth: 1,
    },
  });

  const tags: (Content & Tag & { total: number })[] = [];

  // Get the number of articles per tag
  await items.reduce(async (prevPromise, tag) => {
    await prevPromise;
    const { total } = await client.getContents({
      appUid: process.env.NEXT_PUBLIC_NEWT_APP_UID,
      modelUid: process.env.NEXT_PUBLIC_NEWT_ARTICLE_MODEL_UID,
      query: {
        tags: tag._id,
        select: ['slug'],
      },
    });
    tags.push({ ...tag, total });
  }, Promise.resolve());

  return {
    tags,
    total,
  };
};

export const fetchArticles = async (options?: {
  query?: Record<string, any>;
  search?: string;
  tag?: string;
  category?: string;
  author?: string;
  year?: number;
  page?: number;
  limit?: number;
}) => {
  const { query, search, tag, category, author, year, page, limit } = options || {};
  const _query = {
    ...(query || {}),
  };
  if (search) {
    _query.or = [
      {
        title: {
          match: search,
        },
      },
      {
        body: {
          match: search,
        },
      },
    ];
  }
  if (category) {
    _query.category = category;
  }
  if (tag) {
    _query.tags = tag;
  }
  if (author) {
    _query.author = author;
  }
  if (year) {
    _query['_sys.createdAt'] = {
      gte: new Date(year.toString()).toISOString(),
      lt: new Date((year + 1).toString()).toISOString(),
    };
  }
  const _page = page || 1;
  const _limit = limit || Number(process.env.NEXT_PUBLIC_PAGE_LIMIT) || 10;
  const _skip = (_page - 1) * _limit;

  const { items, total } = await client.getContents<Content & Article>({
    appUid: process.env.NEXT_PUBLIC_NEWT_APP_UID,
    modelUid: process.env.NEXT_PUBLIC_NEWT_ARTICLE_MODEL_UID,
    query: {
      depth: 2,
      limit: _limit,
      skip: _skip,
      ..._query,
    },
  });

  return {
    articles: items,
    total,
  };
};

export const getPages = async (options?: { tag?: string; category?: string; author?: string; year?: number }) => {
  const { total } = await fetchArticles(options);
  const pages = Array(Math.ceil(total / Number(process.env.NEXT_PUBLIC_PAGE_LIMIT) || 10))
    .fill(true)
    .map((value, index) => ({
      number: index + 1,
    }));
  return pages;
};

export const fetchCurrentArticle = async (options: { slug: string }) => {
  const { slug } = options;
  if (!slug) return null;
  const article = await client.getFirstContent<Content & Article>({
    appUid: process.env.NEXT_PUBLIC_NEWT_APP_UID,
    modelUid: process.env.NEXT_PUBLIC_NEWT_ARTICLE_MODEL_UID,
    query: {
      depth: 2,
      slug,
    },
  });
  return article;
};

export const fetchPreviousArticle = async (options: { createdAt: string }): Promise<(Content & Article) | null> => {
  const { createdAt } = options;
  const article = await client.getFirstContent<Content & Article>({
    appUid: process.env.NEXT_PUBLIC_NEWT_APP_UID,
    modelUid: process.env.NEXT_PUBLIC_NEWT_ARTICLE_MODEL_UID,
    query: {
      depth: 1,
      select: ['slug'],
      order: ['-_sys.createdAt'],
      '_sys.createdAt': {
        lt: createdAt,
      },
    },
  });
  return article;
};

export const fetchNextArticle = async (options: { createdAt: string }): Promise<(Content & Article) | null> => {
  const { createdAt } = options;
  const article = await client.getFirstContent<Content & Article>({
    appUid: process.env.NEXT_PUBLIC_NEWT_APP_UID,
    modelUid: process.env.NEXT_PUBLIC_NEWT_ARTICLE_MODEL_UID,
    query: {
      depth: 1,
      select: ['slug'],
      order: ['_sys.createdAt'],
      '_sys.createdAt': {
        gt: createdAt,
      },
    },
  });
  return article;
};

/*
export const fetchAuthors = async () => {
  const { items, total } = await client.getContents<Content & Author>({
    appUid: process.env.NEXT_PUBLIC_NEWT_APP_UID,
    modelUid: process.env.NEXT_PUBLIC_NEWT_AUTHOR_MODEL_UID,
    query: {
      depth: 1,
    },
  });
  const authors: (Content & Author & { total: number })[] = [];

  // Get the number of articles per tag
  await items.reduce(async (prevPromise, author) => {
    await prevPromise;
    const { total } = await client.getContents({
      appUid: process.env.NEXT_PUBLIC_NEWT_APP_UID,
      modelUid: process.env.NEXT_PUBLIC_NEWT_ARTICLE_MODEL_UID,
      query: {
        author: author._id,
        select: ['slug'],
      },
    });
    authors.push({ ...author, total });
  }, Promise.resolve());

  return {
    authors,
    total,
  };
};
*/

export const fetchAuthors = async () => {
  const authors = await client.getContents<Content & Author>({
    appUid: process.env.NEXT_PUBLIC_NEWT_APP_UID,
    modelUid: process.env.NEXT_PUBLIC_NEWT_AUTHOR_MODEL_UID,
  });
  const author = authors.items[0];
  return { author };
};

export const fetchArchives = async () => {
  const archives: Archive[] = [];
  const oldestArticle = await client.getFirstContent<Content & Article>({
    appUid: process.env.NEXT_PUBLIC_NEWT_APP_UID,
    modelUid: process.env.NEXT_PUBLIC_NEWT_ARTICLE_MODEL_UID,
    query: {
      depth: 1,
      order: ['_sys.createdAt'],
      select: ['slug', '_sys.createdAt'],
    },
  });
  if (!oldestArticle) return { archives };

  let currentYear = new Date((oldestArticle && oldestArticle._sys.createdAt) || new Date()).getFullYear();
  const thisYear = new Date().getFullYear();

  while (currentYear <= thisYear) {
    archives.splice(0, 0, {
      year: currentYear,
      count: 0,
    });
    currentYear += 1;
  }
  await archives.reduce(async (prevPromise, archive) => {
    await prevPromise;
    const { total } = await client.getContents({
      appUid: process.env.NEXT_PUBLIC_NEWT_APP_UID,
      modelUid: process.env.NEXT_PUBLIC_NEWT_ARTICLE_MODEL_UID,
      query: {
        depth: 1,
        limit: 1,
        select: ['slug'],
        '_sys.createdAt': {
          gte: new Date(archive.year.toString()).toISOString(),
          lt: new Date((archive.year + 1).toString()).toISOString(),
        },
      },
    });
    archive.count = total;
  }, Promise.resolve());

  return {
    archives,
  };
};
