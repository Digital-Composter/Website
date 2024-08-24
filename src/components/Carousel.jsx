import React, { useState, useEffect } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

const Carousel = () => {
  const slides = [
    { url: "https://storage.googleapis.com/dicompos-assets/assets/alat3-min.jpg" }, // First slide image
    { url: 'https://storage.googleapis.com/dicompos-assets/assets/alat1-min.jpg' }, // Second slide image
    { url: "https://storage.googleapis.com/dicompos-assets/assets/alat2-min.jpg" }, // Third slide image
    { url: "https://storage.googleapis.com/dicompos-assets/assets/alat4-min.jpg" }, // Fourth slide image
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const autoSlide = setInterval(nextSlide, 4000); // Change slide every 4 seconds
    return () => clearInterval(autoSlide); // Clean up interval on component unmount
  }, [currentIndex]);

  return (
    <section className='mt-3' id='carousel'>
      <div className='max-w-[1300px] h-[720px] w-full m-auto py-16 px-4 relative group'>
        <div
          style={{
            backgroundImage: `url(${slides[currentIndex].url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          className='w-full h-full rounded-2xl duration-500'
        ></div>
        {/* Left Arrow */}
        <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
          <BsChevronCompactLeft onClick={prevSlide} size={30} />
        </div>
        {/* Right Arrow */}
        <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
          <BsChevronCompactRight onClick={nextSlide} size={30} />
        </div>
        <div className='flex top-4 justify-center py-2'>
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`text-2xl cursor-pointer ${currentIndex === slideIndex ? 'text-green-500' : 'text-gray-300'}`}
            >
              <RxDotFilled />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;
