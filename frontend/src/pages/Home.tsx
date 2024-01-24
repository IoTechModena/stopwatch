//Author: Aboom
import { Searchbox } from "../components/Searchbox";
import { Toaster } from "../components/Toaster";
import { VideocameraCard } from "../components/VideocameraCard";

export const Home = () => {
  const cards = [<VideocameraCard />];
  return (
    <>
      <Toaster />
      <Searchbox />
      <div className="flex justify-center">
        {/* Se ci sta solo una card, la centra */}
        <div
          className={`${
            cards.length === 1
              ? "flex justify-center"
              : "grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-20"
          }`}
        >
          {cards}
        </div>
      </div>
    </>
  );
};
