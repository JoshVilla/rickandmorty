"use client";

import { getCharacter } from "@/service/api";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Clapperboard,
  Heart,
  LocateIcon,
  MapPin,
} from "lucide-react";
import EpisodeItem from "@/components/EpisodeItem";
import CharacterInfoSkeleton from "@/components/ui/skeleton/CharacterInfoSkeleton";
import { addFavorite, removeFavorite, isFavorite } from "@/utils/helpers";

const CharacterPage = () => {
  const [favorite, setFavorite] = useState(false);
  const { id } = useParams();
  const router = useRouter();

  const characterId =
    typeof id === "string" ? id : Array.isArray(id) ? id[0] : "";

  if (!characterId)
    return <p className="text-center mt-10">Invalid character ID</p>;

  const {
    data: character,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["character", characterId],
    queryFn: () => getCharacter(characterId),
    enabled: !!characterId,
  });

  useEffect(() => {
    if (character) setFavorite(isFavorite(character.id));
  }, [character]);

  if (isLoading) return <CharacterInfoSkeleton />;
  if (isError || character?.error) throw new Error("Character not found");

  const {
    name,
    image,
    species,
    gender,
    location,
    origin,
    episode,
    id: charId,
  } = character;

  const toggleFavorite = () => {
    if (favorite) removeFavorite(charId);
    else addFavorite(character);
    setFavorite(!favorite);
  };

  const InfoBlock = ({ icon: Icon, label }: { icon: any; label: string }) => (
    <div className="flex flex-col items-center gap-1">
      <Icon size={16} />
      <span className="text-xs text-gray-400 text-center">{label}</span>
    </div>
  );

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

        <div className="flex flex-col lg:flex-row border border-gray-600 rounded-lg overflow-hidden">
          {/* Character Image + Info */}
          <div className="w-full lg:w-1/2 relative h-80 md:h-96 lg:h-auto">
            <Image
              src={image || "/default.png"}
              alt={name || "Unknown character"}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

            <Heart
              size={30}
              className={`absolute top-5 right-5 cursor-pointer transition-all ${
                favorite ? "text-red-500" : "text-gray-400 hover:text-red-500"
              }`}
              fill={favorite ? "red" : "none"}
              onClick={toggleFavorite}
            />

            <div className="absolute bottom-0 left-0 p-4 w-full">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white">{name}</span>
                <span className="text-xs">{gender === "Male" ? "♂" : "♀"}</span>
              </div>
              <p className="text-sm text-gray-400">{species}</p>

              <div className="mt-6 flex justify-between">
                <InfoBlock
                  icon={LocateIcon}
                  label={location?.name || "Unknown location"}
                />
                <InfoBlock
                  icon={MapPin}
                  label={origin?.name || "Unknown origin"}
                />
                <InfoBlock
                  icon={Clapperboard}
                  label={`${episode?.length || 0} Episode/s`}
                />
              </div>
            </div>
          </div>

          {/* Episodes List */}
          <div className="w-full lg:w-1/2 p-4">
            <h2 className="text-2xl font-bold mb-4">List of Episodes</h2>
            <div className="overflow-y-auto max-h-96 p-2 custom-scrollbar flex flex-col gap-4">
              {episode?.map((url: string) => (
                <EpisodeItem key={url} urlEpisode={url} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterPage;
