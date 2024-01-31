import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";

import { ReactNode } from "react";

interface VideoCardsCarouselProps {
  children: ReactNode;
}

export const VideoCardsCarousel = ({ children }: VideoCardsCarouselProps) => {
  return (
    <>
      <div id="eventDescription" className="text-center Gelion">
        <h1 className="text-3xl font-extrabold mt-10 mb-1">🔔Evento 1</h1>
        <p className="text-gray-700 font-bold">Numero di filmati: x</p>
        <div className="flex justify-center gap-10">
          <p className="text-gray-500 font-normal">
            Inizio: 00:00:00 01/01/1970
          </p>
          <p className="text-gray-500 font-normal">Fine: 00:00:00 01/01/1970</p>
        </div>
      </div>
      <Carousel
        className="mx-20"
        arrows
        draggable={false}
        showDots={true}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 3,
            partialVisibilityGutter: 40,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
            partialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 2,
            partialVisibilityGutter: 30,
          },
        }}
      >
        {children}
      </Carousel>
      <hr className="my-10" />
    </>
  );
};

export default Carousel;
