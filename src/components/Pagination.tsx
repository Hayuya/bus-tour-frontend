import React from 'react';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex justify-center mt-8 mb-6">
    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i}
        onClick={() => onPageChange(i + 1)}
        className={`w-8 h-8 mx-1 rounded ${
          currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white'
        }`}
      >
        {i + 1}
      </button>
    ))}
    {currentPage < totalPages && (
      <button
        onClick={() => onPageChange(currentPage + 1)}
        className="w-8 h-8 ml-1 bg-white rounded"
      >
        次へ
      </button>
    )}
  </div>
);

export default Pagination;
