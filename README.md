# Tech-Blog

## 環境構築

構築手順メモ

### Next.jsインストール

```sh
npx create-next-app tech-blog --typescript
```

### StoryBookインストール

```sh
npx sb init
```

`yarn storybook`起動時にエラーが出た場合以下の内容を追加。

```sh
# package.json
"build-storybook": "cross-env NODE_OPTIONS=--openssl-legacy-provider build-storybook"
"resolutions": {
 "@storybook/react-docgen-typescript-plugin": "1.0.6--canary.9.cd77847.0"
}
```

node_modeules 削除後、`yarn install`して再度`yarn storybook`で起動できればよい。

src フォルダ作成`pages,styles`をフォルダごと src 配下に移動

### ESLint の設定

```sh
npm init @eslint/config
```

以下のように設定していく

```sh
? How would you like to use ESLint? …
  To check syntax only
  To check syntax and find problems
▸ To check syntax, find problems, and enforce code style

? What type of modules does your project use? …
▸ JavaScript modules (import/export)
  CommonJS (require/exports)
  None of thes

? Which framework does your project use? …
▸ React
  Vue.js
  None of these

? Does your project use TypeScript? ‣ No / Yes
▸ Yes

? Where does your code run? …  (Press <space> to select, <a> to toggle all, <i> to invert selection)
✔ Browser
✔ Node
▸ Browser

? How would you like to define a style for your project? …
▸ Use a popular style guide
  Answer questions about your style

? Which style guide do you want to follow? …
▸ Standard: https://github.com/standard/eslint-config-standard-with-typescript
  XO: https://github.com/xojs/eslint-config-xo-typescript

? What format do you want your config file to be in? …
▸ JavaScript
  YAML
  JSON

✔ Would you like to install them now? · No / Yes
▸ Yes
```

AriBnbのコード規約を適応するため以下のパッケージを削除

```sh
yarn remove eslint-config-standard-with-typescript
```

AriBnbの規約を適応するため、以下のパッケージを追加

```sh
yarn add -D @typescript-eslint/parser eslint-config-{airbnb,airbnb-typescript,prettier} eslint-plugin-{react-hooks,jsx-a11y}
```

インポート順番をチェックするため以下のパッケージを追加

```sh
yarn add -D eslint-plugin-{import,unused-imports}
```

保存時に整形するため、以下のパッケージを追加

```sh
yarn add -D prettier
```

`.prettierrc.js`ファイルを作成し、以下のように設定を実施

```sh
# .prettierrc.js
module.exports = {
  printWidth: 120, //1行の文字列を120文字にする
  singleQuote: true, //ダブルに代わりシングルクオーテーションを使う
  semi: true, //行末にセミコロンを追加
  trailingComma: 'es5', //複数行の場合は可能な限り末尾のカンマを表示
  tabWidth: 2, //タグのスペース２ デフォルトは2
  useTabs: false, //スペースをタブに代える デフォルトはfalse
};
```

### lint-staged,husky追加

パッケージインストール

```sh
yarn add -D husky lint-staged
```

`package.json`に設定を追加します。

```sh
# package.json
"lint-staged": {
  "src/**/*.{js,ts,tsx}": [
    // 警告1件でもあればエラー
    "yarn eslint --max-warnings 0",
    "yarn prettier -w"
  ]
}
```

以下のコマンドを実行して、husky の実行ファイルを用意します。

```sh
yarn husky install
```

commit前にlint-stagedのコマンドが実行されるように設定を追加します。

```sh
# .husky/pre-commit
. "$(dirname -- "$0")/_/husky.sh"

yarn lint-staged
```

`husky install`が適宜実行されるように`package.json`にスクリプトを追加しておきます。

```sh
# package.json
"scripts": {
  "prepare": "husky install",    
}
```

### hygenのインストール

```sh
yarn add -D hygen
```

テンプレート作成

```sh
yarn run hygen init self
```

以下の構成になっていることを確認

```
_templates/
├── generator
│   ├── help
│   │   └── index.ejs.t
│   ├── new
│   │   └── hello.ejs.t
│   └── with-prompt
│       ├── hello.ejs.t
│       └── prompt.ejs.t
└── init
    └── repo
        └── new-repo.ejs.t

```

### dotenv

```sh
yarn add dotenv
```

### emotion

```sh
yarn add @emotion/react @emotion/styled @emotion/css @emotion/server
```


### tailwind macro

```
yarn add -D twin.macro tailwindcss postcss@latest autoprefixer@latest @emotion/babel-plugin babel-plugin-macros
```

## 参考情報

https://zenn.dev/thyt_lab/articles/9d2fe951e48906#prettier%E8%BF%BD%E5%8A%A0

https://yumegori.com/vscode_react_typescript_eslint_prettier#chapter-2

https://zenn.dev/junseinagao/articles/eb1d550faeae62#twin.macro

https://qiita.com/knjname/items/0223a7dc5eff1ef82e0b

https://qiita.com/pirosikick/items/0a7e85b3d347e77c0df1

https://yumeno.me/reacct-tailwind-emotion2/

## Newtパッケージ追加

```sh
yarn add newt-client-js
```

型定義を追加

```json
# index.d.ts
declare module '*.svg' {
  const content: React.FC<React.SVGProps<SVGElement>>;
  export default content;
}

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_NEWT_SPACE_UID: string;
    readonly NEXT_PUBLIC_NEWT_APP_UID: string;
    readonly NEXT_PUBLIC_NEWT_API_TOKEN: string;
    readonly NEXT_PUBLIC_NEWT_API_TYPE: string;
    readonly NEXT_PUBLIC_NEWT_ARTICLE_MODEL_UID: string;
    readonly NEXT_PUBLIC_NEWT_TAG_MODEL_UID: string;
    readonly NEXT_PUBLIC_NEWT_CATEGORY_MODEL_UID: string;
    readonly NEXT_PUBLIC_NEWT_AUTHOR_MODEL_UID: string;
    readonly NEXT_PUBLIC_PAGE_LIMIT: string;
  }
}
```