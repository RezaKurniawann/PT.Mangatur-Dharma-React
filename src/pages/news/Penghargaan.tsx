import Layout from "@/components/Layout";
import React, { useState, useEffect } from "react";
import { getListAwards } from "@/lib/awards.api";
import { ChevronLeft, ChevronRight, X, Search, Calendar } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AwardDetail {
  dwpinoiy: number;
  file: string;
  file_name: string;
  file_size: string;
}

interface Award {
  cwtitl: string;
  cwdesc: string;
  cwdate: string;
  file: string;
  detail: AwardDetail[];
}

const Penghargaan = () => {
  const [awards, setAwards] = useState<Award[]>([]);
  const [filteredAwards, setFilteredAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState<string[]>([]);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const startDateInputRef = React.useRef<HTMLInputElement>(null);
  const endDateInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchAwards = async () => {
      setLoading(true);
      try {
        const data = await getListAwards();
        const sortedData = data.sort((a: any, b: any) => {
          // Sort by cwdate (format: YYYYMMDD) descending (terbaru dulu)
          return parseInt(b.cwdate) - parseInt(a.cwdate);
        });
        setAwards(sortedData);
        setFilteredAwards(sortedData);
      } catch (error) {
        console.error("Gagal memuat data penghargaan:", error);
      }
      setLoading(false);
    };
    fetchAwards();
  }, []);

  // Format cwdate (YYYYMMDD) to "27 Okt 2025"
  const formatDateDisplay = (dateStr: string): string => {
    if (!dateStr || dateStr.length !== 8) return "";

    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ];
    const monthIndex = parseInt(month) - 1;

    return `${parseInt(day)} ${monthNames[monthIndex]} ${year}`;
  };

  // Convert date input (YYYY-MM-DD) to cwdate format (YYYYMMDD)
  const convertToDateFormat = (dateInput: string): string => {
    if (!dateInput) return "";
    return dateInput.replace(/-/g, "");
  };

  // Handle date selection from hidden input
  const handleStartDateSelect = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (!value) return;

    const formatted = convertToDateFormat(value);
    setStartDate(formatted);

    const data = await getListAwards(formatted, endDate);

    const sortedData = data.sort((a: any, b: any) => {
      return parseInt(b.cwdate) - parseInt(a.cwdate);
    });

    setFilteredAwards(sortedData);
  };

  const handleEndDateSelect = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (!value) return;

    const formatted = convertToDateFormat(value);
    setEndDate(formatted);

    const data = await getListAwards(startDate, formatted);

    const sortedData = data.sort((a: any, b: any) => {
      return parseInt(b.cwdate) - parseInt(a.cwdate);
    });

    setFilteredAwards(sortedData);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      const keyword = searchTerm.toLowerCase();

      const result = awards.filter((award) => {
        return (
          award.cwtitl.toLowerCase().includes(keyword) ||
          award.cwdesc.toLowerCase().includes(keyword)
        );
      });

      setFilteredAwards(result);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm, awards]);

  const getAllImages = (award: Award): string[] => {
    const images = [award.file];
    if (award.detail && award.detail.length > 0) {
      award.detail.forEach((detail) => {
        if (detail.file) {
          images.push(detail.file);
        }
      });
    }
    return images;
  };

  const openImagePreview = (images: string[], index: number) => {
    setCurrentImages(images);
    setCurrentImageIndex(index);
    setSelectedImage(images[index]);
  };

  const closeImagePreview = () => {
    setSelectedImage(null);
    setCurrentImages([]);
    setCurrentImageIndex(0);
  };

  const goToPrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex =
      currentImageIndex > 0 ? currentImageIndex - 1 : currentImages.length - 1;
    setCurrentImageIndex(newIndex);
    setSelectedImage(currentImages[newIndex]);
  };

  const goToNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex =
      currentImageIndex < currentImages.length - 1 ? currentImageIndex + 1 : 0;
    setCurrentImageIndex(newIndex);
    setSelectedImage(currentImages[newIndex]);
  };

  const resetFilters = async () => {
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
    const data = await getListAwards();
    const sortedData = data.sort((a: any, b: any) => {
      // Sort by cwdate (format: YYYYMMDD) descending (terbaru dulu)
      return parseInt(b.cwdate) - parseInt(a.cwdate);
    });
    setAwards(sortedData);
    setFilteredAwards(sortedData);
  };

  const AwardCard = ({ award, index }: { award: Award; index: number }) => {
    const allImages = getAllImages(award);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [showDescriptionTooltip, setShowDescriptionTooltip] = useState(false);

    const handlePrevSlide = (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentSlide((prev) => (prev > 0 ? prev - 1 : allImages.length - 1));
    };

    const handleNextSlide = (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentSlide((prev) => (prev < allImages.length - 1 ? prev + 1 : 0));
    };

    const isDescriptionLong = award.cwdesc && award.cwdesc.length > 100;

    return (
      <div
        key={index}
        className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
      >
        {/* Image Carousel */}
        <div className="relative h-64 rounded-lg overflow-hidden flex justify-center items-center bg-gray-50 group">
          <img
            src={allImages[currentSlide]}
            alt={`${award.cwtitl} - Image ${currentSlide + 1}`}
            className="max-w-full max-h-full object-contain cursor-pointer"
            onClick={() => openImagePreview(allImages, currentSlide)}
          />

          {allImages.length > 1 && (
            <>
              <button
                onClick={handlePrevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {allImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentSlide(idx);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === currentSlide
                        ? "bg-white w-6"
                        : "bg-white/50 hover:bg-white/75"
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}

          {allImages.length > 1 && (
            <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full z-10">
              {currentSlide + 1} / {allImages.length}
            </div>
          )}
        </div>

        {/* Award Info */}
        <h3 className="font-bold text-xl text-center mt-4 text-gray-800">
          {award.cwtitl}
        </h3>

        <div className="relative mt-2">
          <Tooltip>
            <TooltipTrigger>
              <p
                className={`text-center mt-2 text-gray-600 text-sm line-clamp-3 ${
                  isDescriptionLong ? "cursor-help" : ""
                }`}
                // onMouseEnter={() =>
                //   isDescriptionLong && setShowDescriptionTooltip(true)
                // }
                // onMouseLeave={() => setShowDescriptionTooltip(false)}
              >
                {award.cwdesc}
              </p>
            </TooltipTrigger>
            <TooltipContent className="max-w-md max-h-60 overflow-auto bg-gray-900 text-white text-sm rounded-lg p-4 text-center">
              <p>{award.cwdesc}</p>
            </TooltipContent>
          </Tooltip>

          {/* {showDescriptionTooltip && isDescriptionLong && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-80 max-w-[90vw] bg-gray-900 text-white text-sm rounded-lg p-4 shadow-xl z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="max-h-60 overflow-y-auto">{award.cwdesc}</div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
                <div className="border-8 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          )} */}
        </div>
      </div>
    );
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary to-primary/90 text-white py-10 md:py-18">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-5xl font-bold z-50">Penghargaan</h1>
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
            src={`${import.meta.env.BASE_URL}/assets/img/item/icon-6.png`}
            alt="Awards Icon"
            className="w-36 sm:w-36 md:w-48 md:h-[calc(15vh)] object-contain "
          />
        </div>
      </div>

      {/* Section Title */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex items-center">
          <div className="bg-primary h-12 w-1 mr-4"></div>
          <h2 className="text-2xl font-bold text-gray-800">
            Semua Penghargaan
          </h2>
          <div className="flex-grow border-t-4 border-gray-700 ml-4"></div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="container mx-auto px-4 pb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cari Penghargaan
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari judul atau deskripsi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tanggal Awal
              </label>
              <div className="relative">
                <input
                  type="date"
                  onInput={handleStartDateSelect}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-datetime-edit]:opacity-0"
                />
                {startDate ? (
                  <div className="absolute inset-0 flex items-center px-4 pointer-events-none">
                    <span className="text-gray-900">
                      {formatDateDisplay(startDate)}
                    </span>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center px-4 pointer-events-none">
                    <span className="text-gray-400">Pilih tanggal awal</span>
                  </div>
                )}
                {startDate && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setStartDate("");
                      if (startDateInputRef.current) {
                        startDateInputRef.current.value = "";
                      }
                    }}
                    className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tanggal Akhir
              </label>
              <div className="relative">
                <input
                  ref={endDateInputRef}
                  type="date"
                  onInput={handleEndDateSelect}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-datetime-edit]:opacity-0"
                />
                {endDate ? (
                  <div className="absolute inset-0 flex items-center px-4 pointer-events-none">
                    <span className="text-gray-900">
                      {formatDateDisplay(endDate)}
                    </span>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center px-4 pointer-events-none">
                    <span className="text-gray-400">Pilih tanggal akhir</span>
                  </div>
                )}
                {endDate && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEndDate("");
                      if (endDateInputRef.current) {
                        endDateInputRef.current.value = "";
                      }
                    }}
                    className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Menampilkan{" "}
              <span className="font-semibold text-primary">
                {filteredAwards.length}
              </span>{" "}
              dari <span className="font-semibold">{awards.length}</span>{" "}
              penghargaan
            </div>
            {(searchTerm || startDate || endDate) && (
              <button
                onClick={resetFilters}
                className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Reset Filter
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Awards Grid */}
      <div className="container mx-auto px-4 pb-16">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-gray-600">Memuat data penghargaan...</p>
            </div>
          </div>
        ) : filteredAwards.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAwards.map((award, index) => (
              <AwardCard key={index} award={award} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-200 mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Tidak Ada Hasil
            </h3>
            <p className="text-gray-500 mb-4">
              Tidak ada penghargaan yang sesuai dengan filter Anda.
            </p>
            {(searchTerm || startDate || endDate) && (
              <button
                onClick={resetFilters}
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Reset Filter
              </button>
            )}
          </div>
        )}
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeImagePreview}
        >
          <button
            onClick={closeImagePreview}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50"
            aria-label="Close preview"
          >
            <X className="w-8 h-8" />
          </button>

          {currentImages.length > 1 && (
            <>
              <button
                onClick={goToPrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors z-50"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <button
                onClick={goToNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors z-50"
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          <div className="max-w-6xl max-h-[90vh] flex items-center justify-center">
            <img
              src={selectedImage}
              alt="Preview"
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {currentImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm z-50">
              {currentImageIndex + 1} / {currentImages.length}
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default Penghargaan;
