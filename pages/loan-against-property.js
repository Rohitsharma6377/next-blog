import React, { useEffect, useState } from 'react';
import LeadForm from '@/components/LeadForm';
import FAQs from '@/components/Faqs';
import BlogCarousel from '@/blog/BlogCarousel';
import { fetchDataFromDB } from '@/utils/helper';

const faqs = [
    {
        question: "What is a Plot Loan?",
        answer: "A plot loan helps you buy a piece of land at a location of your choice and construct a home as per your choice. Many leading lenders offer loans to buy a plot and build a home."
    },
    {
        question: "Is it mandatory to build a house immediately?",
        answer: "You may build a house on it later. Check with your lender about specific terms."
    },
    {
        question: "Can I buy any piece of land with a plot loan?",
        answer: "You can purchase plots from real estate development authorities or housing societies, subject to lender conditions."
    },
    {
        question: "What are the rates and processing fees?",
        answer: "Rates may vary, starting from 7.1%. Processing fees typically range from 0.5% to 1%."
    },
    {
        question: "How much loan can I get?",
        answer: "Banks may offer up to 80% of the property value, depending on eligibility."
    },
    {
        question: "What is the maximum tenure for plot loans?",
        answer: "Tenure can be up to 20 years, depending on lender policies."
    },
    {
        question: "Can I avail tax benefits on a plot loan?",
        answer: "Tax exemptions are not allowed on plot loans, unlike home loans."
    },
    {
        question: "What are the charges for a Plot Loan?",
        answer: "Banks charge processing, foreclosure, and other fees, which are explained during loan processing."
    }
];

const Lap = ({ blogs }) => {
    return (
        <>
            <section className="pageBanner flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg">
                <img src="images/icons/home-construction-loan.svg" alt="Home Construction Loan" className="w-24 h-24 md:w-32 md:h-32 mb-4" />
                <div className="text-center">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">New Home Loans</h1>
                    <p className="text-gray-600 text-base md:text-lg">Get a home loan easily &amp; quickly to suit your needs &amp; budget</p>
                </div>
            </section>
            <div className="container mx-auto my-5 px-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-7">
                        <ul className="features-list list-none space-y-4">
                            <li className="feature-item bg-white shadow-lg rounded-lg p-5">
                                <span className="font-bold">Property Type</span>
                                <span className="text-gray-500">House / Land</span>
                            </li>
                            <li className="feature-item bg-white shadow-lg rounded-lg p-5">
                                <span className="font-bold">Eligibility</span>
                                <span className="text-gray-500">Minimum age of 18, Maximum age of 65</span>
                            </li>
                            <li className="feature-item bg-white shadow-lg rounded-lg p-5">
                                <span className="font-bold">Loan Amount</span>
                                <span className="text-gray-500">Up to 90% of property value</span>
                            </li>
                            <li className="feature-item bg-white shadow-lg rounded-lg p-5">
                                <span className="font-bold">Interest Rate</span>
                                <span className="text-gray-500">Starting from 7.1% onwards</span>
                            </li>
                            <li className="feature-item bg-white shadow-lg rounded-lg p-5">
                                <span className="font-bold">Repayment Tenure</span>
                                <span className="text-gray-500">Up to 30 years</span>
                            </li>
                            <li className="feature-item bg-white shadow-lg rounded-lg p-5">
                                <span className="font-bold">Processing Fee</span>
                                <span className="text-gray-500">0.5% - 2% of the loan amount</span>
                            </li>
                        </ul>
                    </div>
                    <div className="md:col-span-5 bg-gray-100 p-5 rounded-lg shadow-lg">
                        <LeadForm />
                    </div>
                </div>
            </div>
            <div className="container mx-auto mt-10">
                <h2 className="text-2xl font-semibold mb-5">Current Market Blogs</h2>
                {Array.isArray(blogs) && <BlogCarousel blogs={blogs} />}
            </div>

            <FAQs data={faqs} />
        </>
    );
};

export default Lap;


export async function getServerSideProps(context) {
    const { req } = await context;
    const pageUrl = `${req.url}`;
    
    let page, blogs;
    try {
      page = await fetchDataFromDB({url: `/api/user/page?url=${pageUrl}`});
      blogs = await fetchDataFromDB({url: `/api/user/blog`});
    }
    catch (err) {
      console.error("Error fetching data:", err);
    }
    
    return { props: { page: page || [], blogs: blogs || [] } };
}