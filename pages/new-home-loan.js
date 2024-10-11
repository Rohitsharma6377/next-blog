import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LeadForm from '@/components/LeadForm';
import BlogCarousel from '../blog/BlogCarousel';
import FAQs from '../components/Faqs';
import MyContext from "@/context/MyContext";
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

const NewHomeLoan = () => {
    const { openForm } = useContext(MyContext);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        callApi();
    }, []);

    const callApi = async () => {
        try {
            const response = await fetch('/suggest');
            if (!response.ok) throw new Error('Network response was not ok');
            const body = await response.json();
            setBlogs(body.blogs);
        } catch (error) {
            console.error("Failed to fetch blogs: ", error);
        }
    };

    const grid = [
        { text: 'SBI Home Loan', rate: '7% to 8.05%', fees: '0.40% of the loan amount plus applicable GST subject to a minimum of Rs 10000/- and maximum of Rs 30000/- plus GST.However, for builder tie up projects where individual TIR and Valuation Is not required: 0.40% of loan amount subject to max. recovery of Rs. 10000/- plus applicable tax.And, if TIR and Valuation is required, then normal charge as mentioned above will be applicable.', tenure: '30 years', ltv: '90%  of the property value' },
        { text: 'Axis Bank', rate: '7.75% to 8.55%', fees: '1% of Loan Amount or Rs 10000 whichever is higher.', tenure: '30 years', ltv: '90% of the property value' },
        { text: 'ICICI Bank', rate: '6.95% to 11.05%', fees: '0.5% to 2.0% of the loan amount or Rs 2000 + GST, whichever is higher.', tenure: '30 years', ltv: '90% of the property value' },
        { text: 'LIC Housing Finance', rate: '6.9% to 7.90%', fees: 'upto Rs 50lacs - Rs 10000+ GST, 50 lacs to 300 lacs - Rs 15000+GST', tenure: '30 years', ltv: '90% of the property value' },
        { text: 'HDFC Home Loan', rate: '6.90% to 8.20%', fees: '0.5% or Rs 3000 + GST, whichever is higher', tenure: '30 years', ltv: '90% of the property value' },
        { text: 'Bank of Baroda', rate: '7.0% to 8.25%', fees: 'upto Rs 50 Lacs - 0.5% subject to min Rs 8500 and max Rs 15000> Rs 50 Lacs - 0.25% subject to min Rs 8500 and max Rs 25000', tenure: '30 years', ltv: '90% of the property value' },
        { text: 'PNB Housing Finance', rate: '7.5% to 9.5%', fees: '1% + GST', tenure: '30 years', ltv: '90% of the property value' },
        { text: 'Citibank Home Loan', rate: '7.05% to 7.35%', fees: 'NIL as of now', tenure: '25 years', ltv: '80% of the property value' },
        { text: 'Kotak Bank', rate: '6.9% to 8.6%', fees: '0.5% + GST + Rs 4000 + GST (ZERO for online application)', tenure: '20 years', ltv: '80% of the property value' },
        { text: 'Yes Bank', rate: '8.95% to 11.8%', fees: '2% or Rs 10000 + GST, whichever is higher', tenure: '35 years', ltv: '90% of the property value' },
        { text: 'IDFC First Bank', rate: '0.095', fees: 'Rs 5000 + GST', tenure: '30 years', ltv: '90% of the property value' },
        { text: 'Canara Bank', rate: '6.9% to 8.9%', fees: '0.5% subject to min Rs 1500 and max Rs 10000', tenure: '30 years', ltv: '90% of the property value' },
        { text: 'Indiabulls', rate: '8.8% to 12.00%', fees: 'upto 2%', tenure: '30 years', ltv: '90% of the property value' },
        { text: 'LT Housing Finance', rate: '8.8% onwards', fees: '0.25% + GST + Rs 4999', tenure: '30 years', ltv: '90% of the property value' },
        { text: 'Tata Capital', rate: '8.5% to 10.10%', fees: '0.5% + GST', tenure: '30 years', ltv: '90% of the property value' },
    ];

    return (
        <div>
            <div className="flex flex-col items-center my-20 space-y-10">
                <h1 className="text-3xl font-bold text-center">Home Loan - New Purchase</h1>
                <p className="text-lg text-center p-2">
                    With a home loan, you can get financial assistance for purchasing a home, whether it’s a newly constructed property or an existing one. Explore your options below:
                </p>
            </div>

            <LeadForm />
            
            <div className="container flex flex-col items-center my-20 space-y-10">
                <h2 className="text-2xl font-bold text-center">Top Home Loan Options</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {grid.map((loan) => (
                        <div key={loan.text} className="p-4 border rounded shadow">
                            <h3 className="text-xl font-semibold">{loan.text}</h3>
                            <p>Rate: {loan.rate}</p>
                            <p>Processing Fees: {loan.fees}</p>
                            <p>Tenure: {loan.tenure}</p>
                            <p>LTV: {loan.ltv}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="my-20">
                <BlogCarousel blogs={blogs} />
            </div>
            <FAQs data={faqs} />
        </div>
    );
};

export default NewHomeLoan;



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