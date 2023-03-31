import { Content } from 'newt-client-js';

import { Author } from './author';
import { Category } from './category';
import { Tag } from './tag';

export interface Article {
  id: string;
  title: string;
  slug: string;
  meta: {
    title: string;
    description: string;
    ogImage: { src: string };
  };
  body: string;
  coverImage: { src: string };
  author: Content & Author;
  tags: (Content & Tag)[];
  category: Content & Category;
}

export type Archive = { year: number; count: number };
