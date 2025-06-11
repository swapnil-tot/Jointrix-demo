import React, { useEffect } from 'react';
import { markdownStore } from '../store/markdownStore';
import { Button } from './Button';

const SlideNavigator = () => {
  const { slides, activeSlideId, addSlide, setActiveSlide } = markdownStore();
  const activeSlideIndex = slides.findIndex((slide: { id: any; }) => slide.id === activeSlideId);
  const totalSlides = slides.length;

  const handlePrevious = () => {
    if (activeSlideIndex > 0) {
      const prevSlide = slides[activeSlideIndex - 1];
      if (prevSlide) {
        setActiveSlide(prevSlide.id);
      }
    }
  };

  const handleNext = () => {
    if (activeSlideIndex < totalSlides - 1) {
      const nextSlide = slides[activeSlideIndex + 1];
      if (nextSlide) {
        setActiveSlide(nextSlide.id);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (
        event.target.tagName === 'INPUT' ||
        event.target.tagName === 'TEXTAREA' ||
        event.target.isContentEditable
      ) {
        return;
      }

      if (event.key === 'ArrowLeft' && activeSlideIndex > 0) {
        event.preventDefault();
        const prevSlide = slides[activeSlideIndex - 1];
        if (prevSlide) {
          setActiveSlide(prevSlide.id);
        }
      } else if (event.key === 'ArrowRight' && activeSlideIndex < totalSlides - 1) {
        event.preventDefault();
        const nextSlide = slides[activeSlideIndex + 1];
        if (nextSlide) {
          setActiveSlide(nextSlide.id);
        }
      } else if (event.ctrlKey && event.key === 'm') {
        event.preventDefault();
        addSlide();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [slides, activeSlideId, setActiveSlide, addSlide]);

  return (
    <nav className="slide-navigator">
      <div className="navigator-content">
        <div className="navigation-buttons">
          <Button
            onClick={handlePrevious}
            disabled={activeSlideIndex === 0}
            className="nav-button prev-button"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
            Previous
          </Button>
          
          <div className="slide-counter">
            <span className="counter-text">Slide {activeSlideIndex + 1} of {totalSlides}</span>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${((activeSlideIndex + 1) / totalSlides) * 100}%` }}
              />
            </div>
          </div>

          <Button
            onClick={handleNext}
            disabled={activeSlideIndex === totalSlides - 1}
            className="nav-button next-button"
            aria-label="Next slide"
          >
            Next
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </Button>
        </div>

        <Button
          onClick={addSlide}
          className="add-slide-button"
          aria-label="Add new slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Add Slide
        </Button>
      </div>
    </nav>
  );
};

export default SlideNavigator;