import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href="./favicon.ico" />
      </Head>
      <body className="antialiased bg-zinc-100 prose prose-zinc dark:bg-zinc-950 dark:prose-invert max-w-full">
        <Main />
        <NextScript />
        <Script src="./scripts/theme.js" strategy="beforeInteractive" />
      </body>
    </Html>
  );
}
