import React, { useRef, useEffect } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

export default function BannerSlider() {
  const sliderRef = useRef<Slider>(null)

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 4500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  }

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      sliderRef.current?.slickPrev()
    } else if (event.key === "ArrowRight") {
      sliderRef.current?.slickNext()
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const slides = [
    { src: "/images/static/forest.jpg", alt: "Forest" },
    { src: "/images/static/lake.jpg", alt: "Lake" },
    { src: "/images/static/landscape.jpg", alt: "Landscape" },
    { src: "/images/static/lake2.jpg", alt: "Another Lake" },
    { src: "/images/static/mountain.jpg", alt: "Mountain" },
    { src: "/images/static/volcano.jpg", alt: "Volcano" },
  ]

  return (
    <div className="relative">
      <Slider ref={sliderRef} {...sliderSettings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-[550px] object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-start p-12">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Nature is Calling
              </h2>
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Escape Now
              </h3>
              <p className="text-white text-lg md:text-xl mb-8 max-w-md">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}