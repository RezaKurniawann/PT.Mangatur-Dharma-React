import Layout from '@/components/Layout';

const Kontak = () => {
  return (
    <Layout>
      <div className="relative bg-gradient-to-r from-primary to-primary/90 text-white py-10 md:py-18">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-5xl font-bold z-50"> Kontak </h1>
          </div>
        </div>
        <div className="absolute inset-0">
          <img src="\assets\img\item\bg-1.png" alt="Modern office building" className="w-full h-full object-cover opacity-90" />
        </div>
        <div className="absolute bottom-0 right-12 mr-10 transform translate-x-1/4 translate-y-1/4">
          <img src="\assets\img\item\icon-4.png" alt="About Us" className="w-36 sm:w-36 md:w-48 object-contain animate-leftright" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-18 ">
        <div className="text-black text-3xl mt-5 font-bold ">Sales Person </div>
        <div className="grid md:grid-cols-3 gap-12 mt-5 ">
          {/* Syahrul Linardi */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 hover:shadow-xl transition-shadow">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-800">Bidang Marine dan Transportasi</h3>
                <p className="text-gray-600">Syahrul Linardi</p>
                <p className="text-gray-600">+62 857 9221 6220</p>
                <p className="text-primary">syahrul.linardi@adr-group.co.id</p>
              </div>
            </div>
          </div>
          {/* Gusti Ngurah */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 hover:shadow-xl transition-shadow">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-800">Bidang Mining dan Power Plant</h3>
                <p className="text-gray-600">Gusti Ngurah Wira Yudha</p>
                <p className="text-gray-600">+62 813 5552 8923</p>
                <p className="text-primary">gusti.yudha@adr-group.co.id</p>
              </div>
            </div>
          </div>
          {/* Andre Heriyanto */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 hover:shadow-xl transition-shadow">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-800">Bidang GTS, Oil & Gas</h3>
                <p className="text-gray-600">Andre Heriyanto</p>
                <p className="text-gray-600">+62 858-9177-7189</p>
                <p className="text-primary">andre.heriyanto@adr-group.co.id</p>
              </div>
            </div>
          </div>
          {/* David Edilka */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 hover:shadow-xl transition-shadow">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-800">Bidang HVAC</h3>
                <p className="text-gray-600">David Edilka Atmaja</p>
                <p className="text-gray-600">+62 812 9060 8061</p>
                <p className="text-primary">david.edika@adr-group.co.id</p>
              </div>
            </div>
          </div>
          {/* Contact Us */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 hover:shadow-xl transition-shadow">
            <div className="space-y-6">
              <div>
                <li className="flex items-center mb-2">
                  <img src="\assets\img\item\icon-email.png" alt="Facebook Icon" className="h-6 w-7 text-primary mr-3 ml-1" />
                  <a href="mailto:mangatur@adr-group.com" className="text-gray-600 hover:underline">
                    mangatur@adr-group.com
                  </a>
                </li>
                <li className="flex items-center  mb-2 mt-2">
                  <img src="\assets\img\item\icon-ig.png" alt="Facebook Icon" className="h-6 w-6 text-primary mr-4 ml-1" />
                  <a href="https://www.instagram.com/mangaturdharma" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:underline">
                    @mangaturdharma
                  </a>
                </li>
                <li className="flex items-center mt-2">
                  <img src="\assets\img\item\icon-fb.png" alt="Facebook Icon" className="h-6 w-3 text-primary mr-7 ml-2" />
                  <a href="https://www.facebook.com/MangaturDharma" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:underline">
                    PT Mangatur Dharma
                  </a>
                </li>
              </div>
            </div>
          </div>
        </div>

        <div className="text-black text-3xl mt-5 font-bold ">Alamat </div>
        <div className="grid md:grid-cols-2 gap-12 mt-5 ">
          {/* Sales Person */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 hover:shadow-xl transition-shadow">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-800">PT Mangatur Dharma - Jakarta</h3>
                <p className="text-gray-600">Wisma ADR, Jl. Pluit Raya I No. 1,</p>
                <p className="text-gray-600">Penjaringan, Jakarta Utara 14440</p>
                <p className=" mt-5">Telp. 021 – 598 7227 / 598 7235</p>
              </div>
            </div>
          </div>
          {/* Sales Person */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 hover:shadow-xl transition-shadow">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-800">PT Mangatur Dharma – Tangerang</h3>
                <p className="text-gray-600">Komplek Industri ADR Group, Jl. Raya LPPU Curug No. 88,</p>
                <p className="text-gray-600"> Desa Kadujaya, Bitung, Tangerang 15810</p>
                <p className=" mt-5">Telp. 021 – 598 7227 / 598 7235</p>
              </div>
            </div>
          </div>
        </div>

        {/* Maps Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold text-primary mb-4">MD Jakarta - Pusat</h3>
            <div className="h-64 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.0272622538623!2d106.80137837393208!3d-6.127033660073648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6a1ded503fffff%3A0xbaf2eb7a07ba8747!2sPT%20Mangatur%20Dharma!5e0!3m2!1sid!2sid!4v1756888905992!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
              ></iframe>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 hover:shadow-xl transition-shadow]">
            <h3 className="text-xl font-bold text-primary mb-4">MD Tangerang</h3>
            <div className="h-64 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.21210331617!2d106.55777277393364!3d-6.235749061062418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fde05a1fbc65%3A0xf62ff7def0b99488!2sPT%20Mangatur%20Dharma!5e0!3m2!1sid!2sid!4v1756888626698!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Kontak;
