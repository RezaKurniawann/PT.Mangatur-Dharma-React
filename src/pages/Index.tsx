import Layout from "@/components/Layout";
import React from "react";
// untuk carousel
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import heroImage1 from "../assets/banner1a.webp";
import heroImage2 from "../assets/banner1.webp";
import heroImage3 from "../assets/banner2.webp";
import heroImage4 from "../assets/banner3.webp";
import heroImage5 from "../assets/banner4.webp";
// import heroImage1 from '../assets/md1.png';
// import heroImage2 from '../assets/md2.png';
// import heroImage3 from '../assets/md3.png';
import { PrevArrow, NextArrow } from "@/components/CustomArrows";
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

const Index = () => {
  const carouselImages = [heroImage1, heroImage2, heroImage3, heroImage4, heroImage5];

  return (
    <Layout>
      {/* Hero Sliders */}
      <section className="relative bg-gradient-to-r from-white to-white text-white py-0 px-0 overflow-hidden">
        <div className="relative">
          <Slider {...settings}>
            {carouselImages.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Industrial filter product ${index + 1}`}
                  className="w-full h-auto shadow-2xl object-cover"
                  // style={{ maxHeight: "500px" }}
                />
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Company Description */}
      <section className="lg:py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="container text-center mx-auto px-4 py-6 md:py-12">
            <p className="text-sm md:text-base lg:text-lg leading-relaxed text-gray-700">
              PT Mangatur Dharma merupakan perusahaan yang bergerak di bidang
              penyediaan solusi filtrasi untuk berbagai kebutuhan industri. Kami
              berkomitmen untuk menyediakan produk filter dengan kualitas tinggi
              yang dirancang untuk menjaga kinerja sistem dan mesin agar tetap
              optimal, efisien, serta tahan lama. Kami melayani berbagai sektor
              industri strategis, termasuk pembangkit listrik, minyak dan gas
              (migas), otomotif, pertambangan, maritim, serta sistem tata udara
              (HVAC). Dengan mengutamakan penggunaan komponen lokal yang
              berkualitas dan proses produksi yang terstandarisasi, produk kami
              telah terbukti mampu memenuhi tuntutan teknis yang tinggi dan
              kebutuhan operasional yang kompleks.
            </p>
          </div>
        </div>
      </section>

      {/* Industry Categories */}
      <section className="  bg-background bg-gradient-to-t from-[#83e9ff] via-[#ffffff] to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Automotive */}
            <div className="text-center bg-white p-6 rounded-lg shadow-lg border border-gray-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <img
                  src={`${
                    import.meta.env.BASE_URL
                  }/assets/img/item/Automotive.png`}
                  alt="Automotive Icon"
                  className="w-10 h-10 text-primary"
                />
              </div>
              <h3 className="font-semibold text-primary mb-2">Automotive</h3>
              <p className="text-sm text-gray-600">
                Fuel Filter, Air Filter, Oil Filter
              </p>
            </div>

            {/* Heavy Duty */}
            <div className="text-center bg-white p-6 rounded-lg shadow-lg border border-gray-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <img
                  src={`${
                    import.meta.env.BASE_URL
                  }/assets/img/item/HeavyDuty.png`}
                  alt="Heavy Duty Icon"
                  className="w-8 h-8 text-primary"
                />
              </div>
              <h3 className="font-semibold text-primary mb-2">Heavy Duty</h3>
              <p className="text-sm text-gray-600">
                Mining, Construction, Agriculture Filters
              </p>
            </div>

            {/* Industrial */}
            <div className="text-center bg-white p-6 rounded-lg shadow-lg border border-gray-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <img
                  src={`${
                    import.meta.env.BASE_URL
                  }/assets/img/item/Industrial.png`}
                  alt="Industrial Icon"
                  className="w-8 h-8 text-primary"
                />
              </div>
              <h3 className="font-semibold text-primary mb-2">Industrial</h3>
              <p className="text-sm text-gray-600">
                Manufacturing, Power Plant, Compressor
              </p>
            </div>

            {/* HVAC */}
            <div className="text-center bg-white p-6 rounded-lg shadow-lg border border-gray-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <img
                  src={`${import.meta.env.BASE_URL}/assets/img/item/HVAC.png`}
                  alt="HVAC Icon"
                  className="w-8 h-8 text-primary"
                />
              </div>
              <h3 className="font-semibold text-primary mb-2">HVAC</h3>
              <p className="text-sm text-gray-600">
                Hospital, Pharmacy, Food & Beverage, Building
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
