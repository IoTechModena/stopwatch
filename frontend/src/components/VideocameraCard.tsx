// Autor: Echcraft

export const VideocameraCard = () => {
  return (
    <>
      <div className="max-w-sm mt-20 rounded-xl overflow-hidden shadow-2xl">
        <img
          className="w-full"
          src="https://th.bing.com/th/id/OIP.Lt_bKamMjnK_0MhRekSXSAAAAA?rs=1&pid=ImgDetMain"
          alt="Sunset in the mountains"
        />
        <div className="px-6 py-4 mt-5">
          <div id="videocameraName" className="font-bold text-xl mb-2">
            Videocamera N.1
          </div>
          <div id="videocameraLocation" className="font-bold text-sm mt-6">
            Location
          </div>
          <p id="additionalDescription" className="text-gray-500 text-base">
            Descrizione opzionale
          </p>
          <hr className="my-8 " />

          <button
            id="liveButton"
            className="bg-yellow-400 mb-6 w-full  hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg"
          >
            Live
          </button>
          <a href="video-list">
            <button className="bg-[#112D4E] mb-4 w-full hover:bg-[#0B1D32] text-white font-bold py-2 px-4 rounded-lg">
              Registrazioni
            </button>
          </a>
        </div>
      </div>
    </>
  );
};
