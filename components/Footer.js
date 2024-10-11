import React, { useContext, useState } from 'react';
import Image from 'next/image';
import ContactForm from "@/components/ContactForm";
import MyContext from "@/context/MyContext";
import Link from 'next/link';

const Footer = () => {
    const { openForm } = useContext(MyContext);

    return (
        <div>
            <footer className="pt-10 bg-gray-800 text-white">
                <div className="container mx-auto p-4">
                    <div className="grid grid-cols-12 text-center">
                        {/* Important Links */}
                        <div className="col-span-4 mb-5">
                            <h3 className="text-lg font-bold mb-4 text-left">Important Links</h3>
                            <ul className="space-y-2 text-center">
                                {['Privacy Policy', 'Terms of use', 'Disclaimer', 'Terms for Cashback'].map((link) => (
                                    <li key={link}>
                                        <Link href={`/${link.toLowerCase().replace(/ /g, '-')}`} className="text-blue-400 hover:underline">{link}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-span-4 mb-5">
                            <h3 className="text-lg font-bold mb-4 text-left">Pages</h3>
                            <ul className="space-y-2 text-center">
                                {['Home', 'About Us', 'FAQ', 'Blogs', 'Contact Us'].map((link) => (
                                    <li key={link}>
                                        <Link href={`/${link.toLowerCase().replace(/ /g, '-')}`} className="text-blue-400 hover:underline">{link}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Our Products
                        <div className="col-span-4 mb-5">
                            <h3 className="text-lg font-bold mb-4 text-left">Our Products</h3>
                            <ul className="space-y-2 text-center">
                                {['Balance Transfer of Existing Loan', 'Home Construction Loan', 'New Home Loan', 'Home Improvement Loan', 'Loan Against Property', 'Plot Loan', 'EMI Calculator', 'Eligibility Calculator'].map((product) => (
                                    <li key={product}>
                                        <Link href={`/${product.toLowerCase().replace(/ /g, '-')}`} className="text-blue-400 hover:underline">{product}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div> */}
                    </div>
                </div>
                <div className="container mx-auto text-center mt-8">
                    <p className="text-sm">Copyright © 2024. All rights reserved.</p>
                </div>
            </footer>

            {/* Callback Button
            <div id="callback" className="fixed bottom-4 right-8 z-10">
                <button onClick={openForm} className="flex items-center bg-blue-600 text-white p-2 rounded-full shadow-lg transition transform hover:scale-105">
                    <Image src="/images/icons/call-white.svg" alt="Hand" width={24} height={24} className='w-8' />
                    <span className="ml-2 text-sm">Get a Call Back</span>
                </button>
            </div> */}

            <ContactForm />

            {/* WhatsApp and Call Buttons */}
            {/* <Link
                target="_blank"
                href="https://api.whatsapp.com/send?phone=919625100737&amp;text= Hi, I got your number from Trueloans Website."
                className="fixed bottom-4 left-4 p-3 bg-red-400 rounded-full shadow-lg text-white transition transform hover:scale-105"
            >
                <Image src="/images/icons/whatsapp-button.svg" alt="Connect with Trueloans on WhatsApp" width={24} height={24} className='w-6' />
            </Link>
            <Link
                href="tel:+919625100737"
                className="fixed bottom-4 left-20 p-3 bg-blue-500 rounded-full shadow-lg text-white transition transform hover:scale-105"
            >
                <Image src="/images/icons/call-button.svg" alt="Call Trueloans Now" width={24} height={24} className='w-6' />
            </Link> */}
        </div>
    );
};

export default Footer;