import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import * as API from '@/lib/all.api';

interface Product {
  cdcdnm: string;
  cddesc: string;
  category: string;
  cdthum: string;
  file: string;
  cdremk: string;
  cdishd?: string;
  cdcsdt?: string;
  'cdcsdt::bpchar'?: string;
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
  const [goToPage, setGoToPage] = useState('');
  const [featuredProduct, setFeaturedProduct] = useState<Product | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const itemsPerPage = 6;

  // Convert slug back to code
  const slugToCode = (slug: string) => {
    return slug.toUpperCase().replace(/-/g, '_');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setNotFound(false);

        // Get category code from slug
        const categoryCode = slugToCode(categorySlug || '');

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
          const dateA = new Date(a.cdcsdt || a['cdcsdt::bpchar'] || 0).getTime();
          const dateB = new Date(b.cdcsdt || b['cdcsdt::bpchar'] || 0).getTime();
          return dateB - dateA; // Descending order (newest first)
        });

        // Set header product (cdishd = 1) as featured, or first product if no header
        const headerProduct = filteredProducts.find((p: Product) => p.cdishd === '1');
        if (headerProduct) {
          setFeaturedProduct(headerProduct);
          // Remove header product from the list to avoid duplication
          filteredProducts = filteredProducts.filter((p: Product) => p.cdcdnm !== headerProduct.cdcdnm);
        } else if (filteredProducts.length > 0) {
          setFeaturedProduct(filteredProducts[0]);
          // Remove first product from the list since it's shown as featured
          filteredProducts = filteredProducts.slice(1);
        }

        setProducts(filteredProducts);
        setCurrentPage(1); // Reset to first page when category changes
      } catch (error) {
        console.error('Error fetching data:', error);
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
      setGoToPage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
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
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Kategori Tidak Ditemukan</h1>
            <p className="text-gray-600 mb-8">Kategori produk yang Anda cari tidak tersedia.</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const isOtherCategory = category?.tssynm?.toLowerCase() === 'lainnya';
  const displayCategoryName = isOtherCategory ? 'Other Products' : category?.tssynm;

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary to-primary/90 text-white py-12 md:py-20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-5xl font-bold z-40">{displayCategoryName}</h1>
          </div>
        </div>
        <div className="absolute inset-0">
          <img 
            src="/assets/img/item/bg-1.png" 
            alt="Background" 
            className="w-full h-full object-cover opacity-90" 
          />
        </div>
      </div>

      {/* Description Section */}
      <div className="container mx-auto px-4 -mt-16 relative z-20">
        <div className="grid md:grid-cols-2 gap-12 mt-5 items-center bg-white p-10 rounded-xl shadow-lg">
          <div className="relative w-full md:w-auto">
            <div className="font-bold text-xl mb-4">
              {featuredProduct ? featuredProduct.cdcdnm : category?.tssynm}
            </div>
            <p className="mt-5 text-gray-700 leading-relaxed">
              {featuredProduct && featuredProduct.cddesc ? (
                featuredProduct.cddesc
              ) : featuredProduct && featuredProduct.cdremk ? (
                featuredProduct.cdremk
              ) : (
                <>
                  Kami menyediakan berbagai produk berkualitas tinggi dalam kategori {displayCategoryName}. 
                  Produk-produk kami dirancang dengan standar industri terbaik untuk memenuhi kebutuhan Anda. 
                  Dengan teknologi terkini dan material berkualitas, kami memastikan setiap produk memberikan 
                  performa optimal dan daya tahan yang lama. Tim ahli kami siap membantu Anda memilih produk 
                  yang paling sesuai dengan kebutuhan spesifik Anda.
                </>
              )}
            </p>
          </div>
          <div className="flex justify-center">
            {featuredProduct && featuredProduct.file ? (
              <img 
                src={featuredProduct.file} 
                alt={featuredProduct.cdcdnm} 
                className="w-full h-auto max-w-[300px] max-h-[300px] mx-auto object-contain" 
              />
            ) : products.length > 0 && products[0].file ? (
              <img 
                src={products[0].file} 
                alt={displayCategoryName || ''} 
                className="w-full h-auto max-w-[300px] max-h-[300px] mx-auto object-contain" 
              />
            ) : (
              <img 
                src="/assets/img/produk/air-filter.png" 
                alt="Product" 
                className="w-full h-auto max-w-[300px] max-h-[300px] mx-auto object-contain" 
              />
            )}
          </div>
        </div>
      </div>

      {/* Products Grid Section */}
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-center mb-10">Our Related Product</h2>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
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
                  style={{ height: '280px' }}
                >
                  {/* Default Content */}
                  <div className={`absolute inset-0 p-4 sm:p-6 flex flex-col sm:flex-row gap-3 sm:gap-4 transition-opacity duration-500 ${
                    hoveredIndex === index ? 'opacity-0' : 'opacity-100'
                  }`}>
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
                          className="max-w-full max-h-full object-contain"
                          style={{ maxHeight: '180px', maxWidth: '180px' }}
                        />
                      ) : (
                        <div className="flex items-center justify-center text-gray-300">
                          <svg className="w-12 h-12 sm:w-16 sm:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Hover Content - Description */}
                  <div className={`absolute inset-0 p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col justify-center transition-all duration-500 ${
                    hoveredIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}>
                    <div className="text-xs sm:text-sm text-gray-700 leading-relaxed overflow-y-auto max-h-full">
                      {product.cddesc || product.cdremk || 'Tidak ada deskripsi tersedia untuk produk ini.'}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex flex-col items-center justify-center gap-4 px-4">
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {/* Previous Button - Hide on first page */}
                  {currentPage > 1 && (
                    <button
                      onClick={handlePreviousPage}
                      className="px-4 sm:px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm sm:text-base whitespace-nowrap"
                    >
                      Previous
                    </button>
                  )}

                  {/* Page Info */}
                  <span className="text-gray-600 font-medium text-sm sm:text-base whitespace-nowrap">
                    Page {currentPage} of {totalPages}
                  </span>

                  {/* Next Button - Hide on last page */}
                  {currentPage < totalPages && (
                    <button
                      onClick={handleNextPage}
                      className="px-4 sm:px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm sm:text-base whitespace-nowrap"
                    >
                      Next
                    </button>
                  )}
                </div>

                {/* Go To Page Input - Separate row on mobile */}
                <div className="flex items-center gap-2">
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
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default ProductCategory;