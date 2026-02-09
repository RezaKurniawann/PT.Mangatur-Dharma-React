import Layout from "@/components/Layout";
import { BiLogoLinkedin } from "react-icons/bi";
import {
  FaFacebookSquare,
  FaInstagram,
  FaPhoneSquareAlt,
} from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { BsPersonSquare } from "react-icons/bs";

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
          <img
            src={`${import.meta.env.BASE_URL}/assets/img/item/bg-1.png`}
            alt="Modern office building"
            className="w-full h-full object-cover opacity-90"
          />
        </div>
        <div className="absolute bottom-0 right-12 mr-10 transform translate-x-1/4 translate-y-1/4">
          <img
            src={`${import.meta.env.BASE_URL}/assets/img/item/icon-4.png`}
            alt="About Us"
            className="w-36 sm:w-36 md:w-48 md:h-[calc(15vh)] object-contain "
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-18 ">
        <div className="text-black text-3xl mt-5 font-bold ">Sales Person </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-5 ">
          {/* Gilang Bagaskara */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 hover:shadow-xl transition-shadow">
            <div className="h-full flex items-center">
              <div>
                <div className="flex items-center text-primary space-x-2">
                  <BsPersonSquare />
                  <p className="text-gray-600">Gilang Bagaskara</p>
                </div>
                <div className="flex items-center text-primary space-x-2">
                  <FaPhoneSquareAlt />
                  <p className="text-gray-600">+62 813 1770 1089</p>
                </div>
                <div className="flex items-center text-primary space-x-2">
                  <MdOutlineEmail />
                  <p className="text-primary">
                    gilang.bagaskara@adr-group.co.id
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Gusti Ngurah */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 hover:shadow-xl transition-shadow">
            <div className="h-full flex items-center">
              <div>
                <div className="flex items-center text-primary space-x-2">
                  <BsPersonSquare />
                  <p className="text-gray-600">Gusti Ngurah Wira Yudha</p>
                </div>
                <div className="flex items-center text-primary space-x-2">
                  <FaPhoneSquareAlt />
                  <p className="text-gray-600">+62 813 5552 8923</p>
                </div>
                <div className="flex items-center text-primary space-x-2">
                  <MdOutlineEmail />
                  <p className="text-primary">gusti.yudha@adr-group.co.id</p>
                </div>
              </div>
            </div>
          </div>
          {/* Andre Heriyanto */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 hover:shadow-xl transition-shadow">
            <div className="h-full flex items-center">
              <div>
                <div className="flex items-center text-primary space-x-2">
                  <BsPersonSquare />
                  <p className="text-gray-600">Andre Heriyanto</p>
                </div>
                <div className="flex items-center text-primary space-x-2">
                  <FaPhoneSquareAlt />
                  <p className="text-gray-600">+62 858-9177-7189</p>
                </div>
                <div className="flex items-center text-primary space-x-2">
                  <MdOutlineEmail />
                  <p className="text-primary">
                    andre.heriyanto@adr-group.co.id
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* David Edilka */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 hover:shadow-xl transition-shadow">
            <div className="h-full flex items-center">
              <div>
                <div className="flex items-center text-primary space-x-2">
                  <BsPersonSquare />
                  <p className="text-gray-600">David Edilka Atmaja</p>
                </div>
                <div className="flex items-center text-primary space-x-2">
                  <FaPhoneSquareAlt />
                  <p className="text-gray-600">+62 812 9060 8061</p>
                </div>
                <div className="flex items-center text-primary space-x-2">
                  <MdOutlineEmail />

                  <p className="text-primary">david.edika@adr-group.co.id</p>
                </div>
              </div>
            </div>
          </div>
          {/* Contact Us */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 hover:shadow-xl transition-shadow">
            <ul>
              <li>
                <a
                  href="mailto:mangatur@adr-group.com"
                  className="flex items-center space-x-2 "
                >
                  <MdOutlineEmail className="h-5 w-6 text-primary " />
                  <p className="text-gray-600 hover:underline">
                    mangatur@adr-group.com
                  </p>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/mangaturdharma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <FaInstagram className="h-5 w-6 text-primary " />
                  <p className="text-gray-600 hover:underline">
                    @mangaturdharma
                  </p>
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/MangaturDharma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <FaFacebookSquare className="h-5 w-6 text-primary" />
                  <p className="text-gray-600 hover:underline">
                    PT Mangatur Dharma
                  </p>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/mangatur-dharma-2118a224a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <BiLogoLinkedin className="h-5 w-6 text-primary " />
                  <p className="text-gray-600 hover:underline">
                    PT Mangatur Dharma
                  </p>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-black text-3xl mt-5 font-bold ">Alamat </div>
        <div className="grid md:grid-cols-2 gap-12 mt-5 ">
          {/* Sales Person */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 hover:shadow-xl transition-shadow">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-800">
                  PT Mangatur Dharma - Jakarta
                </h3>
                <p className="text-gray-600">
                  Wisma ADR, Jl. Pluit Raya I No. 1,
                </p>
                <p className="text-gray-600">
                  Penjaringan, Jakarta Utara 14440
                </p>
                <p className=" mt-5">Telp. 021 – 598 7227 / 598 7235</p>
              </div>
            </div>
          </div>
          {/* Sales Person */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 hover:shadow-xl transition-shadow">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-800">
                  PT Mangatur Dharma – Tangerang
                </h3>
                <p className="text-gray-600">
                  Komplek Industri ADR Group, Jl. Raya LPPU Curug No. 88,
                </p>
                <p className="text-gray-600">
                  {" "}
                  Desa Kadujaya, Bitung, Tangerang 15810
                </p>
                <p className=" mt-5">Telp. 021 – 598 7227 / 598 7235</p>
              </div>
            </div>
          </div>
        </div>

        {/* Maps Section */}
        <div className="mt-5 grid md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold text-primary mb-4">
              MD Jakarta - Pusat
            </h3>
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

          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 hover:shadow-xl transition-shadow]">
            <h3 className="text-xl font-bold text-primary mb-4">
              MD Tangerang
            </h3>
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
