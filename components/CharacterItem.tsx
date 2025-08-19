import Image from "next/image";
import charImg from "@/public/char.jpeg";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { addFavorite, isFavorite, removeFavorite } from "@/utils/helpers";
import { Character } from "@/utils/types";
import { useEffect, useState } from "react";

interface Props {
  data: Character;
}

const CharacterItem = ({ data }: Props) => {
  const router = useRouter();
  const [favorite, setFavorite] = useState(false);
  const handleClick = () => {
    router.push(`/character/${data.id}`);
  };

  useEffect(() => {
    setFavorite(isFavorite(data.id));
  }, [data.id]);

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(data.id);
    } else {
      addFavorite(data);
    }
    setFavorite(!favorite); // update local state immediately
  };

  return (
    <div
      className="w-64 pb-4 shadow-md border-2 border-gray-600 overflow-hidden"
      cy-data={`character-item-${data.id}`}
    >
      <div className="h-44 w-full relative  overflow-hidden ">
        <Image
          src={data.image ?? "/default.png"}
          alt={data.name}
          fill
          className="object-cover hover:scale-105 transition-all cursor-pointer"
          onClick={handleClick}
        />
        <Heart
          height={20}
          className={`absolute top-2 right-2 cursor-pointer transition-all ${
            favorite ? "text-red-500" : "text-gray-400 hover:text-red-500"
          }`}
          fill={favorite ? "red" : "none"}
          onClick={toggleFavorite}
        />
      </div>

      {/* Info */}
      <div className="p-1 mt-4 flex flex-col gap-1">
        <div className="font-semibold text-lg text-gray-300 mb-2">
          {data.name}
        </div>
        <div className="text-xs *:text-gray-400">
          <span className="font-bold">Gender: </span>
          <span>{data.gender}</span>
        </div>
        <div className="text-xs *:text-gray-400">
          <span className="font-bold">Species: </span>
          <span>{data.species}</span>
        </div>

        <div className="text-xs text-gray-400">
          <span className="font-bold">Status: </span>
          <span className="text-green-400">{data.status}</span>
        </div>
        <div className="text-xs *:text-gray-400">
          <span className="font-bold">Location: </span>
          <span>{data.location.name}</span>
        </div>
      </div>
    </div>
  );
};

export default CharacterItem;
