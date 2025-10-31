import Layout from "@/components/Layout";
import { useState, useEffect } from "react"; // Impor hook standar
import { useParams, useNavigate } from "react-router-dom";
import * as API from "@/lib/all.api";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

interface ContentItem {
  // News fields
  cbcbnoiy?: number;
  cbtitl?: string;
  cbdesc?: string;
  cbchid?: string;
  cbpsdt?: string;
  cbcsdt?: string;
  "cbcsdt::bpchar"?: string;
  // Article fields
  cecenoiy?: number;
  cetitl?: string;
  cedesc?: string;
  cechid?: string;
  cepsdt?: string;
  cecsdt?: string;
  "cecsdt::bpchar"?: string;
  // Common fields
  file: string;
  category?: string;
}

interface Category {
  tssycd: string;
  tssynm: string;
}

const LatestBigCard = ({
  item,
  type,
  onClick,
}: {
  item: ContentItem;
  type: "news" | "article";
  onClick?: () => void;
}) => {
  const imageUrl = item.file || "/assets/img/placeholder.svg";
  const title = type === "news" ? item.cbtitl : item.cetitl;
  const author = type === "news" ? item.cbchid : item.cechid;
  const dateStr = type === "news" ? item.cbpsdt : item.cepsdt;

  const formatDate = (dateStr?: string) => {
    if (!dateStr || dateStr.length !== 8) return "No Date";
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${day} ${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col h-full cursor-pointer"
      onClick={onClick}
    >
      <div className="relative w-full h-64 overflow-hidden bg-gray-200">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-lg text-gray-800 line-clamp-3 mb-4">
          {title}
        </h3>
        <div className="flex items-center justify-between text-base text-gray-500 border-t pt-3 mt-auto">
          <span>By "{author || "Admin"}"</span>
          <span className="whitespace-nowrap">{formatDate(dateStr)}</span>
        </div>
      </div>
    </div>
  );
};

const LatestSmallCard = ({
  item,
  type,
  onClick,
}: {
  item: ContentItem;
  type: "news" | "article";
  onClick?: () => void;
}) => {
  const imageUrl = item.file || "/assets/img/placeholder.svg";
  const title = type === "news" ? item.cbtitl : item.cetitl;
  const author = type === "news" ? item.cbchid : item.cechid;
  const dateStr = type === "news" ? item.cbpsdt : item.cepsdt;

  const formatDate = (dateStr?: string) => {
    if (!dateStr || dateStr.length !== 8) return "No Date";
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${day} ${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col lg:flex-row gap-0 h-full cursor-pointer"
      onClick={onClick}
    >
      <div className="relative w-full lg:w-32 xl:w-40 h-64 lg:h-auto flex-shrink-0">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col flex-1 min-w-0">
        <h3 className="font-bold text-lg text-gray-800 line-clamp-3 mb-4">
          {title}
        </h3>
        <div className="flex items-center justify-between text-base text-gray-500 border-t pt-3 mt-auto">
          <span className="truncate mr-2">By "{author || "Admin"}"</span>
          <span className="whitespace-nowrap">{formatDate(dateStr)}</span>
        </div>
      </div>
    </div>
  );
};

const OtherCard = ({
  item,
  type,
  onClick,
}: {
  item: ContentItem;
  type: "news" | "article";
  onClick?: () => void;
}) => {
  const imageUrl = item.file || "/assets/img/placeholder.svg";
  const title = type === "news" ? item.cbtitl : item.cetitl;
  const author = type === "news" ? item.cbchid : item.cechid;
  const dateStr = type === "news" ? item.cbpsdt : item.cepsdt;

  const formatDate = (dateStr?: string) => {
    if (!dateStr || dateStr.length !== 8) return "No Date";
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${day} ${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col h-full cursor-pointer"
      onClick={onClick}
    >
      <div className="p-3 pt-3">
        <div className="relative w-full h-48 overflow-hidden rounded-lg bg-gray-200">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="px-4 pb-4 flex flex-col flex-1">
        <h3 className="font-bold text-lg text-gray-800 line-clamp-3 mb-4">
          {title}
        </h3>
        <div className="flex items-center justify-between text-base text-gray-500 border-t pt-3 mt-auto">
          <span>By "{author || "Admin"}"</span>
          <span className="whitespace-nowrap">{formatDate(dateStr)}</span>
        </div>
      </div>
    </div>
  );
};

const ContentPage = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [contentData, setContentData] = useState<ContentItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const debouncedQuery = useDebounce(query, 500);
  const [isSearching, setIsSearching] = useState(false);

  const contentType: "news" | "article" =
    type === "artikel" ? "article" : "news";
  const pageTitle = contentType === "news" ? "Berita & Aktifitas" : "Artikel";

  useEffect(() => {
    setQuery("");
    setSelectedCategory("");
    setIsSearching(false);
  }, [contentType]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data =
          contentType === "news"
            ? await API.getNewsCategories()
            : await API.getArticleCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    };
    fetchCategories();
  }, [contentType]);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      try {
        const data =
          contentType === "news"
            ? await API.getListNews()
            : await API.getListArtikel();

        let filteredData = data;
        if (selectedCategory) {
          filteredData = data.filter(
            (item: ContentItem) => item.category === selectedCategory
          );
        }

        if (debouncedQuery.trim()) {
          filteredData = filteredData.filter((item: ContentItem) => {
            const title = contentType === "news" ? item.cbtitl : item.cetitl;
            const desc = contentType === "news" ? item.cbdesc : item.cedesc;
            return (
              title?.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
              desc?.toLowerCase().includes(debouncedQuery.toLowerCase())
            );
          });
        }

        // Sort by date descending (newest first)
        filteredData = filteredData.sort((a: ContentItem, b: ContentItem) => {
          const dateA =
            contentType === "news"
              ? new Date(a.cbcsdt || a["cbcsdt::bpchar"] || 0).getTime()
              : new Date(a.cecsdt || a["cecsdt::bpchar"] || 0).getTime();
          const dateB =
            contentType === "news"
              ? new Date(b.cbcsdt || b["cbcsdt::bpchar"] || 0).getTime()
              : new Date(b.cecsdt || b["cecsdt::bpchar"] || 0).getTime();
          return dateB - dateA;
        });

        setContentData(filteredData);
      } catch (error) {
        console.error("Error fetching content:", error);
        setContentData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [contentType, selectedCategory, debouncedQuery]);

  // Handle card click to navigate to detail page
  const handleCardClick = (item: ContentItem) => {
    const id = contentType === "news" ? item.cbcbnoiy : item.cecenoiy;
    navigate(`/berita/${type}/detail/${id}`);
  };

  // --- Handle search - hanya update state ---
  const handleSearch = (value: string) => {
    setQuery(value);
    setIsSearching(true);
  };

  useEffect(() => {
    if (!isSearching) {
      return;
    }

    const params = new URLSearchParams();
    if (debouncedQuery.trim()) {
      params.set("search", debouncedQuery);
    }
    if (selectedCategory) {
      params.set("category", selectedCategory);
    }

    const queryString = params.toString();
    navigate(`/berita/${type}/more${queryString ? `?${queryString}` : ""}`);
  }, [debouncedQuery, selectedCategory, type, navigate]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setIsSearching(false);

    const params = new URLSearchParams();
    if (value) {
      params.set("category", value);
    }
    if (query) {
      params.set("search", query);
    }

    const queryString = params.toString();
    navigate(`/berita/${type}/more${queryString ? `?${queryString}` : ""}`);
  };

  const handleReadMore = () => {
    const params = new URLSearchParams();
    if (query) params.set("search", query);
    if (selectedCategory) params.set("category", selectedCategory);

    const queryString = params.toString();
    navigate(`/berita/${type}/more${queryString ? `?${queryString}` : ""}`);
  };

  // Split content: 8 for latest, rest for other
  const latestContent = contentData.slice(0, 8);
  const latestBigContent = latestContent.slice(0, 4);
  const latestSmallContent = latestContent.slice(4, 8);
  const otherContent = contentData.slice(8);

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary to-primary/90 text-white py-10 md:py-18">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-5xl font-bold z-50">{pageTitle}</h1>
          </div>
        </div>
        <div className="absolute inset-0">
          <img
            src={`${import.meta.env.BASE_URL}/assets/img/item/bg-1.png`}
            alt="Background"
            className="w-full h-full object-cover opacity-90"
          />
        </div>
        <div className="absolute bottom-0 right-12 mr-10 transform translate-x-1/4 translate-y-1/4">
          <img
            src={`${import.meta.env.BASE_URL}/assets/img/item/icon-7.png`}
            alt="Icon"
            className="w-36 sm:w-36 md:w-48 object-contain"
          />
        </div>
      </div>

      {/* Search & Filter */}
      <div className="container mx-auto px-4 mt-12">
        <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
          {/* Search bar */}
          <div className="flex-1 w-full">
            <div className="relative">
              <input
                type="text"
                placeholder={`Cari ${
                  contentType === "news" ? "berita" : "artikel"
                }...`}
                value={query}
                onChange={(e) => handleSearch(e.target.value)} // Tetap panggil handleSearch
                className="w-full border rounded-md px-4 py-2 pr-10 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Dropdown Category */}
          <div className="w-full md:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full md:w-auto border rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.tssycd} value={cat.tssynm}>
                  {cat.tssynm}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-600">Memuat data...</p>
          </div>
        </div>
      ) : contentData.length === 0 ? (
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <p className="text-gray-500 text-lg">
              Tidak ada data yang ditemukan.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Latest Section - 8 items terbaru */}
          {latestContent.length > 0 && (
            <div className="container mx-auto px-4 mb-12 py-8">
              <div className="mb-6 flex items-center">
                <div className="bg-primary h-8 w-1 mr-3"></div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {contentType === "news" ? "Latest News" : "Latest Articles"}
                </h3>
                <div className="flex-grow border-t-2 border-black ml-4"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left side - 4 big cards */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {latestBigContent.map((item, index) => (
                    <LatestBigCard
                      key={index}
                      item={item}
                      type={contentType}
                      onClick={() => handleCardClick(item)}
                    />
                  ))}
                </div>

                {/* Right side - 4 small cards */}
                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 grid-rows-1 sm:grid-rows-2 lg:grid-rows-4 gap-6">
                  {latestSmallContent.map((item, index) => (
                    <LatestSmallCard
                      key={index}
                      item={item}
                      type={contentType}
                      onClick={() => handleCardClick(item)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Other Section - Sisa items setelah 8 terbaru */}
          {otherContent.length > 0 && (
            <div
              className="relative py-12 -mb-12"
              style={{
                backgroundImage: "url(/assets/img/news/other-news-bg.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="container mx-auto px-4 relative z-10">
                <div className="mb-6 flex items-center">
                  <div className="bg-white h-8 w-1 mr-3"></div>
                  <h3 className="text-2xl font-bold text-white">
                    {contentType === "news" ? "Other News" : "Other Articles"}
                  </h3>
                  <div className="flex-grow border-t-2 border-white ml-4"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {otherContent.slice(0, 4).map((item, index) => (
                    <OtherCard
                      key={index}
                      item={item}
                      type={contentType}
                      onClick={() => handleCardClick(item)}
                    />
                  ))}
                </div>

                {/* Read More Button */}
                <div className="flex justify-center pb-4">
                  <button
                    onClick={handleReadMore}
                    className="px-12 py-3 border-2 border-white text-white font-semibold rounded hover:bg-white hover:text-primary transition-colors duration-300"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </Layout>
  );
};

export default ContentPage;
