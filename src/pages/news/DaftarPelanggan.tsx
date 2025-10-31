import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { getListCustomers, getCustomerCategories } from "@/lib/all.api";

const DaftarPelanggan = () => {
  const [activeTab, setActiveTab] = useState("");
  const [categories, setCategories] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [categoriesData, customersData] = await Promise.all([
          getCustomerCategories(),
          getListCustomers(),
        ]);

        setCategories(categoriesData);
        setCustomers(customersData);

        // Set tab pertama sebagai aktif (pakai tssynm)
        if (categoriesData.length > 0) {
          setActiveTab(categoriesData[0].tssynm);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter pelanggan berdasarkan kategori aktif
  const filteredCustomers = customers
    .filter((customer) => customer.category === activeTab)
    .sort((a, b) => {
      const dateA = new Date(a["cacsdt::bpchar"] || a.cacsdt || 0);
      const dateB = new Date(b["cacsdt::bpchar"] || b.cacsdt || 0);
      return dateB.getTime() - dateA.getTime();
    });

  const activeCategory = categories.find((c) => c.tssynm === activeTab);

  return (
    <Layout>
      {/* HERO SECTION */}
      <div className="relative bg-gradient-to-r from-primary to-primary/90 text-white py-10 md:py-18 flex items-center">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-5xl font-bold z-50">
              Daftar Pelanggan
            </h1>
          </div>
        </div>

        <div className="absolute inset-0">
          <img
            src={`${import.meta.env.BASE_URL}/assets/img/item/bg-1.png`}
            alt="Modern office building"
            className="w-full h-full object-cover opacity-90"
          />
        </div>

        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 pr-4 sm:pr-8 md:pr-12">
          <h1 className="font-bold text-3xl sm:text-5xl md:text-7xl">
            {activeCategory?.tssynm || "HVAC"}
          </h1>
        </div>
      </div>

      {/* TAB NAVIGATION */}
      <div className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="w-full">
          <div className="flex overflow-x-auto scrollbar-hide">
            {loading ? (
              <div className="flex space-x-4 py-4 px-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-10 w-32 bg-gray-200 animate-pulse rounded"
                  ></div>
                ))}
              </div>
            ) : (
              <div className="flex w-full">
                {categories.map((category) => (
                  <button
                    key={category.tssycd}
                    onClick={() => setActiveTab(category.tssynm)}
                    className={`flex-1 px-6 py-4 font-semibold whitespace-nowrap transition-all duration-200 border-b-2 ${
                      activeTab === category.tssynm
                        ? "border-primary text-primary bg-primary/5"
                        : "border-transparent text-gray-600 hover:text-primary hover:bg-gray-50"
                    }`}
                  >
                    {category.tssynm}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="min-h-screen py-12">
        <div className="flex flex-col items-center w-full px-4">
          {loading ? (
            // Loading Skeleton
            <div className="flex flex-wrap justify-center gap-6 w-full max-w-7xl">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-md p-6 animate-pulse w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
                >
                  <div className="aspect-[16/10] bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                </div>
              ))}
            </div>
          ) : filteredCustomers.length > 0 ? (
            // Customer Grid
            <div className="flex flex-wrap justify-center gap-6 w-full max-w-7xl">
              {filteredCustomers.map((customer, index) => (
                <div
                  key={`${customer.cachno}-${index}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
                >
                  <div className="aspect-[16/10] relative overflow-hidden bg-white flex items-center justify-center p-6">
                    <img
                      src={customer.file}
                      alt={customer.cacsnm}
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      onError={(
                        e: React.SyntheticEvent<HTMLImageElement, Event>
                      ) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/400x250/E5E7EB/9CA3AF?text=No+Image";
                      }}
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 border-t border-gray-100">
                    <h3 className="font-semibold text-gray-800 text-center text-sm line-clamp-2 min-h-[2.5rem] flex items-center justify-center">
                      {customer.cacsnm}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Empty State
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-200 mb-4">
                <svg
                  className="w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Belum Ada Pelanggan
              </h3>
              <p className="text-gray-500">
                Belum ada pelanggan di kategori{" "}
                {activeCategory?.tssynm || "ini"}
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DaftarPelanggan;
