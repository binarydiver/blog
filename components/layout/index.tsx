import { FC } from 'react';
import Footer from '../footer';
import Navigation from '../navigation';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navigation title="binarydiver" />
      <main className="max-w-5xl mx-auto py-2">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
