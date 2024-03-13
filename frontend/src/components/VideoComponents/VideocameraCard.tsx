import { useAuth0 } from "@auth0/auth0-react";
import { ChannelContext } from "@/context/ChannelContext";
import { Link } from "react-router-dom";
import React from "react";

interface VideocameraCardProps {
  title: string;
  channelNum: number;
  location: string;
  eventsNum: number;
  cameraLocation: boolean;
  imageSrc: string;
}

export const VideocameraCard = ({
  title,
  channelNum,
  location,
  eventsNum,
  cameraLocation,
  imageSrc,
}: VideocameraCardProps) => {
  const { isAuthenticated } = useAuth0();
  const { setSelectedChannel } = React.useContext(ChannelContext);
  const handleClick = () => {
    setSelectedChannel(channelNum);
  };
  return (
    <>
      <div className="max-w-md max-h-md mx-4 rounded-xl overflow-hidden shadow-2xl border-solid border-[2px] border-gray-300 hover:border-gray-400">
        <img src={imageSrc} alt="Ufficio" />
        <div className="px-6 py-4 mt-5">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-2xl">{title}</h2>
            <span className="text-gray-400 text-sm font-bold">
              Canale: {channelNum}
            </span>
          </div>

          {cameraLocation && isAuthenticated ? (
            <p className="font-semibold text-md mt-4">
              📌Location: <span className="text-gray-500">{location}</span>
            </p>
          ) : null}
          <p className="text-gray-700 mt-8 font-bold text-center">
            Eventi: {eventsNum}
          </p>
          <hr className="mt-8 mb-4" />
          <Link to="/events" onClick={handleClick}>
            <button className="bg-yellow-500 mb-1 w-full hover:bg-yellow-400 font-bold py-2 px-4 rounded-lg">
              Registrazioni
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};
