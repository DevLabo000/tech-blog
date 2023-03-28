import { css as cssImport } from '@emotion/react'; // eslint-disable-line import/no-extraneous-dependencies
import styledImport from '@emotion/styled'; // eslint-disable-line import/no-extraneous-dependencies
import 'twin.macro'; // eslint-disable-line import/no-extraneous-dependencies

declare module 'twin.macro' {
  const styled: typeof styledImport;
  const css: typeof cssImport;
}
