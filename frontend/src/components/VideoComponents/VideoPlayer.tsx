import { useState } from "react";
import { useAuthAxios } from "@/hooks/useAuthAxios";
import ReactPlayer from "react-player/lazy";

export const VideoPlayer = (props: { id: number }) => {
  const { axiosInstance: authAxios } = useAuthAxios();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // new state variable

  const fetchVideoStream = async () => {
    try {
      setIsLoading(true);
      const response = await authAxios.get(`/recordings/${props.id}`, {
        responseType: "blob",
      });
      const blobUrl = URL.createObjectURL(response.data);
      setVideoUrl(blobUrl);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching video stream:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="relative aspect-[4/3]">
      <ReactPlayer
        light={"/imgs/dark-gray.jpg"}
        loop
        playing
        onClickPreview={fetchVideoStream}
        controls={!isLoading}
        url={videoUrl || "videos/loading.mp4"}
        width="100%"
        height="100%"
        style={{ position: "absolute", top: 0, left: 0 }}
      />
    </div>
  );
};
