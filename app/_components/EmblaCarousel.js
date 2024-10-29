"use client";
import Image from "next/image";
import React, {useCallback, useEffect, useState} from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import NextButton from "./NextButton";
import PrevButton from "./PrevButton";
import MediaActions from "./MediaActions";

const EmblaCarousel = ({slides, options}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  // State and handlers for Dot Buttons
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Initial value based on window size

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  console.log(isMobile);
  const imageSize = isMobile ? "original" : "w1280";
  console.log(imageSize);

  const onNavButtonClick = useCallback((emblaApi) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false ? autoplay.reset : autoplay.stop;
    resetOrStop();
  }, []);

  const onDotButtonClick = useCallback(
    (index) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
      if (onNavButtonClick) onNavButtonClick(emblaApi);
    },
    [emblaApi, onNavButtonClick]
  );

  const onInit = useCallback((emblaApi) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  // Effect for Dot Buttons
  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  // State and handlers for Prev/Next Buttons
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  // Common navigation button click handler

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
    if (onNavButtonClick) onNavButtonClick(emblaApi);
  }, [emblaApi, onNavButtonClick]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    if (onNavButtonClick) onNavButtonClick(emblaApi);
  }, [emblaApi, onNavButtonClick]);

  const onSelectForButtons = useCallback((emblaApi) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  // Effect for Prev/Next Buttons
  useEffect(() => {
    if (!emblaApi) return;

    onSelectForButtons(emblaApi);
    emblaApi.on("reInit", onSelectForButtons).on("select", onSelectForButtons);
  }, [emblaApi, onSelectForButtons]);

  // Dot Button component
  const DotButton = ({onClick, className}) => (
    <button type="button" onClick={onClick} className={className} />
  );

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((movie) => (
            <div className="embla__slide" key={movie.id}>
              <div className="image-wrapper">
                <Image
                  src={
                    isMobile
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` // Mobile image
                      : `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` // Desktop image
                  }
                  alt={movie.title || "Movie poster"}
                  layout="responsive"
                  width={isMobile ? 500 : 1280} // Set width based on device
                  height={isMobile ? 150 : 720} // Set height based on device
                  className="embla__slide__img"
                  priority
                />
                <div className="gradient-overlay"></div>
              </div>
              <div className="embla__slide__content">
                <h2>{movie.title}</h2>
                <p className="hidden lg:block">{movie.overview}</p>
                <div className="flex justify-center">
                  <MediaActions />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="embla__controls">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <div className="embla__dots">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={`embla__dot${index === selectedIndex ? " embla__dot--selected" : ""}`}
              />
            ))}
          </div>
          <NextButton
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
            className="embla__button"
          />
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
