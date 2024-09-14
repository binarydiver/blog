import Head from 'next/head';
import { FC } from 'react';
import { BLOG_TITLE } from '../../_lib/constants';
import Footer from '../footer';
import Header from '../header';

type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

const Layout: FC<LayoutProps> = props => {
  const { children, title } = props;

  return (
    <div className="flex flex-col h-screen">
      <Head>
        <title>{title}</title>
      </Head>
      <Header title={BLOG_TITLE} />
      <main className="max-w-screen-lg mx-auto w-full p-4">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

export const revalidate = 3600;
