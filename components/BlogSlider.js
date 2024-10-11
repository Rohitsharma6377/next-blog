import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useContext, useRef } from "react";
import MyContext from "@/context/MyContext";


export default function BlogSlider({ data }) {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isOpen, setIsOpen, openForm, closeForm } = useContext(MyContext);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: false,
    afterChange: (index) => setCurrentIndex(index),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <section className="bg-gray-200 text-center pt-20 pb-20">
      <div className="px-10 md:px-20 lg:px-32">
        <h1 className="text-2xl font-bold text-black mb-2">
          Interesting Reads
        </h1>
        <hr className="border-t-2 w-28 mx-auto border-gray-400 mb-6" />
        <Link href="/blog" className="bg-secondary hover:bg-hover text-white font-semibold py-3 px-6 rounded-lg">
          View More
        </Link>

        <div className="relative mt-8">
          <Slider {...settings} ref={sliderRef}>
            {Array.isArray(data) && data.map((blog, index) => (
              <div key={index} className="bg-transparent mx-auto rounded-lg px-8 py-4 overflow-hidden">
                <a href={`blog${blog.url}`}>
                  <div className="bg-white mx-auto text-center rounded-lg border border-gray-300 overflow-hidden flex flex-col justify-between min-h-[200px]">
                    <div className="relative h-[200px]">
                      <Image 
                      src={`/${blog.media_path}`}
                      alt={blog.media_alt}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                      />
                    </div>
                    <div className="px-4 py-2">
                      <h3 className="font-bold text-lg mb-1">{blog.title}</h3>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </Slider>

          <button className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-light bg-opacity-90 rounded-full p-2" onClick={handlePrev}>
            <Image src="/icons/arrow-left.svg" alt="left-arrow" height={25} width={25} className="h-6 w-6" />
          </button>
          <button className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-light bg-opacity-90 rounded-full p-2" onClick={handleNext}>
            <Image src="/icons/arrow-right.svg" alt="right-arrow" height={25} width={25} className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
}