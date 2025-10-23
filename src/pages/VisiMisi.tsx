import Layout from '@/components/Layout';

const VisiMisi = () => {
  return (
    <Layout>
      <div className="relative bg-gradient-to-r from-primary to-primary/90 text-white py-10 md:py-18">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-5xl font-bold z-50"> Visi Misi </h1>
          </div>
        </div>
        <div className="absolute inset-0">
          <img src="\assets\img\item\bg-1.png" alt="Modern office building" className="w-full h-full object-cover opacity-90" />
        </div>
        <div className="absolute bottom-0 right-12 mr-10 transform translate-x-1/4 translate-y-1/4">
          <img src="\assets\img\item\icon-2.png" alt="About Us" className="w-36 sm:w-36 md:w-48 object-contain animate-leftright" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Visi */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 hover:shadow-xl transition-shadow ">
            <h2 className="text-2xl font-bold text-primary mb-6">Visi</h2>
            <p className="text-lg leading-relaxed text-gray-700">Menjadi perusahaan terbaik di Indonesia untuk pengadaan komponen industri dan alat berat lainnya</p>
          </div>

          {/* Misi */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold text-primary mb-6">Misi</h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Menjadi perusahaan pertama yang menyediakan solusi untuk kebutuhan Industri (Power Plan, Oil & Gas, Otomotif, Mining, Marine, HVAC) dengan menyediakan Produk berkualitas, harga yang terjangkau serta area distribusi yang luas &
              terpercaya.
            </p>
          </div>
        </div>

        {/* Nilai Inti */}
        <div className="bg-white p-8 rounded-lg mt-8 shadow-lg border border-gray-300 hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-bold text-primary mb-6">Nilai Inti Perseroan</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full text-white text-sm flex items-center justify-center font-bold">1</div>
                <p className="text-gray-700">Berkembang bersama stakeholders</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full text-white text-sm flex items-center justify-center font-bold">2</div>
                <p className="text-gray-700">Berjuang menjadi yang terbaik</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full text-white text-sm flex items-center justify-center font-bold">3</div>
                <p className="text-gray-700">Saling menghargai sebagai anggota tim</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full text-white text-sm flex items-center justify-center font-bold">4</div>
                <p className="text-gray-700">Tanggap terhadap perubahan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VisiMisi;
