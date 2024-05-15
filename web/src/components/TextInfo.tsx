import { useEffect, useState } from "react";

export default function TextInfo({ containerClassName }: { containerClassName: string }) {

    const [cardOpacity2, setCardOpacity2] = useState<number>(0);

    useEffect(() => {
        const handleScroll = () => {
          const windowHeight = window.innerHeight;
          const cardsOffset = document.querySelector(`.${containerClassName}`)?.getBoundingClientRect().top || 0;
          const triggerPoint = windowHeight - cardsOffset * 0.2;
          setCardOpacity2(Math.max(0, Math.min(1, (window.scrollY - cardsOffset + triggerPoint) / triggerPoint)));
        };
    
        window.addEventListener("scroll", handleScroll);
    
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, []);

  return (
    <div className={`container-header ${cardOpacity2 === 1 ? "show" : ""}`}>
    <div className="title">
      <h2>
        <span>01</span> / Range of Activities
      </h2>
      <div>
        <h1>Choose your Adventure</h1>
      </div>
      <p>
        <span>01</span> / Range of Activities
      </p>
    </div>
    <p className="text01">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
      varius enim in eros elementum tristique. Duis cursus, mi quis viverra
      ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
      Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc
      ut sem vitae risus tristique posuere.
    </p>
  </div>
  )
}
