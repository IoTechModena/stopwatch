interface EventHeaderProps {
  id: number;
  recordingCount: number;
  startDateTime: string;
  endDateTime: string;
}

export const EventHeader = ({
  id,
  recordingCount,
  startDateTime,
  endDateTime,
}: EventHeaderProps) => {
  return (
    <>
      <div id="eventDescription" className="text-center Gelion">
        <h1 className="text-3xl font-extrabold mt-10 mb-1">🔔Evento {id}</h1>
        <p className="text-gray-700 font-bold">
          Numero di filmati: {recordingCount}
        </p>
        <div className="flex justify-center gap-10">
          <p className="text-gray-500 font-normal ">Inizio: {startDateTime}</p>
          <p className="text-gray-500 font-normal">Fine: {endDateTime}</p>
        </div>
      </div>
    </>
  );
};
