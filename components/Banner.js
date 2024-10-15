// components/BannerSlider.js
import React, { useRef, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BannerSlider = () => {
    const sliderRef = useRef(null);

    // Slider settings
    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 100,
        autoplay: true,
        autoplaySpeed: 4500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    // Handle keyboard navigation
    const handleKeyDown = (event) => {
        if (event.key === 'ArrowLeft') {
            sliderRef.current.slickPrev();
        } else if (event.key === 'ArrowRight') {
            sliderRef.current.slickNext();
        }
    };

    // Add event listener for keyboard navigation
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);


    return (
        <div className="relative">
            <Slider ref={sliderRef} {...sliderSettings}>
                <div>
                    <img
                        src="/images/static/forest.jpg"
                        alt="Banner 1"
                        className="w-full cursor-pointer"
                    />
                </div>
                <div>
                    <img
                        src="/images/static/lake.jpg"
                        alt="Banner 2"
                        className="w-full cursor-pointer"
                    
                    />
                </div>
                <div>
                    <img
                        src="/images/static/landscape.jpg"
                        alt="Banner 3"
                        className="w-full cursor-pointer"
                    />
                </div>
                <div>
                    <img
                        src="/images/static/lake2.jpg"
                        alt="Banner 4"
                        className="w-full cursor-pointer"
                    />
                </div>
                <div>
                    <img
                        src="/images/static/mountain.jpg"
                        alt="Banner 5"
                        className="w-full cursor-pointer"
                    />
                </div>
                <div>
                    <img
                        src="/images/static/volcano.jpg"
                        alt="Banner 5"
                        className="w-full cursor-pointer"
                    />
                </div>
            </Slider>

            {/* Custom Navigation Arrows
            <div className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 cursor-pointer" onClick={() => sliderRef.current.slickPrev()}>
                <div className="text-gray-800 text-2xl hover:text-gray-600">❮</div>
            </div>
            <div className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 cursor-pointer" onClick={() => sliderRef.current.slickNext()}>
                <div className="text-gray-800 text-2xl hover:text-gray-600">❯</div>
            </div> */}
        </div>
    );
};

export default BannerSlider;
