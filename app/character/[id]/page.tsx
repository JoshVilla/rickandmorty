"use client";

import { getCharacter } from "@/service/api";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import { ArrowLeft, Clapperboard, LocateIcon, MapPin } from "lucide-react";
import EpisodeItem from "@/components/EpisodeItem";
import CharacterInfoSkeleton from "@/components/ui/skeleton/CharacterInfoSkeleton";

const CharacterPage = () => {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const characterId =
    typeof id === "string" ? id : Array.isArray(id) ? id[0] : "";

  const {
    data: character,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["character", characterId],
    queryFn: () => getCharacter(characterId),
    enabled: !!characterId,
  });

  // --- Loading state ---
  if (isLoading) return <CharacterInfoSkeleton />;

  // --- Error / Not Found ---
  if (isError || character.error) {
    throw new Error("Character not found");
  }

  return (
    <div className="w-full py-10 px-4">
      <div className="w-full md:w-3/4 lg:w-2/3 mx-auto">
        {/* Back button */}
        <div
          className="flex items-center my-4 hover:underline cursor-pointer gap-2"
          onClick={() => router.back()}
        >
          <ArrowLeft />
          <span>Go Back</span>
        </div>

        <div className="flex h-[500px] flex-col lg:flex-row border border-gray-600 rounded-lg overflow-hidden">
          {/* Character Image + Info */}
          <div className="flex-1 relative overflow-hidden h-64 md:h-64 lg:h-auto">
            <Image
              src={character?.image ?? "/default.png"}
              alt={character?.name ?? "Unknown character"}
              fill
              className="object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

            {/* Character Info */}
            <div className="absolute bottom-0 left-0 p-4">
              <div className="space-x-2">
                <span className="text-2xl font-bold text-white">
                  {character?.name}
                </span>
                <span className="text-xs">
                  {character?.gender === "Male" ? "♂" : "♀"}
                </span>
              </div>
              <p className="text-sm text-gray-400">{character?.species}</p>

              {/* Extra Info */}
              <div className="mt-6 flex gap-6">
                {/* Location */}
                <div className="flex flex-col items-center gap-1">
                  <LocateIcon size={16} />
                  <span className="text-xs text-gray-400 text-center">
                    {character?.location?.name === "unknown"
                      ? "Unknown location"
                      : character?.location?.name}
                  </span>
                </div>

                {/* Origin */}
                <div className="flex flex-col items-center gap-1">
                  <MapPin size={16} />
                  <span className="text-xs text-gray-400 text-center">
                    {character?.origin?.name === "unknown"
                      ? "Unknown origin"
                      : character?.origin?.name}
                  </span>
                </div>

                {/* Episodes */}
                <div className="flex-1 flex flex-col items-center gap-1">
                  <Clapperboard size={16} />
                  <span className="text-xs text-gray-400 text-center">
                    {character?.episode?.length ?? 0} Episode/s
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Episodes List */}
          <div className="flex-1">
            <div className="p-4">
              <div className="text-2xl font-bold mb-4">List of Episodes</div>
              <div className="overflow-y-auto max-h-96 space-y-4 custom-scrollbar p-2">
                {character?.episode?.map((episode: string, index: number) => (
                  <EpisodeItem key={index} urlEpisode={episode} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterPage;
