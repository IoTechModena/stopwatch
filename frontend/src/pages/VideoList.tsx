//Author: Aboom
import { useState, useEffect } from "react";
import { Searchbox } from "../components/Searchbox";
import { VideoCard } from "../components/VideoCard";
import { VideoCardProps } from "../components/VideoCard";
import { VideoCardsCarousel } from "../components/VideoCardsCarousel";
import BeatLoader from "react-spinners/BeatLoader";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      const data = await getVideos();
      setVideoList(data);
      setLoading(false);
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
      {/* <div className="flex  justify-center flex-wrap gap-5">{videoCards}</div> */}
      <VideoCardsCarousel>{videoCards}</VideoCardsCarousel>
      <BeatLoader
        className="text-center my-10"
        color="#eab308"
        loading={loading}
        size="16"
      />
    </>
  );
};
