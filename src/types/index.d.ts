declare module '*.svg' {
  const content: React.FC<React.SVGProps<SVGElement>>;
  export default content;
}

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_NEWT_SPACE_UID: string;
    readonly NEXT_PUBLIC_NEWT_APP_UID: string;
    readonly NEXT_PUBLIC_NEWT_API_TOKEN: string;
    readonly NEXT_PUBLIC_NEWT_API_PREVIEW_TOKEN: string;
    readonly NEXT_PUBLIC_NEWT_API_TYPE: string;
    readonly NEXT_PUBLIC_NEWT_ARTICLE_MODEL_UID: string;
    readonly NEXT_PUBLIC_NEWT_TAG_MODEL_UID: string;
    readonly NEXT_PUBLIC_NEWT_CATEGORY_MODEL_UID: string;
    readonly NEXT_PUBLIC_NEWT_AUTHOR_MODEL_UID: string;
    readonly NEXT_PUBLIC_PAGE_LIMIT: string;
    readonly NEXT_PUBLIC_PREVIEW_SECRET: string;
    readonly NEXT_PUBLIC_OG_IMAGE_DOMAIN: string;
  }
}
