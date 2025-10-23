import Layout from '@/components/Layout';

const OurCategory = () => {
  return (
    <Layout>
      <div className="relative bg-gradient-to-r from-primary to-primary/90 text-white py-10 md:py-18">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-5xl font-bold z-50"> Our Category</h1>
          </div>
        </div>
        <div className="absolute inset-0">
          <img src="\assets\img\item\bg-1.png" alt="Modern office building" className="w-full h-full object-cover opacity-90" />
        </div>
        <div className="absolute bottom-0 right-12 mr-10 transform translate-x-1/4 translate-y-1/4">
          <img src="\assets\img\item\icon-5.png" alt="About Us" className="w-36 sm:w-36 md:w-48 object-contain animate-updown" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-15 ">
        {/* Category Section */}
        <div className="mt-12 grid md:grid-cols-4 gap-5">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <div className="h-64 rounded-lg overflow-hidden flex justify-center items-center">
              <img src=".\assets\img\item\category\ktgr1.png" alt="" className="max-w-full max-h-full object-contain" />
            </div>
            <h3 className="font-bold text-2xl text-center">Automotive</h3>
            <p className="text-center mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae architecto esse ab? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea dolorem debitis velit sed architecto quisquam dolor molestiae voluptas doloribus
              similique.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <div className="h-64 rounded-lg overflow-hidden flex justify-center items-center">
              <img src=".\assets\img\item\category\ktgr2.png" alt="" className="max-w-full max-h-full object-contain" />
            </div>
            <h3 className="font-bold text-2xl text-center">Heavy Duty</h3>
            <p className="text-center mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae architecto esse ab? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea dolorem debitis velit sed architecto quisquam dolor molestiae voluptas doloribus
              similique.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <div className="h-64 rounded-lg overflow-hidden flex justify-center items-center">
              <img src=".\assets\img\item\category\ktgr3.png" alt="" className="max-w-full max-h-full object-contain" />
            </div>
            <h3 className="font-bold text-2xl text-center">Industrial</h3>
            <p className="text-center mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae architecto esse ab? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea dolorem debitis velit sed architecto quisquam dolor molestiae voluptas doloribus
              similique.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <div className="h-64 rounded-lg overflow-hidden flex justify-center items-center">
              <img src=".\assets\img\item\category\ktgr4.png" alt="" className="max-w-full max-h-full object-contain" />
            </div>
            <h3 className="font-bold text-2xl text-center">HVAC</h3>
            <p className="text-center mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae architecto esse ab? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea dolorem debitis velit sed architecto quisquam dolor molestiae voluptas doloribus
              similique.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default OurCategory;
