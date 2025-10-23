import Layout from '@/components/Layout';

const TentangPerusahaan = () => {
  return (
    <Layout>
      <div className="relative bg-gradient-to-r from-primary to-primary/90 text-white py-10 md:py-18">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-5xl font-bold z-50"> Tentang Perusahaan</h1>
          </div>
        </div>
        <div className="absolute inset-0">
          <img src="\assets\img\item\bg-1.png" alt="Modern office building" className="w-full h-full object-cover opacity-90" />
        </div>
        <div className="absolute bottom-0 right-12 mr-10 transform translate-x-1/4 translate-y-1/4">
          <img src="/assets/img/item/icon-1.png" alt="About Us" className="w-36 sm:w-36 md:w-48 object-contain animate-updown" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 ">
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 hover:shadow-xl transition-shadow">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-gray-700">
              <strong>PT Mangatur Dharma</strong> (selanjutnya disebut Perseroan) berdiri tahun 1976 bermula dari perdagangan filter GTS (Gas Turbine System) dengan merek Donaldson,
            </p>

            <p className="text-lg leading-relaxed text-gray-700">
              Pada tahun 1988 bergabung dengan ADR Group of Companies dan mengembangkan sayapnya tidak hanya pada filter GTS tetapi filter filter jenis lain untuk Alat Berat Pertambangan, Jasa Konstruksi, Perkapalan, Pembangkit Listrik,
              Transportasi, HVAC serta filter untuk kebutuhan industri.
            </p>

            <p className="text-lg leading-relaxed text-gray-700">Pada tahun 2024 PT Prapat Tunggal Cipta, Entitas Anak PT Selamat Sempurna Tbk. menjadi pemegang saham utama Perseroan.</p>

            <p className="text-lg leading-relaxed text-gray-700">
              Berlokasi di Jakarta dan Tangerang, Perseroan menjadi pemasok terpercaya ke berbagai Perusahaan Pembangkit Listrik, Pertambangan, Jasa Konstruksi, Transportasi, Rumah sakit, Farmasi serta Minyak & Gas baik swasta maupun BUMN
              di seluruh Indonesia.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TentangPerusahaan;
