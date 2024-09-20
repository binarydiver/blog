import { Noto_Sans_KR } from 'next/font/google';
import Head from 'next/head';
import { FC } from 'react';

const notoSansKr = Noto_Sans_KR({ subsets: ['latin'] });

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout: FC<RootLayoutProps> = props => {
  const { children } = props;

  return (
    <div className={notoSansKr.className}>
      <Head>
        <link rel="icon" type="image/x-icon" href={`/favicon.ico`} />

        <meta name="author" content="Jason Park, jason@binarydiver.com" />
        <meta name="color-scheme" content="dark light" />
        <meta
          key="keywords"
          name="keywords"
          content="binarydiver, programming, it, tech, software"
        />

        <meta key="og:title" name="og:title" content="Jason's Wisdom | Home" />
        <meta
          key="og:description"
          name="og:description"
          content="Jason write his wisdom in here."
        />
        <meta
          key="og:url"
          name="og:url"
          content="https://blog.binarydiver.com"
        />
        <meta name="og:site_name" content="Jason's Wisdom" />
      </Head>
      {children}
    </div>
  );
};

export default RootLayout;

export const revalidate = 3600;
