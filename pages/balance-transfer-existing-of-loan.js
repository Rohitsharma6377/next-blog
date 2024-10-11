import React, { useState, useEffect } from 'react';
import LeadForm from '@/components/LeadForm';
import BlogCarousel from '../blog/BlogCarousel';
import FAQs from '../components/Faqs';
import { fetchDataFromDB } from '@/utils/helper';

const faqs = [
    {
        question: "What is a Plot Loan?",
        answer: "A dream home may be the one which is not just well constructed but, is also at a location of your choice. Buying a house from a builder or a society may ensure good construction but, you may not have the exteriors (location) of your choice. A plot loan is a loan that helps you buy a piece of land at a location of your choice and construct a home as per your choice. So, if you want to own land (plot) and build a dream home, a plot loan is the best option for you. Many leading lenders offer loans to their customers to buy a plot and build a home on it."
    },
    {
        question: "Is it mandatory that I have to build a house on the plot immediately after buying it?",
        answer: "A plot loan is offered to buy a plot. You may build a house on it at a later date also. This also depends from lender to lender. It is advisable to check with the lender that you finalise, on the terms and conditions related to the construction on a plot bought through a plot loan. Through a plot loan, you may also choose to buy a land only for investment and sell it off later, at a higher rate, even without constructing a house."
    },
    {
        question: "Can I buy any piece of land through a plot loan?",
        answer: "You may take a loan to purchase plots directly from the real estate development authority or housing society OR for purchasing plots being offered in re-sale. The lenders do a due diligence and have a specific set of conditions for offering plot loans, which include the land type, location, chain of documents, and many more. You can buy a land using a plot loan if the conditions laid down by the lenders are met."
    },
    {
        question: "What is the rate and processing fees at which plot loans are offered?",
        answer: "The rates and processing fees may differ from lender to lender. The plot loan rates start at as low as 7.1%, depending on conditions like loan amount, profile, your CIBIL score, etc. Women borrowers can get some discount over the market rate, depending from lender to lender."
    },
    {
        question: "How much loan amount, as a percentage of the property value can I get?",
        answer: "Depending upon your eligibility, banks may offer a maximum loan of up to 80% of the property value."
    },
    {
        question: "What is the maximum tenure for which plot loans are offered?",
        answer: "The tenure of a loan is decided by the lenders based on factors like your income, your age, etc., and it may vary from lender to lender. Usually, the maximum tenure for plot loans is 10-15 years but, in some cases, the lenders may also offer plot loans for a period of 20 years."
    },
    {
        question: "Can I avail tax benefits on a plot loan?",
        answer: "Tax exemptions / tax benefits are not allowed on plot loans unlike home loans, where you can avail tax benefits for both principal repayment and interest payment. However, if you avail a plot and construction loan, the borrower may enjoy a tax benefit on the construction loan."
    },
    {
        question: "What are the charges for a Plot Loan that the banks usually charge?",
        answer: "In addition to mortgage interest rates, banks charge the following fees on loan: \n- Processing fee: This fee is charged when you apply for a loan. The processing fee can range between 0.50 - 1% of the loan amount. If you approach the bank through an online marketplace, we shall assist you in negotiating the best possible amount with the bank. \n- Foreclosure fee: This fee is charged when you decide to close your loan before the completion of the loan tenure. \n- Other Charges: Banks charge legal and technical fees from the borrower which are explained at the time of loan processing."
    }
];

const Btel = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        callApi();
    }, []);

    const callApi = async () => {
        const response = await fetch('/suggest'); 
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        setBlogs(body.blogs);
    };

    const grid = [
        { text: 'SBI Home Loan', rate: '6.95% to 8.05%', fees: '0.40% of the loan amount plus applicable GST subject to a minimum of Rs 10000/- and maximum of Rs 30000/- plus GST.', tenure: '30 years', ltv: '0.9' },
        { text: 'Axis Bank', rate: '7.75% to 8.55%', fees: '1% of Loan Amount or Rs 10000 whichever is higher.', tenure: '30 years', ltv: '90% of the property value' },
    ];

    return (
        <>
            <section className="pageBanner flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg container">
                <img src="images/icons/home-construction-loan.svg" alt="" className="w-24 h-24 md:w-32 md:h-32 mb-4" />
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
                                <span className="feature-title text-lg font-semibold text-gray-800">Loan for all profiles</span>
                                <div className="feature-description mt-2">
                                    <p className="text-gray-600">Whether you are salaried or self-employed, whether you have an income proof or not, we can help in getting a loan to buy a new home and fulfil your dreams.</p>
                                </div>
                            </li>
                            <li className="feature-item bg-white shadow-lg rounded-lg p-5">
                                <span className="feature-title text-lg font-semibold text-gray-800">Maximum Loan Amount and Tenure</span>
                                <div className="feature-description mt-2">
                                    <p className="text-gray-600">Loan amount of up to 90% of the registry value and tenure up to 30 years, so that your desire of owning your dream home is not limited by high EMI.</p>
                                </div>
                            </li>
                            <li className="feature-item bg-white shadow-lg rounded-lg p-5">
                                <span className="feature-title text-lg font-semibold text-gray-800">Minimum rate, lowest EMI &amp; Maximum Saving</span>
                                <div className="feature-description mt-2">
                                    <p className="text-gray-600">Compare offers from all the leading loan providers and choose the one that best meets your requirement. Get best available offers like NIL processing fees etc. from the loan providers.</p>
                                </div>
                            </li>
                            <li className="feature-item bg-white shadow-lg rounded-lg p-5">
                                <span className="feature-title text-lg font-semibold text-gray-800">Insurance</span>
                                <div className="feature-description mt-2">
                                    <p className="text-gray-600">For your peace of mind, we will help you secure your home loan with a range of insurance products available for all your needs.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="md:col-span-5">
                        <LeadForm />
                    </div>
                </div>
            </div>
            <BlogCarousel blogs={blogs} />
            <FAQs data={faqs} />
            <div className="container my-8 mx-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Loan Providers</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border-b text-left p-4">Lender</th>
                                <th className="border-b text-left p-4">Interest Rate</th>
                                <th className="border-b text-left p-4">Processing Fees</th>
                                <th className="border-b text-left p-4">Max Tenure</th>
                                <th className="border-b text-left p-4">Loan to Value Ratio (LTV)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {grid.map((row, index) => (
                                <tr key={index}>
                                    <td className="border-b p-4">{row.text}</td>
                                    <td className="border-b p-4">{row.rate}</td>
                                    <td className="border-b p-4">{row.fees}</td>
                                    <td className="border-b p-4">{row.tenure}</td>
                                    <td className="border-b p-4">{row.ltv}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Btel;
