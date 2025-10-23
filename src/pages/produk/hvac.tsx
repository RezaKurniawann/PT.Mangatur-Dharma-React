import Layout from '@/components/Layout';

const HVAC = () => {
  const products = [
    { title: 'Fuel Filter', img: 'assets/img/produk/fuel-filter.png' },
    { title: 'Oil Filter', img: 'assets/img/produk/oil-filter.png' },
    { title: 'Air Filter', img: 'assets/img/produk/air-filter.png' },
    { title: 'HVAC', img: 'assets/img/produk/hvac-filter.png' },
    { title: 'GTS Doladson', img: 'assets/img/produk/gts-doladson.png' },
    { title: 'Doub Conical', img: 'assets/img/produk/doub-conical.png' },
  ];
  return (
    <Layout>
      <div className="relative bg-gradient-to-r from-primary to-primary/90 text-white py-12 md:py-20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-5xl font-bold z-40">Filtration & HVAC </h1>
          </div>
        </div>
        <div className="absolute inset-0">
          <img src="\assets\img\item\bg-1.png" alt="Modern office building" className="w-full h-full object-cover opacity-90" />
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16 relative z-20">
        <div className="grid md:grid-cols-2 gap-12 mt-5 items-center bg-white p-10 rounded-xl shadow-lg">
          <div className="relative w-full md:w-auto">
            <div className="font-bold">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</div>
            <p className="mt-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et nesciunt repellat doloribus minima, autem dicta non exercitationem ullam inventore deserunt eum voluptatem! Vel amet veritatis dolorem omnis. Quas deleniti atque sint
              earum nisi aspernatur! Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis impedit laboriosam repellendus nisi eligendi nesciunt adipisci voluptatibus deserunt ipsam, magni quia distinctio minus maiores quam,
              doloribus sed illo. Nobis, nulla.
            </p>
          </div>
          <img src="assets\img\produk\air-filter.png" alt="" className="w-full h-auto max-w-[300px] max-h-[300px] mx-auto object-contain" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-18">
        <h2 className="text-3xl font-bold text-center mb-10">Our Related Product</h2>

        {/* Grid utama yang berisi 6 item produk */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg border border-blue-400 border-dashed transition-shadow hover:shadow-xl text-center">
              <h3 className="font-semibold text-lg mb-4">{product.title}</h3>
              <img src={product.img} alt={product.title} className="w-full h-auto max-w-[200px] mx-auto object-contain" />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default HVAC;
