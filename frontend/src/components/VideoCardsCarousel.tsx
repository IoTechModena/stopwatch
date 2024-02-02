import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { ReactNode } from "react";
import { EventHeader } from "./EventHeader";

interface VideoCardsCarouselProps {
  children: ReactNode;
}

export const VideoCardsCarousel = ({ children }: VideoCardsCarouselProps) => {
  return (
    <>
      <EventHeader
        id={0}
        recordingCount={0}
        startDateTime={"00:00:00 01/01/2000"}
        endDateTime={"00:00:00 01/01/2000"}
      />
      <Carousel
        className="lg:mx-20 md:mx-10 sm:mx-5  mb-5"
        arrows
        slidesToSlide={1}
        draggable={false}
        showDots={true}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1300,
            },
            items: 3,
            partialVisibilityGutter: 40,
          },
          mobile: {
            breakpoint: {
              max: 860,
              min: 0,
            },
            items: 1,
            partialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: {
              max: 1300,
              min: 860,
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
