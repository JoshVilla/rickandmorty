type EpisodeItemProps = {
  urlEpisode: string;
};

const EpisodeItem = ({ urlEpisode }: EpisodeItemProps) => {
  const episodeId = urlEpisode.split("/").pop(); // 👉 "10"

  return (
    <div className="p-2 border rounded text-sm cursor-pointer hover:bg-gray-900">
      Episode {episodeId}
    </div>
  );
};

export default EpisodeItem;
