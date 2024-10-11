// components/Testimonials.js
import React from 'react';
import Swiper from 'react-id-swiper';

function Testimonials() {
    const params3 = {
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        loop: true,
        breakpoints: {
            768: { slidesPerView: 2, spaceBetween: 10 },
            1024: { slidesPerView: 3, spaceBetween: 10 },
        },
    };

    return (
        <section className="py-12 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold text-center mb-8">What Our Clients Say</h2>
                <Swiper {...params3}>
                    {[...Array(8)].map((_, index) => (
                        <div key={index} className="review-wrapper p-6 bg-white shadow-md rounded-lg mb-4">
                            <p className="text-gray-700 mb-4">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, corporis ad unde dolor quam numquam accusantium? Ut, labore reprehenderit dicta, repudiandae quas debitis perspiciatis minus obcaecati praesentium beatae architecto eum?
                            </p>
                            <h5 className="font-semibold">Client Name</h5>
                        </div>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}

export default Testimonials;