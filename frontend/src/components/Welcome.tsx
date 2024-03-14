export const Welcome = () => {
  return (
    <>
      <div className="text-center">
        <h1 className="mb-4 mt-20 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
          Benvenuto su{" "}
          <span className="bg-gradient-to-r from-[#0B1E33] to-[#2460A7] text-transparent bg-clip-text">
            StopWatch
          </span>
        </h1>
        <p className="mb-20 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 mx-2">
          Qui troverai le telecamere disponibili, premi su "Registrazioni" per
          visualizzare gli eventi della telecamera.
        </p>
      </div>
    </>
  );
};
