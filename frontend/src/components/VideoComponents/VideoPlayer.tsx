//Authors: Sus + Aboom
import ReactPlayer from "react-player";
import { useAuthAxios } from "../../hooks/useAuthAxios";
import { useEffect, useState } from "react";

export const VideoPlayer = (props: { id: number }) => {
  const { axiosInstance: authAxios } = useAuthAxios();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideoStream = async () => {
      try {
        const response = await authAxios.get(`/downloadRecording/${props.id}`, {
          responseType: "blob",
        });
        const blobUrl = URL.createObjectURL(response.data);
        setVideoUrl(blobUrl);
      } catch (error) {
        console.error("Error fetching video stream:", error);
      }
    };

    fetchVideoStream();
  }, [props.id, authAxios]);

  return (
    <div className="relative aspect-[4/3]">
      <ReactPlayer
        light={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvGUQB47iWuzsTHiKxSff9EHRR0ioZc2a4hw&usqp=CAU"
        }
        controls={true}
        url={videoUrl || ""}
        width="100%"
        height="100%"
        style={{ position: "absolute", top: 0, left: 0 }}
      />
    </div>
  );
};
