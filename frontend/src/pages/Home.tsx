//Author: Aboom
import { Searchbox } from "../components/Searchbox";
import { Toaster } from "../components/Toaster";
import { VideocameraCard } from "../components/VideocameraCard";

export const Home = () => {
  return (
    <>
      <Toaster />
      <Searchbox />
      <div className="flex justify-center">
        <VideocameraCard />
      </div>
    </>
  );
};
