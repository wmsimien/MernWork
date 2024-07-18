import React, { useState } from 'react';
import { IoIosArrowDropleft } from 'react-icons/io';
import { IoIosArrowDropright } from 'react-icons/io';
import './imageSlider.css';

const ImageSlider = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const showPrevImage = () => {
    setImageIndex((index) => {
      if (index === 0) return images.length - 1;
      return index - 1;
    });
  };
  const showNextImage = () => {
    setImageIndex((index) => {
      if (index === images.length - 1) return 0;
      return index + 1;
    });
  };
  return (
    <section
      aria-label="Image Slider"
      style={{ width: '100%', height: '100%', position: 'relative' }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          overflow: 'hidden',
        }}
      >
        {images.map(({ url, alt }, index) => (
          <img
            key={url}
            className="img-slider-img"
            style={{ translate: `${-100 * imageIndex}%` }}
            // src={images[imageIndex]}
            src={url}
            alt={alt}
            aria-hidden={imageIndex !== index}
          />
        ))}
      </div>
      <button
        onClick={showPrevImage}
        className="img-slider-btn"
        style={{ left: '0' }}
        aria-label="view previous image"
      >
        <IoIosArrowDropleft aria-hidden />
      </button>
      <button
        onClick={showNextImage}
        className="img-slider-btn"
        style={{ right: '0' }}
        aria-label="view next image"
      >
        <IoIosArrowDropright aria-hidden />
      </button>
      <div
        style={{
          position: 'absolute',
          bottom: '-1.4rem',
          left: '50%',
          translate: '-50%',
          display: 'flex',
          gap: '.25rem',
        }}
      >
        {images.map((_, index) => (
          <button
            className="img-slider-dot-btn"
            key={index}
            onClick={() => setImageIndex(index)}
            aria-label={`View Image ${index + 1}`}
          >
            {index === imageIndex ? (
              <div key={index} className="dot-text"></div>
            ) : (
              <div key={index} className="dot-text"></div>
            )}
          </button>
        ))}
      </div>
    </section>
  );
};

export default ImageSlider;
