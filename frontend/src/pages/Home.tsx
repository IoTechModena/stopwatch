import { Searchbox } from "../components/Searchbox";

import { VideocameraCard } from "../components/VideocameraCard";

export const Home = () => {
  return (
    <>
      <Searchbox />
      <div className="flex justify-center">
        <VideocameraCard />
      </div>
    </>
  );
};
