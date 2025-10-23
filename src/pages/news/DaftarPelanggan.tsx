import Layout from '@/components/Layout';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const DaftarPelanggan = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 0,
    cssEase: 'linear',
    pauseOnHover: false,
    rtl: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  // Buat array logo
  const logoList = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    src: `/assets/img/pelanggan/logo-${(i % 10) + 1}.png`,
    alt: `Logo ${i + 1}`,
  }));

  return (
    <Layout>
      <div className="relative bg-gradient-to-r from-primary to-primary/90 text-white py-10 md:py-18 flex items-center">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-5xl font-bold z-50">Daftar Pelanggan</h1>
          </div>
        </div>
        <div className="absolute inset-0">
          <img src="\assets\img\item\bg-1.png" alt="Modern office building" className="w-full h-full object-cover opacity-90" />
        </div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 pr-4 sm:pr-8 md:pr-12">
          <h1 className="font-bold text-3xl sm:text-5xl md:text-7xl">HVAC</h1>
        </div>
      </div>

      {/* Bagian Carousel Logo */}
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-7">
          <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">Dalam Pengembangan</h2>
          <Slider {...settings}>
            {logoList.map((logo) => (
              <div key={logo.id} className="p-4 flex items-center justify-center">
                <img src={logo.src} alt={logo.alt} className="items-center justify-center max-h-24 opacity-60 w hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </Layout>
  );
};

export default DaftarPelanggan;
