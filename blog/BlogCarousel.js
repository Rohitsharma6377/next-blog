import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useContext, useRef, useEffect } from "react";

import arrowLeft from "../public/icons/arrow-left.svg";
import arrowRight from "../public/icons/arrow-left.svg";
import MyContext from "@/context/MyContext";
import { Button } from "@nextui-org/react";

export default function BlogSlider({ blogs }) {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isOpen, setIsOpen, openForm, closeForm } = useContext(MyContext);
  const [isMobile, setIsMobile] = useState(false);

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
        breakpoint: 1024, // For tablets and below
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600, // For mobile devices
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  // Check if screen is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // Use 1024px breakpoint for tablet and below
    };

    // Check on initial render
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // Only render the slider on large screens if there are 4 or more items, but allow it on mobile even with fewer items
  const shouldRenderSlider = isMobile || Array.isArray(blogs) && (blogs.length >= 4);

  return (
    <section className="bg-gray-200 text-center pt-20 pb-20">
      <div className="px-10 md:px-20 lg:px-32">
        <h1 className="text-2xl font-bold text-black mb-2">
          Interesting Reads
        </h1>
        <hr className="border-t-2 w-28 mx-auto border-gray-400 mb-6" />
        <Button href="/blogs" as={Link} className="bg-secondary text-white" variant="flat">
          View More
        </Button>

        {shouldRenderSlider ? (
          <div className="relative mt-8">
            <Slider {...settings} ref={sliderRef}>
              {Array.isArray(blogs) && blogs.map((blog, index) => (
                <div key={index} className="bg-transparent mx-auto rounded-lg px-4 py-4 overflow-hidden">
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
                    {blog && (
                      <div className="px-4 py-4">
                        <h3 className="text-lg mb-2 two-liner">{blog.title}</h3>
                        <a href={`/blog/${blog.url}`} className="bg-primary text-white text-sm rounded-xl px-3 py-2" variant="flat">
                          Read More
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </Slider>

            <button className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-light bg-opacity-90 rounded-full p-2" onClick={handlePrev}>
              <Image src={arrowLeft} alt="left-arrow" height={25} width={25} className="h-6 w-6" />
            </button>
            <button className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-light bg-opacity-90 rounded-full p-2" onClick={handleNext}>
              <Image src={arrowRight} alt="right-arrow" height={25} width={25} className="h-6 w-6" />
            </button>
          </div>
        ) : (
          <div className="mt-8">
            {/* Render the first three blogs without a slider */}
            {Array.isArray(blogs) && blogs.slice(0, 3).map((blog, index) => (
              <div key={index} className="bg-transparent mx-auto rounded-lg py-4 overflow-hidden">
                <div className="bg-white mx-auto text-center rounded-lg border border-gray-300 overflow-hidden flex flex-col justify-between min-h-[200px] mb-6">
                  <div className="relative h-[200px]">
                    <Image 
                      src={`/${blog.media_path}`}
                      alt={blog.media_alt}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                    />
                  </div>
                  {blog && (
                    <div className="px-4 py-4">
                      <h3 className="font-bold text-lg mb-4">{blog.title}</h3>
                      {/* <a href={`/blog/${blog.url}`} className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 py-2 mx-auto">
                        Read More
                      </a> */}
                      <a href={`/blog/${blog.url}`} className="bg-primary text-white rounded-3xl px-3 py-2" variant="flat">
                        Read More
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}