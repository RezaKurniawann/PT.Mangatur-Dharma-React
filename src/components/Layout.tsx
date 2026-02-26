import { ReactNode } from "react";
import Header from "./Header";
import BackToTop from "./BackToTop";
import "lenis/dist/lenis.css";
import { useLenisStore } from "@/hooks/use-lenis-store";
import ReactLenis from "lenis/react";
import { ScrollToTop } from "./ScrollToTop";
import { Footer } from "./Footer";
import { TooltipProvider } from "./ui/tooltip";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const smoothScroll = useLenisStore((state) => state.smoothScroll);

  return (
    <ReactLenis root options={{ smoothWheel: smoothScroll }}>
      <div className="flex flex-col min-h-screen bg-background bg-gradient-to-t from-[#8EE2FF] via-[#ffffff] to-white">
        <Header />
        <main className="flex-grow mb-10">
          <TooltipProvider>{children}</TooltipProvider>
        </main>
        <Footer />
        <ScrollToTop />
        <BackToTop />
      </div>
    </ReactLenis>
  );
};

export default Layout;
