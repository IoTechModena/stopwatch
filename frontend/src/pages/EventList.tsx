//Author: Aboom
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { Searchbox } from "../components/Searchbox";
import { VideoCard } from "../components/VideoCard";
import { VideoCardsCarousel } from "../components/VideoCardsCarousel";
import { EventHeader } from "../components/EventHeader";
import BeatLoader from "react-spinners/BeatLoader";
import axios from "axios";
import React from "react";

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

interface Event {
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
  const { getIdTokenClaims } = useAuth0();

  const getEvents = async () => {
    const token = await getIdTokenClaims();
    const headers = { Authorization: `Bearer ${token?.__raw}` }; // Add 'Bearer' before the token
    try {
      const response = await axios.get("http://localhost/api/getEvents", {
        headers,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getEvents();
      setEventList(data);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  return (
    <>
      <Searchbox datepickerIcon key="Searchbox" />
      {eventList
        .sort((a, b) => b.id - a.id)
        .map((data: Event, index: number) => (
          <React.Fragment key={`event-${data.id}`}>
            <EventHeader
              id={data.id}
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
        className="text-center my-10"
        color="#eab308"
        loading={loading}
      />
    </>
  );
};
