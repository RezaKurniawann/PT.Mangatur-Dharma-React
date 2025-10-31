import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TentangPerusahaan from "./pages/TentangPerusahaan";
import JejakLangkah from "./pages/JejakLangkah";
import VisiMisi from "./pages/VisiMisi";
import Kontak from "./pages/Kontak";
import Penghargaan from "./pages/news/Penghargaan";
import DaftarPelanggan from "./pages/news/DaftarPelanggan";
import OurCategory from "./pages/our-category";
import Test from "./pages/test-page";
import ProductCategory from "./pages/produk/ProductCategory";
import ContentPage from "./pages/news/Content";
import MoreContentPage from "./pages/news/MoreContent";
import ContentDetail from "./pages/news/ContentDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/profil/tentang-perusahaan"
            element={<TentangPerusahaan />}
          />
          <Route path="/profil/jejak-langkah" element={<JejakLangkah />} />
          <Route path="/profil/visi-misi" element={<VisiMisi />} />
          <Route path="/kontak" element={<Kontak />} />
          <Route path="/area-bisnis" element={<OurCategory />} />
          <Route path="/berita/penghargaan" element={<Penghargaan />} />
          <Route
            path="/berita/daftar-pelanggan"
            element={<DaftarPelanggan />}
          />
          {/* <Route path="/test-page" element={<Test />} /> */}
          <Route path="/produk/:categorySlug" element={<ProductCategory />} />

          <Route path="/berita/:type" element={<ContentPage />} />
          <Route path="/berita/:type/more" element={<MoreContentPage />} />
          <Route path="/berita/:type/detail/:id" element={<ContentDetail />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
