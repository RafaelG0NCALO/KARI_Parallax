import Carousel from "./CarouselProps";
import carouselImg from "../assets/carousel.png"
import TextInfo from "./TextInfo";

export default function Section03() {
    const images = [
      { img: carouselImg, name: 'Kamchatka Solitude'},
      { img: carouselImg, name: 'Sightseeing'},
      { img: carouselImg, name: 'Camping'},
    ];

  return (
    <>
    <div className="headerCarousel">
      <TextInfo containerClassName="headerCarousel"/>
    </div>
    <div className="content-carousel">
      <div className="main-carousel">
          <Carousel items={images} />
      </div>
    </div>
    </>
  )
}
