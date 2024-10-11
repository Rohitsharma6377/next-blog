import React, { useEffect, useState, useContext } from 'react';
import Grid from '../components/Grid';
import BlogCarousel from '../blog/BlogCarousel';
import FAQs from '../components/Faqs';
import LeadForm from '@/components/LeadForm';
import MyContext from "@/context/MyContext";
import Link from 'next/link';
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

const PlotLoan = () => {
    const { openForm } = useContext(MyContext);
    const [blogs, setBlogs] = useState([]);
    
    const grid = [
        {text: 'SBI Home Loan' , rate: '0.0765' , fees: '0.40% of the loan amount plus applicable GST subject to a minimum of Rs 10000/- and maximum of Rs 30000/- plus GST.' , tenure: '30 years' , ltv: '90% of the property value'},
        {text: 'ICICI Bank' , rate: '7.85% to 8.30%' , fees: '1% + GST  + (Rs 5000 + GST or 0.25% + GST, whichever is lower)' , tenure: '20 years' , ltv: '70%'},
        {text: 'LIC Housing Finance' , rate: 'contact nearest office for prevailing rates' , fees: 'contact nearest office for prevailing rates' , tenure: '15 years' , ltv: '75%'},
        {text: 'HDFC Home Loan' , rate: '8.5% to 9.15%' , fees: 'up to 0.5% of the loan amount or Rs 3000, whichever is higher' , tenure: '15 years' , ltv: '80%'},
        {text: 'PNB Housing Finance' , rate: '8.5% to 10.7%' , fees: '2% of the loan + GST' , tenure: '30 years' , ltv: '90%'},
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
        callApi();
    }, []);

    const callApi = async () => {
        try {
            const response = await fetch('/suggest');
            const body = await response.json();
            if (response.status !== 200) throw Error(body.message);
            setBlogs(body.blogs);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    return (
        <>
            <section className="pageBanner">
                <img src="images/icons/home-loan-for-salaried-professionals.svg" alt=""/>
                <div>
                    <h1>Plot Loan</h1>
                    <p>Buy plot to build your dream home or buy plot for an investment</p>
                </div>
            </section>
            <div className="container my-5">
                <div className="row">
                    <div className="col-span-7">
                        <ul className="features-list list-unstyled">
                            {grid.map((feature, index) => (
                                <li key={index} className="feature-item">
                                    <span className="feature-title">{feature.text}</span>
                                    <div className="feature-description">
                                        <p>{feature.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-span-5 bg-gray-100 p-5 rounded-lg shadow-lg">
                        <LeadForm />
                    </div>
                </div>
            </div>
            <section className="pageEligibilty">
                <div>
                    <h1>Check Eligibility for <br/>Plot loan</h1>
                    <p>Loans are available to individuals with a steady source of income.</p>
                    <p>Find your eligibility with our handy calculator</p>
                    <Link href="/eligibility-calculator" className="amitBtn">Check your Eligibility</Link>
                </div>
                <img src="images/icons/check-eligibility.svg" alt=""/>
            </section>
            
            <FAQs data={faqs} />

            <section className="pageEligibilty">
                <img src="images/icons/balance-transfer-of-existing-loan.svg" alt=""/>
                <div>
                    <h2>Make your dream of a home at the <br/>best location a reality!</h2>
                    <button onClick={openForm} className="amitBtn">Request a Call Back</button>
                </div>
            </section>
            <div className="container mt-5">
                {/* <Grid grid={grid}/> */}
            </div>
            <BlogCarousel blogs={blogs} />
        </>
    );
};

export default PlotLoan;


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