import { Alert } from "@/components/Alert";
import { VideocameraCard } from "@/components/VideoComponents/VideocameraCard";
import { Welcome } from "@/components/Welcome";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";

interface CameraData {
  id: number;
  channel: number;
  name: string;
  location: string;
  eventsCount: number;
}

export const Home = () => {
  const { isAuthenticated, logout, getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(true);
  const [cameras, setCameras] = useState<CameraData[]>([]);
  const [cameraLocation, setCameraLocation] = useState<boolean>(true);
  const [error, setError] = useState<null | Error>(null);

  const fetchCameraData = async () => {
    try {
      const response = await axios.get<CameraData[]>("api/cameras");
      const cameraData = response.data;

      setCameras(cameraData);
    } catch (e) {
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  };

  const checkToken = useCallback(async () => {
    if (isAuthenticated) {
      try {
        await getAccessTokenSilently();
      } catch (error) {
        setCameraLocation(false);
        logout({
          logoutParams: {
            returnTo: window.location.origin,
          },
        });
      }
    }
  }, [isAuthenticated, logout, getAccessTokenSilently]);

  useEffect(() => {
    checkToken();
    fetchCameraData();
  }, [checkToken]);

  if (error) {
    return (
      <>
        <Welcome />
        <Alert
          type="error"
          prefix="Ops😥! "
          message="Al momento non è  possibile caricare i dati delle telecamere."
        />
      </>
    );
  }
  return (
    <>
      <Welcome />
      <div className="flex flex-col md:flex-row justify-center items-center mb-10  lg:gap-x-28 md:gap-x-7 gap-y-20">
        {cameras.map((camera, index) => (
          <VideocameraCard
            key={camera.id}
            title={camera.name}
            channelNum={camera.channel}
            location={camera.location}
            eventsNum={camera.eventsCount}
            cameraLocation={cameraLocation}
            imageSrc={`/imgs/Ufficio${index}.jpg`}
          />
        ))}
      </div>
      <BeatLoader
        className="text-center my-20"
        color="#eab308"
        loading={loading}
      />
    </>
  );
};
