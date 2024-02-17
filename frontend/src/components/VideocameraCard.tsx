interface VideocameraCardProps {
  title: string;
  channelNum: number;
  location: string;
  eventsNum: number;
  href: string;
}

export const VideocameraCard = ({
  title,
  channelNum,
  location,
  eventsNum,
  href,
}: VideocameraCardProps) => {
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
          <p className="font-medium text-md mt-2">
            📌Location:{" "}
            <span className="text-gray-500 text-base">{location}</span>
          </p>
          <p className="text-gray-700 mt-8 font-bold text-center">
            Eventi: {eventsNum}
          </p>
          <hr className="mt-3 my-5" />
          <a href={href}>
            <button className="bg-[#112D4E] mb-1 w-full hover:bg-[#0B1D32] text-white font-bold py-2 px-4 rounded-lg">
              Registrazioni
            </button>
          </a>
        </div>
      </div>
    </>
  );
};
