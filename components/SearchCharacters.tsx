"use client";

import { Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";

type Props = {
  onSearch: (search: string, status: string) => void;
  isSearching?: boolean;
  debounce?: number; // optional debounce delay
};

const SearchCharacters = ({ onSearch, isSearching }: Props) => {
  const [searchInput, setSearchInput] = useState("");
  const [status, setStatus] = useState("");

  // Debounce input
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(searchInput, status);
    }, 500);

    // Clear previous timeout if user types again
    return () => clearTimeout(handler);
  }, [searchInput, status, onSearch]);

  const handleReset = () => {
    setSearchInput("");
    setStatus("");
    onSearch("", "");
  };

  return (
    <div className="text-center flex gap-4 justify-center flex-wrap">
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search characters..."
        className="border border-gray-300 rounded-md px-2 py-1"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-1 bg-[#0a0a0a]"
      >
        <option value="">All Status</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>

      {isSearching && (
        <div className="flex items-center gap-2 mt-2 text-sm text-gray-400 justify-center">
          <Loader2 className="animate-spin h-4 w-4" />
          Searching...
        </div>
      )}

      <div className="flex space-x-3">
        <button
          onClick={handleReset}
          className="px-4 py-1 bg-gray-500 text-white rounded-md cursor-pointer hover:bg-gray-600 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default SearchCharacters;
