"use client";
import ListItems from "@/components/CharacterItem";
import { getFavorites } from "@/utils/helpers";
import { Character } from "@/utils/types";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const Favorites = () => {
  const router = useRouter();
  const [favorites, setFavorites] = useState<Character[]>([]);
  const [visibleCount, setVisibleCount] = useState(10); // show first 10 initially

  // Load favorites on the client
  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 10, favorites.length)); // load 10 more, max is total favorites
  };

  return (
    <div className="p-4">
      <div
        className="flex items-center my-4 hover:underline cursor-pointer gap-2"
        onClick={() => router.back()}
      >
        <ArrowLeft />
        <span>Go Back</span>
      </div>

      <h1 className="text-2xl font-bold text-center">My Favorite Characters</h1>

      <div className="mt-4 flex flex-wrap gap-4 justify-center">
        {favorites.slice(0, visibleCount).map((item) => (
          <ListItems key={item.id} data={item} />
        ))}
      </div>

      {favorites.length === 0 && (
        <div className="text-center">
          <span className="text-md text-gray-500 font-bold">
            You have no favorites{" "}
          </span>
        </div>
      )}

      {visibleCount < favorites.length && (
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
