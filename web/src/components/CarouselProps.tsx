import { Triangle } from 'phosphor-react';
import React, { useState, useRef, useEffect } from 'react';

interface CarouselProps {
  items: { img: string, name: string }[]; 
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [currentItem, setCurrentItem] = useState(0);
  const [showCarousel, setShowCarousel] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (wrapperRef.current) {
        const wrapperTop = wrapperRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (wrapperTop < windowHeight * 0.75) {
          setShowCarousel(true);
        } else {
          setShowCarousel(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNext = () => {
    const newIndex = currentItem === items.length - 1 ? 0 : currentItem + 1;
    setCurrentItem(newIndex);
    scrollToItem(newIndex);
    if (newIndex === 0 && wrapperRef.current) {
      const scrollLeft = wrapperRef.current.scrollLeft;
      const wrapperWidth = wrapperRef.current.clientWidth;
      const contentWidth = wrapperRef.current.scrollWidth;
      if (scrollLeft + wrapperWidth >= contentWidth) {
        scrollToItem(0);
        setCurrentItem(0);
      }
    }
  };

  const scrollToItem = (index: number) => {
    if (wrapperRef.current) {
      const itemWidth = wrapperRef.current.children[0].clientWidth;
      wrapperRef.current.scrollTo({ left: index * itemWidth, behavior: 'smooth' });
    }
  };

  return (
    <div className="containerCarousel">

    <div className='animation'>
        <div className={`carousel-container ${showCarousel ? 'showCarousel' : ''}`}>
            <button className="next" onClick={handleNext}>
              <Triangle className="icon" size={22} weight="fill" />
            </button>
            <div className="aling">
              <div ref={wrapperRef} className="carousel-wrapper">
                {items.map((item, index) => (
                  <div key={index} className={`carousel-item`}>
                    <img src={item.img} alt={`Slide ${index}`} />
                  </div>
                ))}
              </div>
              <div className="carousel-indicators">
                {items.map((_, index) => ( 
                  <div
                    key={index}
                    className={`indicator ${index === currentItem ? 'active' : ''}`}
                    onClick={() => {
                      setCurrentItem(index);
                      scrollToItem(index);
                    }}/>
                ))}
              </div>
            </div>
        </div>
      </div>

      <div className='infoCarousel'>
        <div className='titleCarousel'>
          {items.map((item, index) => (
            <h1 key={index} className={`${index === currentItem ? 'active2' : ''}`}>
              {item.name}
            </h1>
          ))}
          <h2>2019</h2>
        </div>
        <div className='firstTitle'>
          <h3>Photography:</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Suspendisse varius enim in eros elementum tristique.</p>
        </div>
        <div>
          <h3>Year:</h3>
          <p>2019</p>
        </div>
        <div>
          <h3>Narrative:</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Suspendisse varius enim in eros elementum tristique.</p>
        </div>
        <div className="btn">Explore</div>
      </div>

    </div>
  );
};

export default Carousel;
