import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import TentangPerusahaan from './pages/TentangPerusahaan';
import JejakLangkah from './pages/JejakLangkah';
import VisiMisi from './pages/VisiMisi';
import Kontak from './pages/Kontak';
import Penghargaan from './pages/news/Penghargaan';
import Aktifitas from './pages/news/Aktifitas';
import Artikel from './pages/news/Artikel';
import DaftarPelanggan from './pages/news/DaftarPelanggan';
import OurCategory from './pages/our-category';
import Test from './pages/test-page';
import HVAC from './pages/produk/hvac';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tentang-perusahaan" element={<TentangPerusahaan />} />
          <Route path="/jejak-langkah" element={<JejakLangkah />} />
          <Route path="/visi-misi" element={<VisiMisi />} />
          <Route path="/kontak" element={<Kontak />} />
          <Route path="/our-category" element={<OurCategory />} />
          <Route path="/penghargaan" element={<Penghargaan />} />
          <Route path="/aktifitas" element={<Aktifitas />} />
          <Route path="/artikel" element={<Artikel />} />
          <Route path="/daftar-pelanggan" element={<DaftarPelanggan />} />
          <Route path="/test-page" element={<Test />} />
          <Route path="/hvac" element={<HVAC />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
