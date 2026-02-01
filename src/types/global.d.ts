// Use type safe message keys
// https://next-intl.dev/docs/workflows/typescript

import hu from '../../messages/hu.json';

type Messages = typeof hu;

declare global {
  // Use type safe message keys with `auto-completion`

  interface IntlMessages extends Messages {}
}
