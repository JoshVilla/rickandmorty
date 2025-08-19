export default function CharacterDetailSkeleton() {
  return (
    <div className="w-full py-10 px-4 animate-pulse">
      <div className="w-full md:w-3/4 lg:w-2/3 mx-auto">
        {/* Back button */}
        <div className="flex items-center my-4 gap-2">
          <div className="w-16 h-4 bg-gray-400 rounded" />
          <div className="w-24 h-4 bg-gray-400 rounded" />
        </div>

        <div className="flex h-[500px] flex-col lg:flex-row border border-gray-600 rounded-lg overflow-hidden">
          {/* Left: Image + Info */}
          <div className="flex-1 relative overflow-hidden h-64 md:h-64 lg:h-auto bg-gray-700">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4 space-y-2">
              <div className="w-40 h-6 bg-gray-500 rounded" />
              <div className="w-6 h-6 bg-gray-500 rounded-full" />
              <div className="w-20 h-4 bg-gray-500 rounded" />
              <div className="mt-6 flex gap-6">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-4 h-4 bg-gray-500 rounded-full" />
                  <div className="w-16 h-3 bg-gray-500 rounded" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-4 h-4 bg-gray-500 rounded-full" />
                  <div className="w-16 h-3 bg-gray-500 rounded" />
                </div>
                <div className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-4 h-4 bg-gray-500 rounded-full" />
                  <div className="w-16 h-3 bg-gray-500 rounded" />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Episodes List */}
          <div className="flex-1 p-4">
            <div className="w-40 h-6 bg-gray-500 rounded mb-4" />
            <div className="overflow-y-auto max-h-96 space-y-4 p-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="w-full h-6 bg-gray-600 rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
