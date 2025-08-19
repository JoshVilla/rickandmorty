"use client";

import React from "react";

interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

interface Props {
  info: Info;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ info, currentPage, onPageChange }: Props) => {
  // helper to create range of numbers
  const createPageNumbers = () => {
    const pages: (number | string)[] = [];
    const totalPages = info.pages;

    if (totalPages <= 7) {
      // show all pages if few
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // always show first
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // window of pages around current
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // always show last
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = createPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
      {/* Prev Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!info.prev}
        className={`px-3 py-1 rounded-lg border border-gray-600 text-sm transition 
          ${
            info.prev
              ? "hover:bg-gray-700 text-white"
              : "text-gray-400 cursor-not-allowed"
          }
        `}
      >
        Prev
      </button>

      {/* Page Numbers */}
      {pages.map((p, idx) =>
        typeof p === "number" ? (
          <button
            key={idx}
            onClick={() => onPageChange(p)}
            className={`px-3 py-1 rounded-lg border text-sm transition ${
              currentPage === p
                ? "bg-gray-700 text-white border-gray-500"
                : "border-gray-600 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {p}
          </button>
        ) : (
          <span key={idx} className="px-2 text-gray-400">
            {p}
          </span>
        )
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!info.next}
        className={`px-3 py-1 rounded-lg border border-gray-600 text-sm transition 
          ${
            info.next
              ? "hover:bg-gray-700 text-white"
              : "text-gray-400 cursor-not-allowed"
          }
        `}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
