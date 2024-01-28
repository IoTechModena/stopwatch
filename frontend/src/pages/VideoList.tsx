//Author: INSERIRE AUTORE
import { useState, useEffect } from "react";
import { Searchbox } from "../components/Searchbox";
import { VideoCard } from "../components/VideoCard";
import { VideoCardProps } from "../components/VideoCard";
import axios from "axios";

const getVideos = async () => {
  try {
    const response = await axios.get("http://localhost/api/getRecordings");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

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
          key={data.id}
          id={data.id}
          description={
            data.description == ""
              ? "Questo video non ha una descrizione."
              : data.description
          }
          startDateTime={data.startDateTime}
          endDateTime={data.endDateTime}
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
      <div className="flex flex-row justify-center flex-wrap gap-5">
        {videoCards}
      </div>
    </>
  );
};
