import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html>
      <Head></Head>
      <body>
        <Main />
        <NextScript />
        <Script src="/scripts/theme.js" strategy="beforeInteractive" />
      </body>
    </Html>
  );
}
