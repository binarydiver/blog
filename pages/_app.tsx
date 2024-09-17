import Giscus from '@giscus/react';
import { MarkdocNextJsPageProps } from '@markdoc/next.js';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import '../styles/globals.css';
import ArticleLayout from './_components/article-layout';
import Meta from './_components/meta';
import RootLayout from './_components/root-layout';

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
      const frontMatter = page.props.markdoc?.frontmatter;

      return (
        <RootLayout>
          <ArticleLayout>
            <Meta matter={frontMatter} />
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
