import Layout from '@/components/Layout';

const JejakLangkah = () => {
  return (
    <Layout>
      <div className="relative bg-gradient-to-r from-primary to-primary/90 text-white py-10 md:py-18">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-5xl font-bold z-50">Jejak & Langkah</h1>
          </div>
        </div>
        <div className="absolute inset-0">
          <img src="\assets\img\item\bg-1.png" alt="Modern office building" className="w-full h-full object-cover opacity-90" />
        </div>
        <div className="absolute bottom-0 right-12 mr-10 transform translate-x-1/4 translate-y-1/4">
          <img src="\assets\img\item\icon-3.png" alt="About Us" className="w-36 sm:w-36 md:w-48 object-contain animate-updown" />
        </div>
      </div>

      <div className="container mx-auto px-4 p-6 md:p-12">
        <div className="bg-white rounded-lg shadow-lg border border-gray-300 hover:shadow-xl transition-shadow overflow-hidden relative ">
          <img src="\assets\img\item\jejak-langkah.png" alt="Company Roadmap Timeline" className="w-full h-auto object-cover" />
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4">
            <div className="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">1976</div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800">Established</h4>
              <p className="text-gray-600 mt-1">Berdirinya perusahaan</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">1984</div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800">Start to Sales</h4>
              <p className="text-gray-600 mt-1">Memulai penjualan GTS Donaldson Filters (Import)</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">1988</div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800">Joint With ADR</h4>
              <p className="text-gray-600 mt-1">Bergabung dengan ADR Groups of Company</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">2000</div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800">Support from</h4>
              <p className="text-gray-600 mt-1">Dukungan dari Donaldson Filtration Indonesia untuk pasokan filter</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4">
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">2004</div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800">Sole Agent PT</h4>
              <p className="text-gray-600 mt-1">Menjadi Sole Agent PT Panata Jaya Mandiri untuk GTS & Filter</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4">
            <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">2021</div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800">Sole Agent PT</h4>
              <p className="text-gray-600 mt-1">Menjadi Sole Agent PT Selamat Sempurna untuk GTS, HVAC & Filter</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JejakLangkah;
