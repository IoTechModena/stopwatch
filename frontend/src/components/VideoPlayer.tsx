import ReactPlayer from 'react-player';
import video from 'replace video';

//light={<img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvGUQB47iWuzsTHiKxSff9EHRR0ioZc2a4hw&usqp=CAU'}  alt='Thumbnail'/>}



export const VideoPlayer = () => {
  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: 'auto', marginLeft: 'auto', marginRight: 'auto' }}>
      <ReactPlayer
        light={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvGUQB47iWuzsTHiKxSff9EHRR0ioZc2a4hw&usqp=CAU"}
        controls={true} 
        url={video}
        width="100%"
      />
    </div>
  );
};

export default VideoPlayer;