import Layout from '@/components/Layout';
import { useState, useEffect } from 'react';
import { getListEvents } from '@/lib/event.api';
import { cn } from '@/lib/utils';

const NewsCard = ({ news, isTopNews = false }) => {
  const imageUrl = news.thumbnail ? `http://172.25.0.114:8080/a7mangatur/${news.thumbnail}` : '/assets/img/placeholder.svg'; // Gunakan placeholder jika tidak ada gambar

  return (
    <div
      className={cn('bg-white rounded-md shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl', {
        'flex flex-col': !isTopNews,
        'flex flex-col md:flex-row gap-5 p-5': isTopNews,
      })}
    >
      <div
        className={cn('relative w-full overflow-hidden', {
          'h-64': !isTopNews,
          'h-52 md:h-48 md:w-52 flex-shrink-0': isTopNews,
        })}
      >

        <img src={imageUrl} alt={news.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 flex-1">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <span>By "{news.author || 'Nama Penulis'}"</span>
          <span>•</span>
          <span>{news.postingDate || '02 Juli 2025'}</span>
        </div>
        <h3 className="font-bold text-lg text-gray-800 line-clamp-2">{news.title}</h3>
        <p className="text-gray-600 mt-1 text-sm line-clamp-3">{news.description}</p>
      </div>
    </div>
  );
};

const Aktifitas = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    const data = await getListEvents(1, 10, category);
    console.log(data);
    setNewsData(data.list);
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, [category]);

  const topNews = newsData.slice(0, 4);
  const latestNews = newsData.slice(4);

  return (
    <Layout>
      <div className="relative bg-gradient-to-r from-primary to-primary/90 text-white py-10 md:py-18">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-5xl font-bold z-50">Berita & Aktifitas</h1>
          </div>
        </div>
        <div className="absolute inset-0">
          <img src="/assets/img/item/bg-1.png" alt="Modern office building" className="w-full h-full object-cover opacity-90" />
        </div>
        <div className="absolute bottom-0 right-12 mr-10 transform translate-x-1/4 translate-y-1/4">
          <img src="/assets/img/item/icon-7.png" alt="About Us" className="w-36 sm:w-36 md:w-48 object-contain" />
        </div>
      </div>

      <div className="p-8 my-7">
        <div className="flex items-center">
          <div className="bg-primary h-12 w-1 mr-4"></div>
          <h2 className="text-2xl font-bold text-gray-800">Latest News</h2>
          <div className="flex-grow border-t-4 border-gray-700 ml-4"></div>
        </div>
      </div>

      <div className="mt-10 flex flex-col md:flex-row items-center gap-4 p-5">
        {/* Search bar */}
        <div className="flex-1 w-full">
          <input type="text" placeholder="Cari berita..." value={query} onChange={(e) => setQuery(e.target.value)} className="w-full border rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>

        {/* Dropdown Category */}
        <div>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="border rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="">Category</option>
            <option value="event">Event</option>
            <option value="news">News</option>
            <option value="announcement">Announcement</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p className="text-center my-10">Memuat berita...</p>
      ) : (
        <div className="container mx-auto px-4 py-5">
          {/* Bagian Latest News */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestNews.length > 0 ? latestNews.map((news, index) => <NewsCard key={index} news={news} />) : <p className="col-span-full text-center">Tidak ada berita terbaru.</p>}
          </div>
          <div className="text-center mt-8">
            <button className="bg-primary text-white py-2 px-6 rounded-md shadow-lg transition-colors duration-300 hover:bg-primary/80">Read More</button>
          </div>
        </div>
      )}

      {/* Bagian Top News */}
      {topNews.length > 0 && (
        <>
          <div className="p-8 my-7">
            <div className="flex items-center">
              <div className="bg-primary h-12 w-1 mr-4"></div>
              <h2 className="text-2xl font-bold text-gray-800">Top News</h2>
              <div className="flex-grow border-t-4 border-gray-700 ml-4"></div>
            </div>
          </div>
          <div className="container mx-auto px-4 py-5">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
              {topNews.map((news, index) => (
                <NewsCard key={index} news={news} isTopNews={true} />
              ))}
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Aktifitas;
