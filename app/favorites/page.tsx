"use client";

import ListItems from "@/components/CharacterItem";
import { getFavorites } from "@/utils/helpers";
import { Character } from "@/utils/types";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";

const Favorites = () => {
  const router = useRouter();
  const [favorites, setFavorites] = useState<Character[]>([]);
  const [visibleCount, setVisibleCount] = useState(10); // show first 10 initially
  const [genderFilter, setGenderFilter] = useState<
    "All" | "Male" | "Female" | "Unknown"
  >("All");

  // Load favorites on the client
  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const filteredFavorites = useMemo(() => {
    if (genderFilter === "All") return favorites;
    return favorites.filter(
      (char) => char.gender.toLowerCase() === genderFilter.toLowerCase()
    );
  }, [favorites, genderFilter]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 10, filteredFavorites.length));
  };

  return (
    <div className="p-4">
      {/* Back button */}
      <div
        className="flex items-center my-4 hover:underline cursor-pointer gap-2"
        onClick={() => router.back()}
      >
        <ArrowLeft />
        <span>Go Back</span>
      </div>

      <h1 className="text-2xl font-bold text-center">My Favorite Characters</h1>

      {/* Gender filter */}
      <div className="flex justify-center gap-4 mt-4">
        {["All", "Male", "Female", "Unknown"].map((gender) => (
          <button
            key={gender}
            className={`px-4 py-2 rounded ${
              genderFilter === gender
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => {
              setGenderFilter(gender as "All" | "Male" | "Female");
              setVisibleCount(10); // reset visible count when filter changes
            }}
          >
            {gender}
          </button>
        ))}
      </div>

      {/* Favorites list */}
      <div className="mt-4 flex flex-wrap gap-4 justify-center">
        {filteredFavorites.slice(0, visibleCount).map((item) => (
          <ListItems key={item.id} data={item} />
        ))}
      </div>

      {filteredFavorites.length === 0 && (
        <div className="text-center mt-6">
          <span className="text-md text-gray-500 font-bold">
            No favorites found for selected gender
          </span>
        </div>
      )}

      {visibleCount < filteredFavorites.length && (
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Favorites;
