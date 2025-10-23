import Layout from '@/components/Layout';

const Artikel = () => {
  return (
    <Layout>
      <div className="relative bg-gradient-to-r from-primary to-primary/90 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold">Artikel</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="bg-white p-8 rounded-lg shadow-[var(--shadow-card)] text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Halaman dalam pengembangan</h2>
          <p className="text-gray-600">Konten artikel akan segera tersedia.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Artikel;
