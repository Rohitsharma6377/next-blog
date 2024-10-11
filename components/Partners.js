import React from 'react';
import Swiper from 'react-id-swiper';

function Partners() {
    const params2 = {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        autoplay: { delay: 5000 },
        freeMode: true,
        speed: 7000,
        breakpoints: {
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 4, spaceBetween: 40 },
            1024: { slidesPerView: 5, spaceBetween: 50 },
        },
    };

    const partners = [
        'images/logos/american_expresss_logo.png',
        'images/logos/axis_bank_logo.png',
        'images/logos/credila_logo.png',
        'images/logos/dcb_bank_logo.png',
        'images/logos/hdfc_mf_logo.png',
        'images/logos/induslnd_bank_logo.png',
        'images/logos/sbi_card_logo.png',
    ];

    return (
        <section className="partners py-5">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold text-center mb-6">Our Partners</h2>
                <Swiper {...params2}>
                    {partners.map((logo, index) => (
                        <div key={index} className="flex justify-center">
                            <img src={logo} alt={`Partner logo ${index + 1}`} className="h-16 object-contain" />
                        </div>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}

export default Partners;