import { FC, PropsWithChildren } from 'react';
import { BLOG_TITLE } from '../../_lib/constants';
import Footer from './footer';
import Header from './header';

interface ArticleLayoutProps extends PropsWithChildren {}

const ArticleLayout: FC<ArticleLayoutProps> = props => {
  const { children } = props;

  return (
    <div className="flex flex-col h-screen">
      <Header title={BLOG_TITLE} />
      <main className="max-w-screen-lg mx-auto w-full p-4">{children}</main>
      <Footer />
    </div>
  );
};

export default ArticleLayout;
