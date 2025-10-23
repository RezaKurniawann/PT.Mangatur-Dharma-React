import { useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-900 p-4">
      <div className="text-center max-w-lg mx-auto">
        <h1 className="text-6xl md:text-8xl font-extrabold text-[#003138] mb-4 animate-pulse">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Halaman Tidak Ditemukan</h2>
        <p className="text-lg md:text-xl text-gray-400 mb-8">Halaman yang Anda cari saat ini sedang dalam tahap pengembangan.</p>
        <Link to="/" className="inline-block px-8 py-3 bg-[#003138] text-white font-semibold rounded-full shadow-lg hover:bg-[#003138]/80 transition duration-300">
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
