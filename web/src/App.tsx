import React, { useEffect, useRef, useState } from "react";
import Section02 from "./components/Section02";
import Section01 from "./components/Section01";
import card1 from "./assets/card1.png"
import card2 from "./assets/card2.png"
import card3 from "./assets/card3.png"
import Section03 from "./components/Section03";

const App: React.FC = () => {
  const cloudsRef = useRef<HTMLImageElement>(null);
  const mountainsRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLImageElement>(null);
  const [cardOpacity, setCardOpacity] = useState<number>(1);
  const [cardsPerContainer, setCardsPerContainer] = useState<number>(3); 

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const cloudsSpeed = 0.1;
      const mountainsSpeed = 0.3;
      const textSpeed = 0.4;

      if (cloudsRef.current) {
        cloudsRef.current.style.top = `${-scrollY * cloudsSpeed}px`;
      }

      if (mountainsRef.current) {
        mountainsRef.current.style.top = `${scrollY * mountainsSpeed}px`;
      }

      if (textRef.current) {
        textRef.current.style.right = `${-scrollY * textSpeed}px`;
      }

      const windowHeight = window.innerHeight;
      const cardsOffset = document.querySelector(".cards")?.getBoundingClientRect().top || 0;
      const triggerPoint = windowHeight - cardsOffset * 0.8;
      setCardOpacity(Math.max(0, Math.min(1, (scrollY - cardsOffset + triggerPoint) / triggerPoint)));
    };

    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1200) {
        setCardsPerContainer(3);
      } else if (screenWidth >= 800) {
        setCardsPerContainer(2);
      } else {
        setCardsPerContainer(1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const dados = [
    { position: '01',title: 'Camping', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.', image: card1, barColor:'#ce3434' },
    { position: '02',title: 'Sightseeing', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.', image: card2, barColor:'#7B98DA' },
    { position: '03',title: 'Hiking', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.', image: card3, barColor:'#F9A251' },
    { position: '01',title: 'Camping', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.', image: card1, barColor:'#ce3434' },
    { position: '02',title: 'Sightseeing', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.', image: card2, barColor:'#7B98DA' },
    { position: '03',title: 'Hiking', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.', image: card3, barColor:'#F9A251' },
  ];
  const totalCards = dados.length;
  const cardArray = Array.from({ length: totalCards }, (_, index) => index + 1);
  const groupedCards = cardArray.reduce<number[][]>((acc, _, index) => {
    const groupIndex = Math.floor(index / cardsPerContainer);
    if (!acc[groupIndex]) {
      acc[groupIndex] = [];
    }
    acc[groupIndex].push(index);
    return acc;
  }, []);

  return (
    <>
      <Section01 cloudsRef={cloudsRef} mountainsRef={mountainsRef} textRef={textRef}/>
      <Section02 cardOpacity={cardOpacity} groupedCards={groupedCards} dados={dados} />
      <Section03/>
    </>
  );
};

export default App;
