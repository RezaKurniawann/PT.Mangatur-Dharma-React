import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import * as API from "@/lib/all.api";

interface Product {
  cdcdnm: string;
  cddesc: string;
  category: string;
  cdthum: string;
  file: string;
  cdremk: string;
  cdishd?: string;
  cdcsdt?: string;
  "cdcsdt::bpchar"?: string;
}

interface ProductCategory {
  tssycd: string;
  tssynm: string;
}

const ProductCategory = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<ProductCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [goToPage, setGoToPage] = useState("");
  const [featuredProduct, setFeaturedProduct] = useState<Product | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const itemsPerPage = 6;

  // Convert slug back to code
  const slugToCode = (slug: string) => {
    return slug.toUpperCase().replace(/-/g, "_");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setNotFound(false);

        // Get category code from slug
        const categoryCode = slugToCode(categorySlug || "");

        // Fetch categories to get the category name
        const categories = await API.getProductCategories();
        const foundCategory = categories.find(
          (cat: ProductCategory) => cat.tssycd === categoryCode
        );

        if (!foundCategory) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        setCategory(foundCategory);

        // Fetch all products
        const allProducts = await API.getListProducts();

        // Filter products by category name (tssynm matches category field in products)
        let filteredProducts = allProducts.filter(
          (product: Product) => product.category === foundCategory.tssynm
        );

        // Sort by cdcsdt descending (newest first)
        filteredProducts = filteredProducts.sort((a: Product, b: Product) => {
          const dateA = new Date(
            a.cdcsdt || a["cdcsdt::bpchar"] || 0
          ).getTime();
          const dateB = new Date(
            b.cdcsdt || b["cdcsdt::bpchar"] || 0
          ).getTime();
          return dateB - dateA; // Descending order (newest first)
        });

        // Set header product (cdishd = 1) as featured, or first product if no header
        const headerProduct = filteredProducts.find(
          (p: Product) => p.cdishd === "1"
        );
        if (headerProduct) {
          console.log("hello header product ada");
          setFeaturedProduct(headerProduct);
          // Remove header product from the list to avoid duplication
          filteredProducts = filteredProducts.filter(
            (p: Product) => p.cdcdnm !== headerProduct.cdcdnm
          );
        } else if (filteredProducts.length > 0) {
          console.log("hello header product tidak ada");
          setFeaturedProduct(filteredProducts[0]);
          // Remove first product from the list since it's shown as featured
          filteredProducts = filteredProducts.slice(1);
        } else {
          console.log("tidak ada");
          setFeaturedProduct(null);
          filteredProducts = [];
        }

        setProducts(filteredProducts);
        setCurrentPage(1); // Reset to first page when category changes
      } catch (error) {
        console.error("Error fetching data:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categorySlug]);

  // Calculate pagination
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  // Pagination handlers
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleGoToPage = () => {
    const pageNum = parseInt(goToPage);
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
      setGoToPage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleGoToPage();
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-600">Memuat produk...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (notFound) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Kategori Tidak Ditemukan
            </h1>
            <p className="text-gray-600 mb-8">
              Kategori produk yang Anda cari tidak tersedia.
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const isOtherCategory = category?.tssynm?.toLowerCase() === "lainnya";
  const displayCategoryName = isOtherCategory
    ? "Other Products"
    : category?.tssynm;
  const maintenanceImageSrc = `${
    import.meta.env.BASE_URL
  }/assets/img/produk/maintenance.png`;
  const featuredContentHtml =
    featuredProduct?.cddesc?.trim() || featuredProduct?.cdremk?.trim() || "";
  const hasFeaturedContent = Boolean(featuredContentHtml);
  const featuredImageSrc =
    (hasFeaturedContent
      ? featuredProduct?.file || products[0]?.file
      : maintenanceImageSrc) || maintenanceImageSrc;
  const featuredImageAlt =
    featuredProduct?.cdcdnm || displayCategoryName || "Product";

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary to-primary/90 text-white py-12 md:py-20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-5xl font-bold z-40">
              {displayCategoryName}
            </h1>
          </div>
        </div>
        <div className="absolute inset-0">
          <img
            src={`${import.meta.env.BASE_URL}/assets/img/item/bg-2.png`}
            alt="Background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
      </div>

      {/* Description Section */}
      <div className="container mx-auto px-4 -mt-16 relative z-20">
        {hasFeaturedContent ? (
          <div className="mt-5 grid gap-10 overflow-hidden rounded-[28px] bg-white/95 p-6 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.45)] ring-1 ring-primary/10 backdrop-blur md:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] md:p-10">
            <div className="flex flex-col">
              <div className="mt-5 space-y-4">
                <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
                  {displayCategoryName}
                </h2>
                <div className="h-1 w-20 rounded-full bg-gradient-to-r from-teal-dark via-primary to-teal-light" />
                {featuredProduct?.cdcdnm &&
                featuredProduct.cdcdnm !== displayCategoryName ? (
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-400">
                    {featuredProduct.cdcdnm}
                  </p>
                ) : null}
              </div>

              <div className="mt-8">
                <div
                  className="max-w-none text-[15px] leading-8 text-slate-600 [&_a]:font-semibold [&_a]:text-primary [&_a]:underline-offset-4 [&_a:hover]:underline [&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-primary/30 [&_blockquote]:pl-4 [&_blockquote]:italic [&_h1]:mb-4 [&_h1]:text-3xl [&_h1]:font-semibold [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_li]:mb-2 [&_ol]:my-4 [&_ol]:pl-6 [&_ol]:list-decimal [&_p]:mb-5 [&_p]:text-justify [&_strong]:font-semibold [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6"
                  dangerouslySetInnerHTML={{
                    __html: featuredContentHtml,
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative flex min-h-[320px] w-full items-center justify-center overflow-hidden rounded-[24px] bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.12),_transparent_55%),linear-gradient(145deg,rgba(255,255,255,1),rgba(240,249,255,0.95))] p-6 ring-1 ring-slate-200/80 shadow-inner md:min-h-[420px]">
                <div className="absolute inset-x-8 bottom-6 h-10 rounded-full bg-primary/10 blur-3xl" />
                <img
                  src={featuredImageSrc}
                  alt={featuredImageAlt}
                  className="relative z-10 mx-auto aspect-square w-full max-h-[500px] object-contain drop-shadow-[0_18px_30px_rgba(15,23,42,0.18)]"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-5 overflow-hidden rounded-[28px] bg-white px-6 py-10 shadow-[0_20px_55px_-28px_rgba(15,23,42,0.28)] ring-1 ring-slate-200/80 md:px-12 md:py-14">
            <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)]">
              <div className="max-w-2xl">
                <h2 className="text-4xl font-semibold tracking-tight text-slate-700 md:text-5xl">
                  Oops!
                </h2>
                <p className="mt-2 text-3xl font-semibold leading-tight text-slate-700 md:text-[3.35rem]">
                  This page is currently under construction!
                </p>
                <p className="mt-6 text-xl font-medium text-slate-700 md:text-2xl">
                  Please Stay Tuned!
                </p>
                <p className="mt-6 text-lg leading-8 text-slate-700/95 md:text-[1.45rem] md:leading-[1.35]">
                  Our team is working to make this feature available soon. Thank
                  you for your patience.
                </p>

                <button
                  onClick={() => navigate("/")}
                  className="mt-8 inline-flex items-center text-xl font-bold text-sky-500 transition-colors hover:text-primary md:text-[2rem]"
                >
                  [ Back to Home ]
                </button>
              </div>

              <div className="flex items-center justify-center md:justify-end">
                <img
                  src={maintenanceImageSrc}
                  alt="Under construction"
                  className="w-full max-w-[520px] object-contain"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {products.length !== 0 ? (
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mt-10 mb-10">
            Our Related Product
          </h2>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg
                  className="w-24 h-24 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                Belum Ada Produk
              </h3>
              <p className="text-gray-500">
                Produk dalam kategori ini akan segera hadir.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProducts.map((product, index) => (
                  <div
                    key={index}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="relative bg-white rounded-lg shadow-lg border-2 border-dashed border-blue-400 transition-all hover:shadow-xl overflow-hidden p-6 group"
                    style={{ height: "280px" }}
                  >
                    {/* Default Content */}
                    <div
                      className={`absolute inset-0 px-4 py-2 sm:px-6 sm:py-2 flex flex-col sm:flex-row gap-3 sm:gap-4 transition-opacity duration-500 ${
                        hoveredIndex === index ? "opacity-0" : "opacity-100"
                      }`}
                    >
                      {/* Product Name - Top on mobile, Left on desktop */}
                      <div className="flex-1 flex items-center justify-center sm:justify-start">
                        <h3 className="font-semibold text-sm sm:text-base text-center sm:text-left line-clamp-2 sm:line-clamp-4">
                          {product.cdcdnm}
                        </h3>
                      </div>

                      {/* Product Image - Bottom on mobile, Right on desktop */}
                      <div className="flex-1 flex items-center justify-center">
                        {product.file ? (
                          <img
                            src={product.file}
                            alt={product.cdcdnm}
                            className="w-full max-h-full aspect-square object-contain border shadow-xl rounded-md"
                            // style={{ maxHeight: "180px", maxWidth: "180px" }}
                          />
                        ) : (
                          <div className="flex items-center justify-center text-gray-300">
                            <svg
                              className="w-12 h-12 sm:w-16 sm:h-16"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Hover Content - Description */}
                    <div
                      className={`absolute inset-0 p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col justify-center transition-all duration-500 ${
                        hoveredIndex === index
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-95"
                      }`}
                    >
                      <div className="text-xs sm:text-sm text-gray-700 leading-relaxed overflow-y-auto max-h-full">
                        <div
                          className="prose max-w-none text-gray-700 leading-relaxed space-y-4 text-justify"
                          dangerouslySetInnerHTML={{
                            __html:
                              product.cddesc ||
                              product.cdremk ||
                              "Tidak ada deskripsi tersedia untuk produk ini.",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex flex-col justify-end gap-4 px-4">
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {/* Previous Button - Hide on first page */}

                    <button
                      onClick={handlePreviousPage}
                      className="px-4 sm:px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm sm:text-base whitespace-nowrap disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-400"
                      disabled={!(currentPage > 1)}
                    >
                      Previous
                    </button>

                    {/* Page Info */}
                    <span className="text-gray-600 font-medium text-sm sm:text-base whitespace-nowrap">
                      Page {currentPage} of {totalPages}
                    </span>

                    {/* Next Button - Hide on last page */}
                    {/* {currentPage < totalPages && (
              <button
                onClick={handleNextPage}
                className="px-4 sm:px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm sm:text-base whitespace-nowrap"
              >
                Next
              </button>
            )} */}

                    <button
                      onClick={handleNextPage}
                      className="px-4 sm:px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm sm:text-base whitespace-nowrap disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-400"
                      disabled={!(currentPage < totalPages)}
                    >
                      Next
                    </button>
                    {/* <input
              type="number"
              min="1"
              max={totalPages}
              value={goToPage}
              onChange={(e) => setGoToPage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Go to page"
              className="w-24 sm:w-28 px-2 sm:px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
            /> */}
                    {/* <button
              onClick={handleGoToPage}
              className="px-3 sm:px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium text-sm sm:text-base whitespace-nowrap"
            >
              Go
            </button> */}
                  </div>

                  {/* Go To Page Input - Separate row on mobile */}
                  {/* <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              max={totalPages}
              value={goToPage}
              onChange={(e) => setGoToPage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Go to page"
              className="w-24 sm:w-28 px-2 sm:px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
            />
            <button
              onClick={handleGoToPage}
              className="px-3 sm:px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium text-sm sm:text-base whitespace-nowrap"
            >
              Go
            </button>
          </div> */}
                </div>
              )}
            </>
          )}
        </div>
      ) : null}
    </Layout>
  );
};

export default ProductCategory;
