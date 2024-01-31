import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";

import { ReactNode } from "react";

interface VideoCardsCarouselProps {
 children: ReactNode;
 eventName: string;
}

export const VideoCardsCarousel = ({ children, eventName }: VideoCardsCarouselProps) => {
  return (
    <>
      <h1 className="text-3xl font-bold Gelion text-center mt-10 mb-5">
        {eventName}
      </h1>
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
    </>
  );
};

export default Carousel;
