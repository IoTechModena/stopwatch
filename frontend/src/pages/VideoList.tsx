//Author: INSERIRE AUTORE
import { useState, useEffect } from "react";
import { Searchbox } from "../components/Searchbox";
import { VideoCard } from "../components/VideoCard";
import { VideoCardProps } from "../components/VideoCard";
import axios from "axios";

const getVideos = async () => {
  try {
    const response = await axios.get("api/getRecordings");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//https://mocki.io/v1/a61ec3ad-3395-4641-a5a9-f3334975b005

export const VideoList = () => {
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const data = await getVideos();
      setVideoList(data);
    };
    fetchVideos();
  }, []);

  const videoCards = Array.isArray(videoList)
    ? videoList.map((data: VideoCardProps) => (
        <VideoCard
          id={data.id}
          description={
            data.description == ""
              ? "Questo video non ha una descrizione."
              : data.description
          }
          startDate={data.startDate}
          endDate={data.endDate}
          startTime={data.startTime}
          endTime={data.endTime}
          duration={data.duration}
          size={data.size}
          name={data.name}
        />
      ))
    : null;

  return (
    <>
      <Searchbox datepickerIcon />
      {/* Se ci sta solo una card, la centra */}
      <div
        className={`${
          videoCards && videoCards.length === 1
            ? "flex justify-center"
            : "grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3"
        }`}
      >
        {videoCards}
      </div>
    </>
  );
};
