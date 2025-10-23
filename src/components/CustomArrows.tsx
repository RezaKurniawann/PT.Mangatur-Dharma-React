import React from 'react';

// Mendefinisikan interface untuk props panah
interface CustomArrowProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

// Komponen panah sebelumnya
export const PrevArrow: React.FC<CustomArrowProps> = ({ onClick }) => (
  <div
    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer 
                   bg-gray-800 bg-opacity-50 text-white rounded-full p-2 
                   hover:bg-opacity-75 transition-all"
    onClick={onClick}
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
  </div>
);

// Komponen panah berikutnya
export const NextArrow: React.FC<CustomArrowProps> = ({ onClick }) => (
  <div
    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer 
                   bg-gray-800 bg-opacity-50 text-white rounded-full p-2 
                   hover:bg-opacity-75 transition-all"
    onClick={onClick}
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  </div>
);
