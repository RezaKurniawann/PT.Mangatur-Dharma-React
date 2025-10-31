import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as API from "@/lib/all.api";

interface ContentDetail {
  // News fields
  cbcbnoiy?: number;
  cbtitl?: string;
  cbdesc?: string;
  cbchid?: string;
  cbpsdt?: string;
  cbcsdt?: string;
  "cbcsdt::bpchar"?: string;
  cbchdt?: string;
  "cbchdt::date"?: string;
  "TO_CHAR(cbchdt, 'HH24:MI:SS.MS')"?: string;
  // Article fields
  cecenoiy?: number;
  cetitl?: string;
  cedesc?: string;
  cechid?: string;
  cepsdt?: string;
  cecsdt?: string;
  "cecsdt::bpchar"?: string;
  cechdt?: string;
  "cechdt::date"?: string;
  "TO_CHAR(cechdt, 'HH24:MI:SS.MS')"?: string;
  // Common fields
  file: string;
  category?: string;
}

interface RelatedItem {
  id: number;
  title: string;
  date: string;
  image: string;
}

const ContentDetail = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const [content, setContent] = useState<ContentDetail | null>(null);
  const [relatedItems, setRelatedItems] = useState<RelatedItem[]>([]);
  const [loading, setLoading] = useState(true);

  const contentType: "news" | "article" =
    type === "artikel" ? "article" : "news";
  const pageTitle = contentType === "news" ? "Berita & Aktivitas" : "Artikel";

  // Calculate text similarity (Jaccard similarity)
  const calculateSimilarity = (
    str1: string = "",
    str2: string = ""
  ): number => {
    const words1 = str1
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 2);
    const words2 = str2
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 2);

    const set1 = new Set(words1);
    const set2 = new Set(words2);

    const intersection = new Set([...set1].filter((x) => set2.has(x)));
    const union = new Set([...set1, ...set2]);

    return union.size === 0 ? 0 : intersection.size / union.size;
  };

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      try {
        // Fetch all content
        const allData =
          contentType === "news"
            ? await API.getListNews()
            : await API.getListArtikel();

        // Find the specific content by ID
        const contentId = parseInt(id || "0");
        const foundContent = allData.find((item: ContentDetail) => {
          const itemId = contentType === "news" ? item.cbcbnoiy : item.cecenoiy;
          return itemId === contentId;
        });

        setContent(foundContent || null);

        if (foundContent) {
          const currentTitle =
            contentType === "news" ? foundContent.cbtitl : foundContent.cetitl;
          const currentCategory = foundContent.category;

          // Calculate relevance score for each item
          const scoredItems = allData
            .filter((item: ContentDetail) => {
              const itemId =
                contentType === "news" ? item.cbcbnoiy : item.cecenoiy;
              return itemId !== contentId;
            })
            .map((item: ContentDetail) => {
              const itemTitle =
                contentType === "news" ? item.cbtitl : item.cetitl;
              const itemCategory = item.category;
              const itemDate =
                contentType === "news"
                  ? item["cbcsdt::bpchar"]
                  : item["cecsdt::bpchar"];

              // Score calculation
              let score = 0;

              // 1. Title similarity (highest priority) - weight: 100
              const titleSimilarity = calculateSimilarity(
                currentTitle,
                itemTitle
              );
              score += titleSimilarity * 100;

              // 2. Same category (medium priority) - weight: 50
              if (
                currentCategory &&
                itemCategory &&
                currentCategory === itemCategory
              ) {
                score += 50;
              }

              // 3. Recency (lowest priority) - weight: 10
              if (itemDate) {
                const daysDiff =
                  (new Date().getTime() - new Date(itemDate).getTime()) /
                  (1000 * 3600 * 24);
                const recencyScore = Math.max(0, 10 - daysDiff / 30); // Decrease over 30 days
                score += recencyScore;
              }

              return {
                item,
                score,
              };
            })
            .sort((a, b) => b.score - a.score)
            .slice(0, 5);

          // Map to RelatedItem format
          const related = scoredItems.map(({ item }) => ({
            id: contentType === "news" ? item.cbcbnoiy : item.cecenoiy,
            title: contentType === "news" ? item.cbtitl : item.cetitl,
            date:
              contentType === "news"
                ? item["cbcsdt::bpchar"]
                : item["cecsdt::bpchar"],
            image: item.file,
          }));

          setRelatedItems(related);
        }
      } catch (error) {
        console.error("Error fetching content:", error);
        setContent(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchContent();
    }
  }, [contentType, id]);

  const getTimeAgo = (dateStr?: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} mins ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  const formatFullDate = (dateStr?: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${day} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-600">Memuat data...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!content) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <p className="text-gray-500 text-lg">Konten tidak ditemukan.</p>
          </div>
        </div>
      </Layout>
    );
  }

  const title = contentType === "news" ? content.cbtitl : content.cetitl;
  const author = contentType === "news" ? content.cbchid : content.cechid;
  const dateStr =
    contentType === "news"
      ? content["cbcsdt::bpchar"]
      : content["cecsdt::bpchar"];
  const description = contentType === "news" ? content.cbdesc : content.cedesc;
  const imageUrl = content.file || "/assets/img/placeholder.svg";

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary to-primary/90 text-white py-10 md:py-12">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-2xl md:text-4xl font-bold">{pageTitle}</h1>
        </div>
        <div className="absolute inset-0">
          <img
            src={`${import.meta.env.BASE_URL}/assets/img/item/bg-1.png`}
            alt="Background"
            className="w-full h-full object-cover opacity-90"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Featured Image - Full Width */}
        <div
          className="w-full bg-gray-200 mb-4 overflow-hidden rounded-lg"
          style={{ maxHeight: "500px" }}
        >
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            style={{ maxHeight: "500px" }}
          />
        </div>

        {/* Title */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 uppercase">
          {title}
        </h1>

        {/* Author and Date Meta */}
        <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
          <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
            <div className="flex items-center gap-1 sm:gap-2">
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="truncate">By "{author || "Admin"}"</span>
            </div>
            <span className="whitespace-nowrap">{getTimeAgo(dateStr)}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="whitespace-nowrap">{formatFullDate(dateStr)}</span>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-300 mb-6" />

        {/* Content Grid - Description Left, Related Right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content - Left Side (2 columns) */}
          <div className="lg:col-span-2">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
                Lorem ipsum dolor sit amet
              </h2>

              <div
                className="prose max-w-none text-gray-700 leading-relaxed space-y-4 text-justify"
                dangerouslySetInnerHTML={{ __html: description || "" }}
              />

              {/* Sample paragraphs if no description */}
              {!description && (
                <div className="space-y-4 text-gray-700 text-justify">
                  <p>
                    Consectetur adipiscing elit. Aenean venenatis nunc id lorem
                    fringilla, id bibendum tellus volutpat. Aliquam pharetra
                    ipsum sit amet consequat luctus.
                  </p>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>
                      Morbi feugiat eros venenatis aliquam pretium. Curabitur
                      leo ligula, gravida et sagittis et, commodo nec orci.
                    </li>
                    <li>
                      Suspendisse rutrum neque ac semper tincidunt. Vestibulum
                      in ipsum eu turpis vestibulum laoreet ut at justo.
                    </li>
                    <li>
                      Maecenas bibendum libero nisi, non egestas nibh mattis a.
                      Phasellus tortor purus, tempus vel dolor in.
                    </li>
                  </ol>
                  <p>
                    Consectetur adipiscing elit. Aenean venenatis nunc id lorem
                    fringilla, id bibendum tellus volutpat. Aliquam pharetra
                    ipsum sit amet consequat luctus. Consectetur adipiscing elit
                    venenatis nunc id lorem fringilla, id bibendum tellus
                    volutpat. Aliquam pharetra ipsum sit amet consequat luctus.
                    Consectetur adipiscing elit. Aenean venenatis nunc id lorem
                    fringilla, id bibendum tellus volutpat. Aliquam pharetra
                    ipsum sit.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Right Side (1 column) */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {relatedItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer flex flex-col"
                  onClick={() =>
                    (window.location.href = `/berita/${type}/detail/${item.id}`)
                  }
                >
                  <div className="flex gap-3 p-3 flex-1">
                    <div className="w-20 h-20 flex-shrink-0 bg-gray-200 rounded flex items-center justify-center overflow-hidden">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <svg
                          className="w-8 h-8 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col">
                      <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2 flex-1">
                        {item.title}
                      </h3>
                      <div className="flex items-center justify-between gap-2 text-xs text-gray-500 mt-auto">
                        <span className="truncate">
                          By "{author || "Admin"}"
                        </span>
                        <span className="whitespace-nowrap">
                          {formatFullDate(item.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContentDetail;
