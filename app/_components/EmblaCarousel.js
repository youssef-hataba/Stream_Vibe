"use client";
import Image from "next/image";
import React, {useCallback, useEffect, useState} from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import {PrevButton, NextButton, MediaActions} from "./buttons/Buttons";
import MovieHeroBanner from "./MovieHeroBanner";

const EmblaCarousel = ({slides, options}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  // State and handlers for Dot Buttons
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  
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
              <MovieHeroBanner movie={movie} classes="hidden" />
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
