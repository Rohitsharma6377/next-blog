// components/MarqueeSlider.js
import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function MarqueeSlider() {
    const sliderRef = useRef(null); // Create a reference to the slider

    const settings = {
        dots: false, // Disable dots if you don't want pagination
        infinite: true, // Enable infinite looping
        speed: 500, // Transition speed
        autoplay: true, // Enable autoplay
        autoplaySpeed: 4500, // Autoplay delay
        slidesToShow: 1, // Number of slides to show
        slidesToScroll: 1, // Number of slides to scroll
        arrows: false, // Disable default arrows
    };

    return (
        <div className="relative">
            <Slider ref={sliderRef} {...settings}>
                <div className="flex items-center justify-center bg-yellow-200 p-4 text-center">
                    <span className="text-lg font-semibold text-black text-center">
                        Avail CASH BACK up to <span className="font-bold text-black">&#8377;15000/-</span>{' '}
                        <span className='text-black'>(T&amp;C Apply)</span>
                    </span>
                </div>
                <div className="flex items-center justify-center bg-yellow-200 p-4 text-center">
                    <span className="text-lg text-black font-semibold text-center">Our Door Step services ensure your Convenience</span>
                </div>
                <div className="flex items-center justify-center bg-yellow-200 p-4 text-center">
                    <span className="text-lg text-black font-semibold">End-to-end facilitation – Enquiry to Loan Disbursal</span>
                </div>
                <div className="flex items-center justify-center bg-yellow-200 p-4 text-center">
                    <span className="text-lg text-black font-semibold">
                        TheTrueLoans offers <span className="font-bold">FREE</span> services to its customers
                    </span>
                </div>
            </Slider>
        </div>
    );
}

export default MarqueeSlider;
