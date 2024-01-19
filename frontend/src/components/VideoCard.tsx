// Author: Aboom

import { DownloadButton } from "./DownloadButton";
import { VideoPlayer } from "./VideoPlayer";

export const VideoCard = () => {
  return (
    <>
      <div className="max-w-lg Gelion rounded-md  overflow-hidden  shadow-2xl m-10">
        <VideoPlayer />
        <div className="px-6 py-4">
          <h1
            id="videoTitle"
            className="font-bold text-center text-xl mb-3 overflow-hidden text-ellipsis whitespace-nowrap"
          >
            S20240113-000000-E20240113-0000
          </h1>
          <div className="flex lg:flex-row md:flex-col sm:flex-col justify-between">
            <p id="timeRange" className="text-gray-700 text-base mb-4">
              🕒00:00:01~00:01:00
            </p>
            <p id="dateRange" className="text-gray-700 text-base mb-4">
              📅2024/01/10~2024/01/10
            </p>
          </div>
          <p id="videoDescription" className="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
        <DownloadButton />
      </div>
    </>
  );
};
