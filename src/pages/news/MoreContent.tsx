import Layout from "@/components/Layout";
import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import * as API from "@/lib/all.api";

// --- START: useDebounce Hook ---
/**
 * Custom hook untuk men-debounce sebuah nilai.
 * @param value Nilai yang ingin di-debounce
 * @param delay Waktu tunda dalam milidetik
 * @returns Nilai yang telah di-debounce
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set timeout untuk update nilai debounced setelah delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Bersihkan timeout jika nilai berubah (misalnya, user lanjut mengetik)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Hanya re-run jika value atau delay berubah

  return debouncedValue;
}
// --- END: useDebounce Hook ---

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

const SkeletonCard = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse flex flex-col sm:flex-row">
    <div className="w-full sm:w-48 h-48 sm:h-auto bg-gray-300 flex-shrink-0"></div>
    <div className="p-6 flex flex-col flex-1">
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="border-t border-gray-200 pt-4 mb-4">
        <div className="flex justify-between items-center mb-4">
          <div className="h-4 bg-gray-300 rounded w-32"></div>
          <div className="h-4 bg-gray-300 rounded w-24"></div>
        </div>
      </div>
      <div className="h-10 bg-gray-300 rounded w-40"></div>
    </div>
  </div>
);

const ContentCard = ({
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col sm:flex-row group">
      {/* Image Section - Left */}
      <div className="relative w-full sm:w-56 lg:w-64 h-48 sm:h-40 flex-shrink-0 overflow-hidden bg-gray-200">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content Section - Right */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title - Fixed at top */}
        <div className="mb-3">
          <h3 className="font-bold text-lg text-gray-800 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
        </div>

        {/* Spacer to push footer to bottom */}
        <div className="flex-grow"></div>

        {/* Footer Section - Fixed at bottom */}
        <div className="mt-auto">
          {/* Divider */}
          <div className="border-t border-gray-200 pt-3">
            {/* Author and Date */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <span className="font-medium">By "{author || "Admin"}"</span>
              </div>
              <div className="text-gray-500 text-sm whitespace-nowrap">
                {formatDate(dateStr)}
              </div>
            </div>

            {/* Read More Button */}
            <button
              onClick={onClick}
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors group/btn text-sm"
            >
              <span>Baca Selengkapnya</span>
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MoreContentPage = () => {
  const { type } = useParams<{ type: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchQuery = searchParams.get("search") || "";
  const categoryQuery = searchParams.get("category") || "";

  const [query, setQuery] = useState(searchQuery);
  const [selectedCategory, setSelectedCategory] = useState(categoryQuery);
  const [allContent, setAllContent] = useState<ContentItem[]>([]);
  const [displayedContent, setDisplayedContent] = useState<ContentItem[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // --- START: Debounce State ---
  const debouncedQuery = useDebounce(query, 500); // Tunda 500ms
  // --- END: Debounce State ---

  const ITEMS_PER_PAGE = 12;
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastContentElementRef = useRef<HTMLDivElement | null>(null);

  const contentType: "news" | "article" =
    type === "artikel" ? "article" : "news";
  const pageTitle =
    contentType === "news" ? "List Berita & Aktifitas" : "List Artikel";

  // Fetch categories
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

  // --- MODIFIED: Fetch and filter content (uses debouncedQuery) ---
  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      try {
        const data =
          contentType === "news"
            ? await API.getListNews()
            : await API.getListArtikel();

        let filteredData = data;

        // Filter by category
        if (selectedCategory) {
          filteredData = filteredData.filter(
            (item: ContentItem) => item.category === selectedCategory
          );
        }

        // Filter by search query (gunakan debouncedQuery)
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

        // Sort by date descending
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

        setAllContent(filteredData);
        setCurrentPage(0);

        // Set first batch
        const firstBatch = filteredData.slice(0, ITEMS_PER_PAGE);
        setDisplayedContent(firstBatch);
        setHasMore(filteredData.length > ITEMS_PER_PAGE);
      } catch (error) {
        console.error("Error fetching content:", error);
        setAllContent([]);
        setDisplayedContent([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [contentType, selectedCategory, debouncedQuery]); // <-- Dependency diubah ke debouncedQuery

  // Load more content
  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);

    setTimeout(() => {
      const nextPage = currentPage + 1;
      const startIndex = nextPage * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;

      const newItems = allContent.slice(startIndex, endIndex);

      if (newItems.length > 0) {
        setDisplayedContent((prev) => [...prev, ...newItems]);
        setCurrentPage(nextPage);
        setHasMore(endIndex < allContent.length);
      } else {
        setHasMore(false);
      }

      setLoadingMore(false);
    }, 300);
  }, [currentPage, allContent, loadingMore, hasMore]);

  // --- NEW: useEffect to sync state with URL params ---
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedQuery.trim()) {
      params.set("search", debouncedQuery);
    }
    if (selectedCategory) {
      params.set("category", selectedCategory);
    }
    // Gunakan 'replace: true' agar tidak memenuhi history browser
    setSearchParams(params, { replace: true });
  }, [debouncedQuery, selectedCategory, setSearchParams]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (lastContentElementRef.current) {
      observerRef.current.observe(lastContentElementRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [hasMore, loadingMore, loadMore]);

  // --- MODIFIED: Handle search - hanya update state ---
  const handleSearch = (value: string) => {
    setQuery(value);
  };

  // --- MODIFIED: Handle category filter - hanya update state ---
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  // Handle card click
  const handleCardClick = (item: ContentItem) => {
    const id = contentType === "news" ? item.cbcbnoiy : item.cecenoiy;
    navigate(`/berita/${type}/detail/${id}`);
  };

  // Handle back button
  const handleBack = () => {
    navigate(`/berita/${type}`);
  };

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
            className="w-36 sm:w-36 md:w-48 md:h-[calc(15vh)] object-contain"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}

        {/* Search & Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search bar */}
            <div className="flex-1 w-full">
              <input
                type="text"
                placeholder={`Cari ${
                  contentType === "news" ? "berita" : "artikel"
                }...`}
                value={query} // <-- Nilai tetap 'query' agar instan
                onChange={(e) => handleSearch(e.target.value)} // <-- Panggil handleSearch
                className="w-full border rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Dropdown Category */}
            <div className="w-full md:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)} // <-- Panggil handleCategoryChange
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

        <div className="mb-6">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-4 py-2 text-primary hover:text-primary/80 transition-colors duration-200 group"
          >
            <svg
              className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="font-medium">
              Kembali ke {contentType === "news" ? "Berita" : "Artikel"}
            </span>
          </button>
        </div>

        {/* Page Info */}
        {/* <div className="mb-8">
          <p className="text-gray-600">
            Menampilkan {allContent.length} {contentType === 'news' ? 'berita' : 'artikel'}
            {query && ` untuk "${query}"`}
            {selectedCategory && ` dalam kategori "${selectedCategory}"`}
          </p>
        </div> */}

        {/* Content List */}
        {loading ? (
          <div className="space-y-6">
            {Array.from({ length: 4 }, (_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : displayedContent.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Tidak ada {contentType === "news" ? "berita" : "artikel"}{" "}
              ditemukan
            </h3>
            <p className="text-gray-600">
              Coba ubah kata kunci pencarian atau filter kategori
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {displayedContent.map((item, index) => (
              <div
                key={contentType === "news" ? item.cbcbnoiy : item.cecenoiy}
                ref={
                  index === displayedContent.length - 1
                    ? lastContentElementRef
                    : null
                }
              >
                <ContentCard
                  item={item}
                  type={contentType}
                  onClick={() => handleCardClick(item)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Loading indicator */}
        {loadingMore && (
          <div className="flex justify-center py-8">
            <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-lg shadow-sm">
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600 font-medium">
                Memuat {contentType === "news" ? "berita" : "artikel"}{" "}
                lainnya...
              </span>
            </div>
          </div>
        )}

        {/* End of list indicator */}
        {!hasMore && displayedContent.length > 0 && (
          <div className="flex justify-center py-8">
            <div className="bg-white px-6 py-3 rounded-lg shadow-sm">
              <span className="text-gray-500">
                Semua {contentType === "news" ? "berita" : "artikel"} telah
                dimuat
              </span>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MoreContentPage;
