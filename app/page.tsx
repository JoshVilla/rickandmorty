"use client";

import ListItems from "@/components/CharacterItem";
import Pagination from "@/components/Pagination";
import SearchCharacters from "@/components/SearchCharacters";
import { searchCharacters } from "@/service/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CharacterCardSkeleton from "@/components/ui/skeleton/CharacterCardSkeleton";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = "";
  const initialStatus = "";

  const [page, setPage] = useState(Number(searchParams.get("page") || 1));
  const [search, setSearch] = useState(initialSearch);
  const [status, setStatus] = useState<"" | "alive" | "dead" | "unknown">(
    initialStatus
  );

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["characters", search, status, page],
    queryFn: () => searchCharacters(search, page, status),
    placeholderData: (prev) => prev,
  });

  const characterData = data?.results || [];

  const handleSearch = (searchTerm: string, statusFilter: string) => {
    setSearch(searchTerm);
    setStatus(statusFilter as "" | "alive" | "dead" | "unknown");
  };

  const renderContent = () => {
    if (isLoading || isFetching) {
      return Array.from({ length: 10 }, (_, index) => (
        <CharacterCardSkeleton key={index} />
      ));
    }

    if (isError) {
      return <p className="text-red-400">No results found</p>;
    }

    return characterData.map((item: any) => (
      <ListItems key={item.id} data={item} />
    ));
  };

  return (
    <div className="p-4 w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-2xl font-bold">
          Welcome to the Rick and Morty API
        </div>
        <button
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition cursor-pointer"
          onClick={() => router.push("/favorites")}
        >
          Favorites
        </button>
      </div>

      {/* Search */}
      <div className="my-10">
        <SearchCharacters isSearching={isFetching} onSearch={handleSearch} />
      </div>

      {/* Characters / Skeleton / Error */}
      <div className="mt-4 flex flex-wrap gap-4 justify-center">
        {renderContent()}
      </div>

      {/* Pagination */}
      {data?.info && (
        <Pagination
          info={data.info}
          currentPage={page}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
