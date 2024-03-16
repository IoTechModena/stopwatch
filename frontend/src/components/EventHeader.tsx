interface EventHeaderProps {
  name: string;
  recordingCount: number;
  startDateTime: string;
  endDateTime: string;
  channel: number;
}

export const EventHeader = ({
  name,
  recordingCount,
  startDateTime,
  endDateTime,
  channel,
}: EventHeaderProps) => {
  return (
    <>
      <div id="eventDescription" className="text-center">
        <h1 className="text-3xl font-extrabold mb-1">🔔{name}</h1>
        <div className="flex justify-center gap-10">
          <p className="text-gray-700 font-bold">
            Numero di filmati: {recordingCount}
          </p>
          <p className="text-gray-700 font-bold">Canale: {channel}</p>
        </div>
        <div className="flex justify-center gap-10">
          <p className="text-gray-500 font-normal ">Inizio: {startDateTime}</p>
          <p className="text-gray-500 font-normal">Fine: {endDateTime}</p>
        </div>
      </div>
    </>
  );
};
