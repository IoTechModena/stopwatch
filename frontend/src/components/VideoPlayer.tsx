//Authors: Sus + Aboom
import ReactPlayer from "react-player";

export const VideoPlayer = (props: { id: number }) => {
  return (
    <div className="relative aspect-[4/3]">
    <ReactPlayer
      light={
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvGUQB47iWuzsTHiKxSff9EHRR0ioZc2a4hw&usqp=CAU"
      }
      controls={true}
      url={`http://localhost/api/downloadRecording/${props.id}`}
      width="100%"
      height="100%"
      style={{ position: 'absolute', top: 0, left: 0 }}
    />
    </div>
  );
};

export default VideoPlayer;
