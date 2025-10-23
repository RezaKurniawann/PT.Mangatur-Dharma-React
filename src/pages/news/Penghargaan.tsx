import Layout from '@/components/Layout';
import React, { useState, useEffect } from 'react';
import { getListAwards } from '@/lib/awards.api';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { PrevArrow, NextArrow } from '@/components/CustomArrows';

const Penghargaan = () => {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAwards = async () => {
      setLoading(true);
      try {
        const data = await getListAwards();
        setAwards(data);
      } catch (error) {
        console.error('Gagal memuat data penghargaan:', error);
      }
      setLoading(false);
    };

    fetchAwards();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const renderAwardCard = (award, index) => {
    const imageUrl = `${award.file}`;
    return (
      <div key={index} className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
        <div className="h-64 rounded-lg overflow-hidden flex justify-center items-center">
          <img src={imageUrl} alt={`Penghargaan ${index + 1}`} className="max-w-full max-h-full object-contain" />
        </div>
        <h3 className="font-bold text-2xl text-center">{award.cwtitl}</h3>
        <p className="text-center mt-2">{award.cwdesc}</p>
      </div>
    );
  };

  return (
    <Layout>
      <div className="relative bg-gradient-to-r from-primary to-primary/90 text-white py-10 md:py-18">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-5xl font-bold z-50"> Our Category</h1>
          </div>
        </div>
        <div className="absolute inset-0">
          <img src="/assets/img/item/bg-1.png" alt="Modern office building" className="w-full h-full object-cover opacity-90" />
        </div>
        <div className="absolute bottom-0 right-12 mr-10 transform translate-x-1/4 translate-y-1/4">
          <img src="/assets/img/item/icon-6.png" alt="About Us" className="w-36 sm:w-36 md:w-48 object-contain animate-leftright" />
        </div>
      </div>

      <div className="bg-white p-8 my-7 shadow-[var(--shadow-card)]">
        <div className="flex items-center">
          <div className="bg-primary h-12 w-1 mr-4"></div>
          <h2 className="text-2xl font-bold text-gray-800">Semua Penghargaan</h2>
          <div className="flex-grow border-t-4 border-gray-700 ml-4"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-15 ">
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {loading ? <p>Memuat data penghargaan...</p> : awards.length > 0 ? awards.map((award, index) => renderAwardCard(award, index)) : <p>Tidak ada data penghargaan yang ditemukan.</p>}
        </div>
      </div>
    </Layout>
  );
};

export default Penghargaan;

