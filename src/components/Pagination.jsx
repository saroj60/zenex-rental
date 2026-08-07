import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav className="flex justify-center items-center gap-3 sm:gap-4 mt-14 mb-6 w-full" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F8F6F1] border border-gray-200 text-gray-700 font-medium text-[16px] hover:bg-white hover:shadow-sm transition-all duration-250 ease-out disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ArrowLeft size={18} strokeWidth={2} />
        <span className="hidden sm:inline tracking-wide">Prev</span>
      </button>

      <div className="flex items-center gap-2">
        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="w-10 h-10 flex items-center justify-center text-gray-400 font-medium tracking-widest">
                ...
              </span>
            );
          }
          const isActive = currentPage === page;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              aria-current={isActive ? 'page' : undefined}
              className={`w-[42px] h-[42px] rounded-full flex items-center justify-center text-[16px] font-medium transition-all duration-250 ease-out border
                ${isActive 
                  ? 'bg-[#2C2C2C] text-white border-[#2C2C2C] shadow-md transform scale-[1.02]' 
                  : 'bg-[#F8F6F1] text-gray-700 border-gray-200 hover:bg-white hover:border-gray-300 hover:shadow-sm hover:scale-[1.02]'
                }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F8F6F1] border border-gray-200 text-gray-700 font-medium text-[16px] hover:bg-white hover:shadow-sm transition-all duration-250 ease-out disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <span className="hidden sm:inline tracking-wide">Next</span>
        <ArrowRight size={18} strokeWidth={2} />
      </button>
    </nav>
  );
};

export default Pagination;
