import React from 'react';
import Link from 'next/link';
import LeadForm from '@/components/LeadForm';
import { fetchDataFromDB } from '@/utils/helper';

const ContactUs = () => {
    return (
        <>
            <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-gray-800 text-center">Contact Us</h1>
                <p className="mt-2 text-black text-center">Feel free to connect with us for any requirement</p>

                <div className="flex flex-wrap mt-6">
                    <div className="w-full h-full md:w-1/2 p-4">
                        <h2 className="text-2xl font-semibold text-black mb-4">Get in Touch</h2>
                        <p className="mb-2">
                            <strong className='text-black'>Phone: </strong>
                            <Link className="text-blue-500 hover:underline" href="tel:+919310437366">+91 93104 37366</Link> | <Link className="text-blue-500 hover:underline ml-2" href="tel:+919625100737">96251 00737</Link>
                        </p>
                        <p className="mb-2">
                            <strong className='text-black'>Email: </strong>
                            <Link className="text-blue-500 hover:underline" href="mailto:contactus@thetrueloans.com">contactus@thetrueloans.com</Link>
                        </p>

                        <div className="w-full mt-6">
                            <h2 className="text-2xl font-semibold text-black mb-4">Our Location</h2>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14032.3748910899!2d77.0659528!3d28.446591!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xc614510fd1f3895!2sAmitkk%20-%20Web%20Design%20%26%20Development%2C%20Digital%20Marketing!5e0!3m2!1sen!2sin!4v1598466072979!5m2!1sen!2sin"  className="w-full h-80 border-0" allowFullScreen loading="lazy"></iframe>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 bg-gray-100 p-5 rounded-lg shadow-lg">
                        <LeadForm />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContactUs;



export async function getServerSideProps(context) {
    const { req } = await context;
    const pageUrl = `${req.url}`;
    
    let page;
    try {
      page = await fetchDataFromDB({url: `/api/user/page?url=${pageUrl}`});
    }
    catch (err) {
      console.error("Error fetching data:", err);
    }
    
    return { props: { page: page || [] } };
}