import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleDropdownToggle = (menu: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const handleDropdownHover = (menu: string) => {
    if (!isMobileMenuOpen) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setActiveDropdown(menu);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobileMenuOpen) {
      timeoutRef.current = setTimeout(() => {
        setActiveDropdown(null);
      }, 300);
    }
  };

  const handleDropdownEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveDropdown(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header ref={headerRef} className="bg-gradient-to-l from-[#8EE2FF] via-[#C0FFFE] to-white shadow-sm z-50 sticky top-0">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img src="/assets/img/logo/logomd-blb.png" alt="PT Mangatur Dharma Logo" className="w-30 h-14 rounded-full" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8" onMouseLeave={handleMouseLeave}>
          <Link to="/" className="text-[#003138] hover:text-[#003138]/80 font-medium">
            Home
          </Link>

          {/* Profil Dropdown */}
          <div className="relative">
            <button onClick={() => handleDropdownToggle('profil')} onMouseEnter={() => handleDropdownHover('profil')} className="flex items-center space-x-1 text-[#003138] hover:text-[#003138]/80 font-medium">
              <span>Profil</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'profil' ? 'rotate-180' : ''}`} />
            </button>
            {activeDropdown === 'profil' && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-[var(--shadow-dropdown)] border border-gray-200 py-2 z-50" onMouseEnter={handleDropdownEnter} onMouseLeave={handleMouseLeave}>
                <Link to="/tentang-perusahaan" className="block px-4 py-2 text-gray-700 hover:bg-secondary hover:text-primary transition-colors" onClick={() => setActiveDropdown(null)}>
                  Tentang Perusahaan
                </Link>
                <Link to="/jejak-langkah" className="block px-4 py-2 text-gray-700 hover:bg-secondary hover:text-primary transition-colors" onClick={() => setActiveDropdown(null)}>
                  Jejak Langkah
                </Link>
                <Link to="/visi-misi" className="block px-4 py-2 text-gray-700 hover:bg-secondary hover:text-primary transition-colors" onClick={() => setActiveDropdown(null)}>
                  Visi & Misi
                </Link>
              </div>
            )}
          </div>

          {/* Produk Dropdown */}
          <div className="relative">
            <button onClick={() => handleDropdownToggle('produk')} onMouseEnter={() => handleDropdownHover('produk')} className="flex items-center space-x-1 text-[#003138] hover:text-[#003138]/80 font-medium">
              <span>Produk</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'produk' ? 'rotate-180' : ''}`} />
            </button>
            {activeDropdown === 'produk' && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-[var(--shadow-dropdown)] border border-gray-200 py-2 z-50" onMouseEnter={handleDropdownEnter} onMouseLeave={handleMouseLeave}>
                <Link to="/air-filter" className="block px-4 py-2 text-gray-700 hover:bg-secondary hover:text-primary transition-colors" onClick={() => setActiveDropdown(null)}>
                  Air Filter
                </Link>
                <Link to="/fuel-lube-fuel" className="block px-4 py-2 text-gray-700 hover:bg-secondary hover:text-primary transition-colors" onClick={() => setActiveDropdown(null)}>
                  Fuel & Lube Fuel
                </Link>
                <Link to="/hvac" className="block px-4 py-2 text-gray-700 hover:bg-secondary hover:text-primary transition-colors" onClick={() => setActiveDropdown(null)}>
                  HVAC
                </Link>
                <Link to="/air-purifier" className="block px-4 py-2 text-gray-700 hover:bg-secondary hover:text-primary transition-colors" onClick={() => setActiveDropdown(null)}>
                  Air Purifier
                </Link>
                <Link to="/raditor" className="block px-4 py-2 text-gray-700 hover:bg-secondary hover:text-primary transition-colors" onClick={() => setActiveDropdown(null)}>
                  Raditor
                </Link>
                <Link to="/lainnya" className="block px-4 py-2 text-gray-700 hover:bg-secondary hover:text-primary transition-colors" onClick={() => setActiveDropdown(null)}>
                  Lainnya
                </Link>
              </div>
            )}
          </div>

          <Link to="/our-category" className="text-[#003138] hover:text-[#003138]/80 font-medium">
            Our Category
          </Link>

          {/* Berita Dropdown */}
          <div className="relative">
            <button onClick={() => handleDropdownToggle('berita')} onMouseEnter={() => handleDropdownHover('berita')} className="flex items-center space-x-1 text-[#003138] hover:text-[#003138]/80 font-medium">
              <span>Berita</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'berita' ? 'rotate-180' : ''}`} />
            </button>
            {activeDropdown === 'berita' && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-[var(--shadow-dropdown)] border border-gray-200 py-2 z-50" onMouseEnter={handleDropdownEnter} onMouseLeave={handleMouseLeave}>
                <Link to="/penghargaan" className="block px-4 py-2 text-gray-700 hover:bg-secondary hover:text-primary transition-colors" onClick={() => setActiveDropdown(null)}>
                  Penghargaan
                </Link>
                <Link to="/aktifitas" className="block px-4 py-2 text-gray-700 hover:bg-secondary hover:text-primary transition-colors" onClick={() => setActiveDropdown(null)}>
                  Aktifitas
                </Link>
                <Link to="/artikel" className="block px-4 py-2 text-gray-700 hover:bg-secondary hover:text-primary transition-colors" onClick={() => setActiveDropdown(null)}>
                  Artikel
                </Link>
                <Link to="/daftar-pelanggan" className="block px-4 py-2 text-gray-700 hover:bg-secondary hover:text-primary transition-colors" onClick={() => setActiveDropdown(null)}>
                  Daftar Pelanggan
                </Link>
              </div>
            )}
          </div>

          <Link to="/kontak" className="text-[#003138] hover:text-[#003138]/80 font-medium">
            Kontak
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button onClick={toggleMobileMenu} className="md:hidden text-[#003138] hover:text-[#003138]/80 rounded-md transition-colors" aria-label="Toggle mobile menu">
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <Link to="/" className="block text-[#003138] hover:text-[#003138]/80 font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>

            {/* Mobile Profil Dropdown */}
            <div>
              <button onClick={() => handleDropdownToggle('profil-mobile')} className="flex items-center justify-between w-full text-[#003138] hover:text-[#003138]/80 font-medium py-2">
                <span>Profil</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'profil-mobile' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'profil-mobile' && (
                <div className="ml-4 mt-2 space-y-2">
                  <Link to="/tentang-perusahaan" className="block text-gray-600 hover:text-[#003138] py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    Tentang Perusahaan
                  </Link>
                  <Link to="/jejak-langkah" className="block text-gray-600 hover:text-primary py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    Jejak Langkah
                  </Link>
                  <Link to="/visi-misi" className="block text-gray-600 hover:text-primary py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    Visi & Misi
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Produk Dropdown */}
            <div>
              <button onClick={() => handleDropdownToggle('produk-mobile')} className="flex items-center justify-between w-full text-[#003138] hover:text-[#003138]/80 font-medium py-2">
                <span>Produk</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'produk-mobile' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'produk-mobile' && (
                <div className="ml-4 mt-2 space-y-2">
                  <Link to="/air-filter" className="block text-gray-600 hover:text-primary py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    Air Filter
                  </Link>
                  <Link to="/fuel-lube-fuel" className="block text-gray-600 hover:text-primary py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    Fuel & Lube Fuel
                  </Link>
                  <Link to="/hvac" className="block text-gray-600 hover:text-primary py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    HVAC
                  </Link>
                  <Link to="/air-purifier" className="block text-gray-600 hover:text-primary py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    Air Purifier
                  </Link>
                  <Link to="/raditor" className="block text-gray-600 hover:text-primary py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    Raditor
                  </Link>
                  <Link to="/lainnya" className="block text-gray-600 hover:text-primary py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    Lainnya
                  </Link>
                </div>
              )}
            </div>

            <Link to="/our-category" className="block text-[#003138] hover:text-[#003138]/80 font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>
              Our Category
            </Link>

            {/* Mobile Berita Dropdown */}
            <div>
              <button onClick={() => handleDropdownToggle('berita-mobile')} className="flex items-center justify-between w-full text-[#003138] hover:text-[#003138]/80 font-medium py-2">
                <span>Berita</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'berita-mobile' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'berita-mobile' && (
                <div className="ml-4 mt-2 space-y-2">
                  <Link to="/penghargaan" className="block text-gray-600 hover:text-primary py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    Penghargaan
                  </Link>
                  <Link to="/aktifitas" className="block text-gray-600 hover:text-primary py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    Aktifitas
                  </Link>
                  <Link to="/artikel" className="block text-gray-600 hover:text-primary py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    Artikel
                  </Link>
                  <Link to="/daftar-pelanggan" className="block text-gray-600 hover:text-primary py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    Daftar Pelanggan
                  </Link>
                </div>
              )}
            </div>
            <Link to="/kontak" className="block text-[#003138] hover:text-[#003138]/80 font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>
              Kontak
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
