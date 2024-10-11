import React from 'react';
import Link from 'next/link';
import Disclaimer from '@/components/Disclaimer';
import { fetchDataFromDB } from '@/utils/helper';

export default function Page () {
    return (
        <>
            <h1 className="text-3xl font-bold text-center my-5">About Us</h1>
            <div className="container mx-auto px-4">
                <ul className="flex space-x-4 mb-5">
                    <li className="nav-item">
                        <Link className="nav-link text-lg font-semibold py-2 px-4 rounded-lg bg-blue-500 text-white" href="#tab1" role="tab" aria-controls="tab1" aria-selected="true">
                            <h3>About Us</h3>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-lg font-semibold py-2 px-4 rounded-lg hover:bg-blue-200" href="#tab2" role="tab" aria-controls="tab2" aria-selected="false">
                            <h3>How Our Platform Works for your benefit</h3>
                        </Link>
                    </li>
                </ul>
                <div className="tab-content">
                    <div className="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="tab1-tab">
                        <h3 className="text-xl font-semibold mb-4">About Us</h3>
                        <div className="flex flex-wrap">
                            <div className="w-full md:w-9/12 mb-4">
                                <p>Having a home of your own is a dream that most of the people have. Buying a home is probably the largest single investment that most of the individuals make in their lifetime. When one plans about buying a home, a home loan is invariably an integral part of one’s plan.</p>
                                <p>A unique blend of online marketplace &amp; offline (in-person) customer service - thetrueloans.com is a platform designed specifically for helping our customers in managing the “single largest investment of their lifetime” in the most efficient manner.</p>
                                <p>Our management team is led by a vastly experienced and senior professional from the banking industry. We are a passionate and customer-centric team of finance and marketing professionals having a deep desire and dream to use the latest in financial technology for the service of millions in the country in the most convenient, transparent, and truthful way.</p>
                                <p>Our aim is to set new benchmarks in customer service and adding genuine value. We believe in having a long and lasting relationship with our customers. We counsel you throughout the loan tenure and ensure that you have the best deal not just now but, forever.</p>
                                <p>We pride ourselves in not being a customer data collection company and in not sharing the information of our customers for monetary benefits, all under the disguise of being a “technology company.”</p>
                                <h3 className="text-lg font-semibold mt-4">Vision</h3>
                                <p>By using technology &amp; customer service in the most optimum way, be the best provider of optimized financial products, across the country.</p>
                                <h3 className="text-lg font-semibold mt-4">Mission</h3>
                                <p>Build symbiotic relationships with the customers, lenders, and influencers, quickly dissipating the latest information and comparisons of the financial products in a clear, transparent, and unambiguous manner, and delivering value (monetary &amp; customer experience) to our customers.</p>
                            </div>
                            <div className="w-full md:w-3/12 flex items-center justify-center mb-4">
                                <img src="/images/icons/trueloan-services.svg" alt="Services" />
                            </div>
                        </div>
                        <div className="w-full">
                            <h3 className="text-lg font-semibold mt-4">Our Values</h3>
                            <img src="/images/icons/trueloan-values.svg" alt="Values" className="my-4" />
                            <h3 className="text-lg font-semibold mt-4">Our Products</h3>
                            <ul className="list-disc ml-5">
                                <li><Link className="text-blue-500 hover:underline" href="/balance-transfer-of-existing-loan">Balance Transfer of Existing Loan</Link></li>
                                <li><Link className="text-blue-500 hover:underline" href="/home-construction-loan">Home Construction Loan</Link></li>
                                <li><Link className="text-blue-500 hover:underline" href="/new-home-loan">New Home Loan</Link></li>
                                <li><Link className="text-blue-500 hover:underline" href="/home-improvement-loan">Home Improvement Loan</Link></li>
                                <li><Link className="text-blue-500 hover:underline" href="/loan-against-property">Loan Against Property</Link></li>
                                <li><Link className="text-blue-500 hover:underline" href="/plot-loan">Plot Loan</Link></li>
                            </ul>
                            <Disclaimer />
                        </div>
                    </div>
                    <div className="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="tab2-tab">
                        <div className="flex flex-wrap">
                            <h3 className="text-xl font-semibold w-full mb-4">How Our Platform Works for your benefit</h3>
                            <div className="w-full md:w-9/12 mb-4">
                                <p>Loans help in bridging the gap between your aspirations and current resources. Loans enable you to enjoy the fruits of your efforts and labor well in advance. However, most of us seldom get time to check on the best offers available in the market or the best terms for these loans.</p>
                                <p>That is exactly where we come in and put our expertise gained through years of exposure in the financial services industry and customer relationship management.</p>
                                <h3 className="text-lg font-semibold mt-4">Website- an online marketplace</h3>
                                <p>thetrueloans.com is a lender-independent website where we provide you information/ offers from leading lenders (banks, NBFCs, and other financial institutions) collated through in-depth research of multiple public sources, including the lender websites.</p>
                                <p>You have all the required information at your fingertips, based on which you may do an analysis/ comparison of the best and latest offers available from various lenders and choose the options that best suit your need and budget.</p>
                                <h3 className="text-lg font-semibold mt-4">Doorstep Service- end-to-end service to ensure customer delight</h3>
                                <p>Home Loan, unlike other types of loans like personal loans or car loans, is not a vanilla offering and needs a lot of diligence on the part of the customer as well as the lender. Hence, there are multiple in-person interactions, collection, verification, and submission of documents, etc., before a loan is disbursed.</p>
                                <p>Technology has its own advantages but, due to the above-mentioned reasons, it may leave you wanting when it comes to the closure of the service related to the disbursal of a mortgage loan (home loan).</p>
                                <p>Therefore, after you have decided on the lender of your choice, TheTrueLoans offers a personalized doorstep service to ensure the completion of documentation, lender visits, and disbursement are done in a smooth, hassle-free, and transparent manner.</p>
                            </div>
                            <div className="w-full md:w-3/12 flex items-center justify-center mb-4">
                                <img src="/images/icons/trueloan-services.svg" alt="Services" />
                            </div>
                        </div>
                        <div className="w-full">
                            <h3 className="text-lg font-semibold mt-4">We DO NOT share your data</h3>
                            <p>We are an end-to-end loan service provider in the true sense of the name. There are numerous platforms/ websites/ companies that collect customer information under the disguise of being “technology companies” and then monetize the data by sharing it with numerous other companies. That eventually results in you getting bombarded by numerous unsolicited calls/ texts/ e-mails/ WhatsApp messages for cross-selling various financial products based on your profile and credit ratings.</p>
                            <p>On the contrary, we have a No Data Sharing policy for whatsoever reason, and we take utmost care to keep it safe.</p>
                            <p>So do join us whether you wish to avail of our services yourself or intend to become an influencer.</p>
                            <h2 className="text-2xl font-bold my-4">WELCOME to thetrueloans.com</h2>
                            <Disclaimer />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


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