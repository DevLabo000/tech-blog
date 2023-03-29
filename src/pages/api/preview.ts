/* eslint no-underscore-dangle:0 no-shadow:0 */
/* eslint-disable */

import { getArticleBySlug } from '../../lib/api';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // secretを検証する、slugパラメータの有無を検証する
  if (req.query.secret !== process.env.NEXT_PUBLIC_PREVIEW_SECRET || !req.query.slug) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // slugと対応するコンテンツがあるか検証する
  const article = await getArticleBySlug(`${req.query.slug}`, true);
  if (!article) {
    return res.status(401).json({ message: 'Invalid slug' });
  }

  // Cookieを設定し、プレビューモードを有効にする
  res.setPreviewData({});

  // 取得した情報からパスを指定してリダイレクトする
  res.redirect(`/article/${article.slug}`);
}
