import { useAuth0 } from "@auth0/auth0-react";

interface VideocameraCardProps {
  title: string;
  channelNum: number;
  location: string;
  eventsNum: number;
  href: string;
  cameraLocation: boolean;
  setCameraLocation: (value: boolean) => void;
}

export const VideocameraCard = ({
  title,
  channelNum,
  location,
  eventsNum,
  href,
  cameraLocation,
  setCameraLocation,
}: VideocameraCardProps) => {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <div className="max-w-md mx-4 Gelion rounded-xl overflow-hidden shadow-2xl">
        <img
          className="w-full"
          src="https://www.allbusiness.com/asset/2015/11/office-jpg..jpg"
          alt="Sunset in the mountains"
        />
        <div className="px-6 py-4 mt-5">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-2xl mb-2">{title}</h1>
            <span className="text-gray-400 text-sm font-bold">
              Canale: {channelNum}
            </span>
          </div>

          {cameraLocation && isAuthenticated ? (
            <p className="font-medium text-md mt-2">
              📌Location:{" "}
              <span className="text-gray-500 text-base">{location}</span>
            </p>
          ) : null}
          <p className="text-gray-700 mt-8 font-bold text-center">
            Eventi: {eventsNum}
          </p>
          <hr className="mt-3 my-5" />
          <a href={href}>
            <button className="bg-yellow-500 mb-1 w-full hover:bg-yellow-400 font-bold py-2 px-4 rounded-lg">
              Registrazioni
            </button>
          </a>
        </div>
      </div>
    </>
  );
};
