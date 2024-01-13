import { Searchbox } from "../components/Searchbox";
import { VideoCard } from "../components/VideoCard";

export const VideoList = () => {
  const cards = [<VideoCard />,  <VideoCard />, <VideoCard />,<VideoCard />,<VideoCard />,<VideoCard />];
  return (
    <>
      <Searchbox datepickerIcon />
        {/* Se ci sta solo una card, la centra */}
        <div
          className={`${
            cards.length === 1
              ? "flex justify-center"
              : "grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3"
          }`}
        >
          {cards}
        </div>
    </>
  );
};
