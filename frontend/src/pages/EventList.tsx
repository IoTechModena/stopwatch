import { formatDateTime } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { ChannelContext } from "@/context/ChannelContext";
import BeatLoader from "react-spinners/BeatLoader";
import { Alert } from "../components/Alert";
import { EventHeader } from "../components/EventHeader";
import { Searchbox } from "../components/Searchbox";
import { VideoCard } from "../components/VideoComponents/VideoCard";
import { VideoCardsCarousel } from "../components/VideoComponents/VideoCardsCarousel";
import { useAuthAxios } from "../hooks/useAuthAxios";

interface Recording {
  id: number;
  path: string;
  name: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  duration: string;
  size: number;
  eventId: number;
}

export interface Event {
  id: number;
  recordings: Recording[];
  channel: number;
  name: string;
  startDateTime: string;
  endDateTime: string;
}

export const EventList = () => {
  const [eventList, setEventList] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);
  const [searchInput, setSearchInput] = useState("");
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const searchFields = ["name", "startDateTime", "endDateTime"] as const;
  const { axiosInstance: authAxios } = useAuthAxios();
  const { selectedChannel } = React.useContext(ChannelContext);

  useEffect(() => {
    const getEvents = async () => {
      const response = await authAxios.get("/getEvents");
      return response.data;
    };

    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        const formattedData = data.map((event: Event) => ({
          ...event,
          startDateTime: formatDateTime(event.startDateTime),
          endDateTime: formatDateTime(event.endDateTime),
          name: `Evento ${event.id}`,
        }));
        setEventList(formattedData.sort((a: Event, b: Event) => b.id - a.id));
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const lowerCaseSearchInput = searchInput.toLowerCase().trim();
    const filtered = eventList.filter((event) => {
      const matchesSearchInput = searchFields.some((field) => {
        const value = event[field].toString().toLowerCase();
        return value.includes(lowerCaseSearchInput);
      });

      const matchesSelectedChannel =
        selectedChannel === null || event.channel === selectedChannel;

      return matchesSearchInput && matchesSelectedChannel;
    });
    setFilteredEvents(filtered);
  }, [searchInput, selectedChannel, eventList]); // eslint-disable-line react-hooks/exhaustive-deps

  if (error) {
    return (
      <>
        <Searchbox
          key="Searchbox"
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
        <Alert
          type="error"
          prefix="Ops😥! "
          message="Al momento non è  possibile caricare i dati."
        />
      </>
    );
  }

  if (filteredEvents.length === 0 && !loading) {
    return (
      <>
        <Searchbox
          key="Searchbox"
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
        <Alert
          type="info"
          prefix="Hmm...🤔 "
          message="Al momento non sembrano esserci eventi."
        />
      </>
    );
  }

  return (
    <>
      <Searchbox
        key="Searchbox"
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      {filteredEvents.map((data: Event, index: number) => (
        <React.Fragment key={`event-${data.id}`}>
          <EventHeader
            name={data.name}
            recordingCount={data.recordings.length}
            startDateTime={data.startDateTime}
            endDateTime={data.endDateTime}
            channel={data.channel}
          />
          <VideoCardsCarousel>
            {data.recordings.map((recording) => (
              <VideoCard
                key={`c-${data.id} recording-${recording.id}`}
                id={recording.id}
                description={
                  recording.description === ""
                    ? "Questo video non ha una descrizione."
                    : recording.description
                }
                startDateTime={recording.startDateTime}
                endDateTime={recording.endDateTime}
                duration={recording.duration}
                size={recording.size}
                name={recording.name}
              />
            ))}
          </VideoCardsCarousel>
          {index !== eventList.length - 1 && (
            <hr className="lg:mx-20 md:mx-10 sm:mx-5 mb-10 mt-10" />
          )}
        </React.Fragment>
      ))}
      <BeatLoader
        className="text-center my-20"
        color="#eab308"
        loading={loading}
      />
    </>
  );
};
