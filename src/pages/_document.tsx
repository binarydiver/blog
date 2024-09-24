import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased break-keep bg-zinc-100 prose prose-zinc dark:bg-zinc-950 dark:prose-invert max-w-full">
        <Main />
        <NextScript />
        <Script src="/scripts/theme.js" strategy="beforeInteractive" />
      </body>
    </Html>
  );
}
