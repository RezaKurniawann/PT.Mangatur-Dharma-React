import { ReactNode } from "react";
import Header from "./Header";
import BackToTop from "./BackToTop";
import "lenis/dist/lenis.css";
import { useLenisStore } from "@/hooks/use-lenis-store";
import ReactLenis from "lenis/react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const smoothScroll = useLenisStore((state) => state.smoothScroll);

  return (
    <ReactLenis root options={{ smoothWheel: smoothScroll }}>
      <div className="flex flex-col min-h-screen bg-background bg-gradient-to-t from-[#8EE2FF] via-[#ffffff] to-white">
        <Header />
        <main className="flex-grow">{children}</main>
        <footer className="bg-[#003138] text-white text-center py-4 mt-12">
          <p>
            &copy; 2025 <b>PT Mangatur Dharma</b>
          </p>
        </footer>
        <BackToTop />
      </div>
    </ReactLenis>
  );
};

export default Layout;
