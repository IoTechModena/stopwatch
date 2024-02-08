import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { ReactNode } from "react";

interface VideoCardsCarouselProps {
  children: ReactNode;
}

export const VideoCardsCarousel = ({ children }: VideoCardsCarouselProps) => {
  return (
    <>
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
