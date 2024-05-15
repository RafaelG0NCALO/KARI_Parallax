// Componente Section02.tsx
import { Snowflake, Triangle } from "phosphor-react";
import React, { useEffect } from "react";
import bear from "../assets/bear3.png";
import clouds from "../assets/clouds.svg";
import montains from "../assets/montains.svg";

interface Section01Props {
  cloudsRef: React.RefObject<HTMLImageElement>;
  mountainsRef: React.RefObject<HTMLImageElement>;
  textRef: React.RefObject<HTMLImageElement>;
}

const Section01: React.FC<Section01Props> = ({ cloudsRef, mountainsRef, textRef }) => {
  useEffect(() => {
    const preloadImages = async () => {
      await Promise.all([
        new Promise((resolve) => {
          const img = new Image();
          img.src = clouds;
          img.onload = resolve;
        }),
        new Promise((resolve) => {
          const img = new Image();
          img.src = montains;
          img.onload = resolve;
        }),
      ]);
    };

    preloadImages();
  }, []);

  return (
    <div>
      <div className="content">
        <div className="content-title">
          <div ref={textRef} className="box">
            <h1>KARI<Snowflake size={32} /></h1>
            <p>
              Join us for a week of hiking, team-bonding, and digital detoxing.
              This month, one-time only in Kamchatka.
            </p>
            <button>
              Adventure <Triangle className="triangle" size={15} weight="fill" />
            </button>
          </div>
        </div>
      </div>
      <div className="main">
        <img ref={cloudsRef} src={clouds} alt="" />
        <img ref={mountainsRef} src={montains} alt="" />
        <img src={bear} alt="" />
      </div>
    </div>
  );
};

export default Section01;
