import React from "react";

const CharacterCardSkeleton = () => {
  return (
    <div>
      <div className="w-64 pb-4  rounded-lg shadow-md animate-pulse bg-gray-500">
        <div className="h-40 bg-gray-700 rounded mb-4" />
        <div className="px-2">
          <div className="h-4 bg-gray-700 rounded w-3/4 mb-2" />

          <div className="space-y-2">
            <div className="h-2 bg-gray-700 rounded w-16" />
            <div className="h-2 bg-gray-700 rounded w-16" />
            <div className="h-2 bg-gray-700 rounded w-16" />
            <div className="h-2 bg-gray-700 rounded w-16" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCardSkeleton;
