import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import heroImage1 from '../assets/md1.png';
import heroImage2 from '../assets/md2.png';
import heroImage3 from '../assets/md3.png';
import { PrevArrow, NextArrow } from '@/components/CustomArrows';
import * as API from '@/lib/all.api';

interface AccordionItemProps {
  title: string;
  data: any[];
  loading: boolean;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, data, loading, isOpen, onToggle }) => {
  return (
    <div className="border border-gray-300 rounded-lg mb-3 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
      >
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">
            {loading ? 'Loading...' : `${data.length} items`}
          </span>
          <svg
            className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      {isOpen && (
        <div className="p-4 bg-gray-50 border-t border-gray-300">
          {loading ? (
            <p className="text-gray-600">Memuat data...</p>
          ) : (
            <pre className="bg-white p-4 rounded-lg overflow-auto text-xs border border-gray-200 max-h-96">
              {JSON.stringify(data, null, 2)}
            </pre>
          )}
        </div>
      )}
    </div>
  );
};

const Test = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});
  const [searchQuery, setSearchQuery] = useState(''); // 🔍 state untuk pencarian

  // State untuk semua data API
  const [apiData, setApiData] = useState({
    awardsHeader: [],
    awardsDetail: [],
    customers: [],
    customerCategories: [],
    news: [],
    newsCategories: [],
    artikel: [],
    articleCategories: [],
    products: [],
    productCategories: [],
    runningTransactionNo: [],
    descriptions: [],
    errorLogFiles: [],
    historyLogin: [],
    historySintax: [],
    menus: [],
    runningNo: [],
    prosesBatchLogFiles: [],
    parameters: [],
    sintaxLogFiles: [],
    systems: [],
    userAccessMenuHistory: [],
    userAccessMenu: [],
    userEnableDisableHistory: [],
    userPasswordHistory: [],
    userOtherAccess: [],
    users: [],
    userTokens: [],
    versionHistory: [],
    versions: [],
    sintaxLogfileExec: [],
  });

  const carouselImages = [heroImage1, heroImage2, heroImage3];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (oldIndex: number, newIndex: number) => {
      setCurrentSlide(newIndex);
    },
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleAll = () => {
    const allOpen = Object.keys(apiData).every(key => openSections[key]);
    const newState: { [key: string]: boolean } = {};
    Object.keys(apiData).forEach(key => {
      newState[key] = !allOpen;
    });
    setOpenSections(newState);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🔄 Mengambil data dari API...');
        const responses = await Promise.all([
          API.getListAwardsHeader(),
          API.getListAwardsDetail(),
          API.getListCustomers(),
          API.getCustomerCategories(),
          API.getListNews(),
          API.getNewsCategories(),
          API.getListArtikel(),
          API.getArticleCategories(),
          API.getListProducts(),
          API.getProductCategories(),
          API.getRunningTransactionNo(),
          API.getDescriptions(),
          API.getErrorLogFiles(),
          API.getHistoryLogin(),
          API.getHistorySintax(),
          API.getMenus(),
          API.getRunningNo(),
          API.getProsesBatchLogFiles(),
          API.getParameters(),
          API.getSintaxLogFiles(),
          API.getSystems(),
          API.getUserAccessMenuHistory(),
          API.getUserAccessMenu(),
          API.getUserEnableDisableHistory(),
          API.getUserPasswordHistory(),
          API.getUserOtherAccess(),
          API.getUsers(),
          API.getUserTokens(),
          API.getVersionHistory(),
          API.getVersions(),
          API.getSintaxLogfileExec(),
        ]);

        setApiData({
          awardsHeader: responses[0],
          awardsDetail: responses[1],
          customers: responses[2],
          customerCategories: responses[3],
          news: responses[4],
          newsCategories: responses[5],
          artikel: responses[6],
          articleCategories: responses[7],
          products: responses[8],
          productCategories: responses[9],
          runningTransactionNo: responses[10],
          descriptions: responses[11],
          errorLogFiles: responses[12],
          historyLogin: responses[13],
          historySintax: responses[14],
          menus: responses[15],
          runningNo: responses[16],
          prosesBatchLogFiles: responses[17],
          parameters: responses[18],
          sintaxLogFiles: responses[19],
          systems: responses[20],
          userAccessMenuHistory: responses[21],
          userAccessMenu: responses[22],
          userEnableDisableHistory: responses[23],
          userPasswordHistory: responses[24],
          userOtherAccess: responses[25],
          users: responses[26],
          userTokens: responses[27],
          versionHistory: responses[28],
          versions: responses[29],
          sintaxLogfileExec: responses[30],
        });

        console.log('✅ Semua data berhasil dimuat');
      } catch (error) {
        console.error('❌ Gagal memuat data dari API:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const apiSections = [
    { key: 'awardsHeader', title: 'Awards Header (CMAWRH)', data: apiData.awardsHeader },
    { key: 'awardsDetail', title: 'Awards Detail (CMAWRD)', data: apiData.awardsDetail },
    { key: 'customers', title: 'Customers (CMCSTM)', data: apiData.customers },
    { key: 'customerCategories', title: 'Customer Categories (TBLSYS - CUSTCAT)', data: apiData.customerCategories },
    { key: 'news', title: 'News (CMNEWS)', data: apiData.news },
    { key: 'newsCategories', title: 'News Categories (TBLSYS - NEWSCAT)', data: apiData.newsCategories },
    { key: 'artikel', title: 'Artikel (CMARTK)', data: apiData.artikel },
    { key: 'articleCategories', title: 'Article Categories (TBLSYS - ARTCAT)', data: apiData.articleCategories },
    { key: 'products', title: 'Products (CMPROD)', data: apiData.products },
    { key: 'productCategories', title: 'Product Categories (TBLSYS - PRODCAT)', data: apiData.productCategories },
    { key: 'runningTransactionNo', title: 'Running Transaction No (CSYNBR)', data: apiData.runningTransactionNo },
    { key: 'descriptions', title: 'Descriptions (TBLDSC)', data: apiData.descriptions },
    { key: 'errorLogFiles', title: 'Error Log Files (TBLELF)', data: apiData.errorLogFiles },
    { key: 'historyLogin', title: 'History Login (TBLHSL)', data: apiData.historyLogin },
    { key: 'historySintax', title: 'History Sintax (TBLHSS)', data: apiData.historySintax },
    { key: 'menus', title: 'Menus (TBLMNU)', data: apiData.menus },
    { key: 'runningNo', title: 'Running No (TBLNOR)', data: apiData.runningNo },
    { key: 'prosesBatchLogFiles', title: 'Proses Batch Log Files (TBLPLF)', data: apiData.prosesBatchLogFiles },
    { key: 'parameters', title: 'Parameters (TBLPRM)', data: apiData.parameters },
    { key: 'sintaxLogFiles', title: 'Sintax Log Files (TBLSLF)', data: apiData.sintaxLogFiles },
    { key: 'systems', title: 'Systems (TBLSYS)', data: apiData.systems },
    { key: 'userAccessMenuHistory', title: 'User Access Menu History (TBLUAH)', data: apiData.userAccessMenuHistory },
    { key: 'userAccessMenu', title: 'User Access Menu (TBLYAM)', data: apiData.userAccessMenu },
    { key: 'userEnableDisableHistory', title: 'User Enable Disable History (TBLUED)', data: apiData.userEnableDisableHistory },
    { key: 'userPasswordHistory', title: 'User Password History (TBLUPH)', data: apiData.userPasswordHistory },
    { key: 'userOtherAccess', title: 'User Other Access (TBLUSH)', data: apiData.userOtherAccess },
    { key: 'users', title: 'Users (TBLUSR)', data: apiData.users },
    { key: 'userTokens', title: 'User Tokens (TBLUST)', data: apiData.userTokens },
    { key: 'versionHistory', title: 'Version History (TBLVRH)', data: apiData.versionHistory },
    { key: 'versions', title: 'Versions (TBLVRS)', data: apiData.versions },
    { key: 'sintaxLogfileExec', title: 'Sintax Logfile Exec (TBLXLF)', data: apiData.sintaxLogfileExec },
  ];

  // 🔍 Filter section berdasarkan query
  const filteredSections = apiSections.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                  style={{ maxHeight: '220px' }}
                />
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* API Data Section */}
      <section className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
            <h1 className="text-3xl font-bold text-gray-800">API Data Testing</h1>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Cari section API..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 sm:w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={toggleAll}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {Object.values(openSections).some(v => v) ? 'Tutup Semua' : 'Buka Semua'}
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Memuat semua data API...</p>
            </div>
          ) : (
            <div className="space-y-0">
              {filteredSections.length > 0 ? (
                filteredSections.map(section => (
                  <AccordionItem
                    key={section.key}
                    title={section.title}
                    data={section.data}
                    loading={false}
                    isOpen={openSections[section.key] || false}
                    onToggle={() => toggleSection(section.key)}
                  />
                ))
              ) : (
                <p className="text-gray-500 italic text-center py-6">
                  Tidak ada hasil untuk “{searchQuery}”
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Test;
