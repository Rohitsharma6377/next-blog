import React, { useContext, useEffect, useState } from 'react';
import LeadForm from '@/components/LeadForm';
import BlogCarousel from '../blog/BlogCarousel';
import MyContext from "@/context/MyContext";
import Link from 'next/link';
import { fetchDataFromDB } from '@/utils/helper';

const Page = () => {
    const [blogs, setBlogs] = useState([]);
    const { openForm } = useContext(MyContext);


    useEffect(() => {
        window.scrollTo(0, 0);
        callApi();
    }, []);

    const callApi = async () => {
        const response = await fetch('/suggest'); 
        const body = await response.json();
        if (response.status !== 200) throw new Error(body.message);
        setBlogs(body.blogs);
    };

    return (
        <>
            <section className="pageBanner">
                <img src="/images/icons/home-loan-for-self-employed.svg" alt="Home Improvement Loan" />
                <div>
                    <h1 className="text-3xl font-bold">Home Improvement Loan</h1>
                    <p className="mt-2">Give your home a makeover</p>
                </div>
            </section>
            <div className="container mx-auto my-5">
                <div className="grid grid-cols-1 md:grid-cols-7 gap-5">
                    <div className="col-span-5">
                        <ul className="features-list list-none p-0">
                            <li className="feature-item mb-4">
                                <span className="feature-title font-bold">Loan for many purposes</span>
                                <div className="feature-description">
                                    <p>A loan for enhancing your home in many ways- changing the flooring, improvement in the bathrooms, internal or external repairs, etc.</p>
                                </div>
                            </li>
                            <li className="feature-item mb-4">
                                <span className="feature-title font-bold">Minimum rate, Lowest EMI &amp; Maximum Saving</span>
                                <div className="feature-description">
                                    <p>Compare offers from all the leading loan providers and choose the one that best meets your requirement. Loans offered at Home Loan interest rates.</p>
                                </div>
                            </li>
                            <li className="feature-item mb-4">
                                <span className="feature-title font-bold">Exclusive Cash Back Schemes</span>
                                <div className="feature-description">
                                    <p>To sweeten the lucrative deals offered by lenders, TheTrueLoans offers its customers additional, assured Cash Back of up to INR 5000.</p>
                                </div>
                            </li>
                            <li className="feature-item mb-4">
                                <span className="feature-title font-bold">Customer Relationship Officers</span>
                                <div className="feature-description">
                                    <p>We care about your needs at all times. All our customers are assigned a dedicated Customer Relationship Officer. You shall speak to the same person throughout the loan process and they are always available to help you and answer all your queries.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="col-span-2 bg-gray-100 p-5 rounded-lg shadow-lg">
                        <LeadForm />
                    </div>
                </div>
            </div>
            <section className="pageEligibility bg-gray-100 p-5">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Check Eligibility for<br /> Home Improvement loan</h1>
                    <p className="mt-2">Loans are available to individuals with a steady source of income.</p>
                    <p> Find your eligibility with our handy calculator</p>
                    <Link  href="/eligibility-calculator" className="amitBtn mt-3 inline-block bg-blue-600 text-white py-2 px-4 rounded">Check your Eligibility</Link>
                </div>
                <img src="/images/icons/check-eligibility.svg" alt="Check Eligibility" className="mx-auto" />
            </section>
            <div className="container mx-auto mt-5">
                <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
                <div id="accordion" className="mt-4">
                    {/** FAQ items here **/}
                    {/* Sample FAQ item */}
                    <div className="card border mb-2">
                        <div className="card-header" id="heading1">
                            <h5 className="mb-0">
                                <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse1" aria-expanded="true" aria-controls="collapse1">
                                    What is a Home Improvement Loan?<span className="glyphicon glyphicon-plus"></span>
                                </button>
                            </h5>
                        </div>
                        <div id="collapse1" className="collapse" aria-labelledby="heading1" data-parent="#accordion">
                            <div className="card-body">
                                <p>Your home is a reflection of your own personality...</p>
                            </div>
                        </div>
                    </div>
                    {/* Add more FAQ items as needed */}
                </div>
            </div>
            <section className="pageEligibility">
                <img src="/images/icons/balance-transfer-of-existing-loan.svg" alt="Balance Transfer" />
                <div>
                    <h2 className="text-2xl font-bold">Start the Transformation now!</h2>
                    <button onClick={openForm} className="amitBtn mt-3 inline-block bg-blue-600 text-white py-2 px-4 rounded">Request a Call Back</button>
                </div>
            </section>
            <BlogCarousel blogs={blogs} />
        </>
    );
};

export default Page;



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