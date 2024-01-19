import ReactPlayer from "react-player";

//light={<img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvGUQB47iWuzsTHiKxSff9EHRR0ioZc2a4hw&usqp=CAU'}  alt='Thumbnail'/>}

export const VideoPlayer = () => {
  return (
    <ReactPlayer
      light={
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvGUQB47iWuzsTHiKxSff9EHRR0ioZc2a4hw&usqp=CAU"
      }
      controls={true}
      url="https://www.youtube.com/watch?v=t7lUSiddFd4"
      width="100%"
    />
  );
};

export default VideoPlayer;
