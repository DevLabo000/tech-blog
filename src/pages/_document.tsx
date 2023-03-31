import Document, { Head, Html, Main, NextScript } from 'next/document';

// eslint-disable-line import/no-extraneous-dependencies

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ja">
        <Head>
          <meta name="viewport" content="width=device-width,initial-scale=1" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
