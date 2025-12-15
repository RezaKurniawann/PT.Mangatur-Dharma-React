import Layout from '@/components/Layout';

const OurCategory = () => {
  return (
    <Layout>
      <div className="relative bg-gradient-to-r from-primary to-primary/90 text-white py-10 md:py-18">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-5xl font-bold z-50"> Our Category</h1>
          </div>
        </div>
        <div className="absolute inset-0">
          <img src={`${import.meta.env.BASE_URL}/assets/img/item/bg-1.png`} alt="Modern office building" className="w-full h-full object-cover opacity-90" />
        </div>
        <div className="absolute bottom-0 right-12 mr-10 transform translate-x-1/4 translate-y-1/4">
          <img src={`${import.meta.env.BASE_URL}/assets/img/item/icon-5.png`} alt="About Us" className="w-36 sm:w-36 md:w-48 md:h-[calc(15vh)] object-contain animate-updown" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-15 ">
        {/* Category Section */}
        <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <div className="h-64 rounded-lg overflow-hidden flex justify-center items-center">
              <img src={`${import.meta.env.BASE_URL}/assets/img/item/category/ktgr1.png`} alt="" className="max-w-full max-h-full object-contain" />
            </div>
            <h3 className="font-bold text-2xl text-center">Atomotif</h3>
            <p className="text-center mt-2">
              Kami menyediakan filtrasi yang dirancang khusus dari Kendaraan sedan, kendaraan penumpang, hingga kendaraan komersial. Filter kami membantu menjaga komponen mesin tetap bersih, sehingga usia mesin, dan memberikan performa mesin yang optimal selama berkendara.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <div className="h-64 rounded-lg overflow-hidden flex justify-center items-center">
              <img src={`${import.meta.env.BASE_URL}/assets/img/item/category/ktgr2.png`} alt="" className="max-w-full max-h-full object-contain" />
            </div>
            <h3 className="font-bold text-2xl text-center">Alat Berat</h3>
            <p className="text-center mt-2">
              Solusi Filtrasi untuk Kendaraan Berat & Mesin Berkinerja Tinggi, mencakup berbagai jenis filter yang dirancang khusus untuk mesin dengan beban kerja berat, seperti alat berat konstruksi, truk tambang, kendaraan militer, peralatan agrikultur dan lainnya. Produk kami menjamin perlindungan maksimal terhadap kontaminasi yang dapat merusak sistem vital mesin Anda.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <div className="h-64 rounded-lg overflow-hidden flex justify-center items-center">
              <img src={`${import.meta.env.BASE_URL}/assets/img/item/category/ktgr3.png`} alt="" className="max-w-full max-h-full object-contain" />
            </div>
            <h3 className="font-bold text-2xl text-center">Industrial</h3>
            <p className="text-center mt-2">
              Kami juga memiliki filtrasi untuk sistem Industri yang dirancang untuk kebutuhan pabrik, manufaktur, pembangkit listrik, fasilitas pengolahan dan lainnya. Filter kami membantu menjaga kualitas operasional mesin dan sistem agar tetap efisien, minim gangguan, dan memperpanjang umur peralatan industri.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <div className="h-64 rounded-lg overflow-hidden flex justify-center items-center">
              <img src={`${import.meta.env.BASE_URL}/assets/img/item/category/ktgr4.png`} alt="" className="max-w-full max-h-full object-contain" />
            </div>
            <h3 className="font-bold text-2xl text-center">Sistem Tata Udara</h3>
            <p className="text-center mt-2">
              Solusi untuk Filter udara berkualitas untuk Sistem Tata Udara (HVAC) yang bersih dan sehat. Filter HVAC kami menyediakan berbagai produk yang dirancang untuk menjaga kualitas udara dalam gedung komersial, rumah sakit, F&B, dan fasilitas lain yang membutuhkan pengendalian udara bersih dan Sehat. Filter kami membantu mengurangi polutan, debu, bau, dan mikroorganisme sehingga menciptakan lingkungan yang lebih sehat.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default OurCategory;
