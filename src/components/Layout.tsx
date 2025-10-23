import { ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-background bg-gradient-to-t from-[#8EE2FF] via-[#ffffff] to-white">
      <Header />
      <main className="flex-grow">{children}</main>
      <footer className="bg-[#003138] text-white text-center py-4 mt-12 ">
        <p>
          &copy; 2025 <b>PT Mangatur Dharma</b>
        </p>
      </footer>
    </div>
  );
};

export default Layout;
