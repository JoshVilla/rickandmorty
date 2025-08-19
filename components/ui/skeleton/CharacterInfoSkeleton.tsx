import React from "react";

const CharacterInfoSkeleton = () => {
  return (
    <div className="w-64 pb-4 shadow-md border-2 border-gray-600 overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="h-44 w-full bg-gray-700 relative overflow-hidden"></div>

      {/* Info Skeleton */}
      <div className="p-1 mt-4 flex flex-col gap-2">
        <div className="h-6 bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-600 rounded w-5/6"></div>
        <div className="h-4 bg-gray-600 rounded w-4/6"></div>
        <div className="h-4 bg-gray-600 rounded w-2/3"></div>
        <div className="h-4 bg-gray-600 rounded w-5/6"></div>
      </div>
    </div>
  );
};

export default CharacterInfoSkeleton;
