import React, { useState, useEffect } from 'react';
import {
  Dot,
  DotContainer,
  ArrowButton,
  Slide,
  SliderContainer,
  SlideText,
} from './Slider.styled';
import arrowLeft from 'img/arrow-left.svg';
import arrowRight from 'img/arrow-right.svg';
export const Slider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const images = [
    'https://klopotenko.com/wp-content/uploads/2024/10/harbuzovyy-krem-sup-img.jpg?v=1729853977',
    'https://images.unian.net/photos/2020_04/thumb_files/1200_0_1588081977-7108.jpg',
    'https://klopotenko.com/wp-content/uploads/2024/11/vehans%CA%B9ki-kotlety-img.jpg?v=1731655736',
    'https://i.ytimg.com/vi/mUNwc21JobU/maxresdefault.jpg',
    'https://img.tsn.ua/cached/848/tsn-2caa9e2b3b3790ab31ffc1dec16b4315/thumbs/1200x630/e3/d2/945cff7ee61fde084b68f2ba24f7d2e3.jpeg',
  ];

  const titles = [
    'Гарбузовий крем-суп з сочевицею',
    'Смачний борщ',
    'Веганські котлети',
    'Рибний суп',
    'Запечені овочі',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const prevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div>
      <SliderContainer>
        <Slide image={images[currentIndex]}>
          <SlideText>{titles[currentIndex]}</SlideText>
        </Slide>

        <ArrowButton left onClick={prevSlide}>
          <img src={arrowLeft} alt="arrowLeft" />
        </ArrowButton>
        <ArrowButton onClick={nextSlide}>
          <img src={arrowRight} alt="arrowRight" />
        </ArrowButton>

        <DotContainer>
          {images.map((_, index) => (
            <Dot
              key={index}
              active={index === currentIndex}
              onClick={() => goToSlide(index)}
            />
          ))}
        </DotContainer>
      </SliderContainer>
    </div>
  );
};
