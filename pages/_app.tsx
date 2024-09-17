import Giscus from '@giscus/react';
import { MarkdocNextJsPageProps } from '@markdoc/next.js';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import '../styles/globals.css';
import ArticleLayout from './_components/article-layout';
import RootLayout from './_components/root-layout';
import { BLOG_TITLE } from './_lib/constants';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps<MarkdocNextJsPageProps> & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ??
    (page => {
      const title = page.props.markdoc?.frontmatter.title ?? BLOG_TITLE;
      const description =
        page.props.markdoc?.frontmatter.description ??
        'Jason has been written his wisdom in here.';

      return (
        <RootLayout>
          <ArticleLayout title={title} description={description}>
            {page}
            <hr />
            {page.props.markdoc && (
              <Giscus
                id="comments"
                repo="binarydiver/blog"
                repoId="R_kgDOKadjUA"
                category="Q&A"
                categoryId="DIC_kwDOKadjUM4CiUIo"
                mapping="pathname"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="bottom"
                theme="dark"
                lang="en"
                loading="lazy"
              />
            )}
          </ArticleLayout>
        </RootLayout>
      );
    });

  return getLayout(<Component {...pageProps} />);
}
