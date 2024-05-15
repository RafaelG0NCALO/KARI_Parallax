import { Triangle } from "phosphor-react";
import { useRef, useState } from "react";
import TextInfo from "./TextInfo";

interface Section02Props {
  cardOpacity: number;
  groupedCards: number[][];
  dados?: { title: string; text: string; image: string; position: string; barColor: string }[];
}

const Section02: React.FC<Section02Props> = ({ cardOpacity, groupedCards, dados }) => {
 
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePreviousClick = () => {
    if (scrollPosition > 0) {
      const newScrollPosition = scrollPosition - 1;
      setScrollPosition(newScrollPosition);
      scrollToPosition(newScrollPosition);
    }
  };

  const handleNextClick = () => {
    if (scrollPosition < groupedCards.length - 1) {
      const newScrollPosition = scrollPosition + 1;
      setScrollPosition(newScrollPosition);
      scrollToPosition(newScrollPosition);
    }
  };

  const scrollToPosition = (position: number) => {
    if (contentRef.current) {
      const containerWidth = contentRef.current.offsetWidth;
      const newPosition = position * containerWidth;
      contentRef.current.scrollTo({ left: newPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="contentsection">
      <section>

       <TextInfo containerClassName="contentsection"/>

        <div className="carousel">
          <button onClick={handlePreviousClick}><Triangle className="iconLeft" size={25} weight="fill" /></button>
          <div className="cards Noscroll" ref={contentRef} style={{ opacity: cardOpacity }}>
            {groupedCards.map((group, index) => (
              <div key={index} className="card-container">
                {group.map((cardIndex) => (
                  <div key={cardIndex} className="card">
                      <div className="position">{dados && dados[cardIndex] && dados[cardIndex].position} <p>/03</p> </div>
                      <div className="imgCard">
                        <img src={dados && dados[cardIndex] && dados[cardIndex].image} alt="Descrição da imagem" />
                      </div>
                      <div className="header-card">
                         <div className="header-title">{dados && dados[cardIndex] && dados[cardIndex].title}</div>
                        <div className="header-text">{dados && dados[cardIndex] && dados[cardIndex].text}</div>
                        <div className="btn">Explore</div>
                      </div>
                      <span className="barCard" style={{ backgroundColor: dados && dados[cardIndex] && dados[cardIndex].barColor }} />
                  </div>
                ))}
              </div>
            ))}
          </div>
          <button onClick={handleNextClick}><Triangle className="iconRight" size={25} weight="fill" /></button>
        </div>

      </section>
    </div>
  );
};

export default Section02;
