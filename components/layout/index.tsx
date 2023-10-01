import { FC } from 'react';
import Footer from '../footer';
import Navigation from '../navigation';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navigation title="The Blog Title" />
      <main className="max-w-5xl mx-auto prose dark:prose-invert">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
