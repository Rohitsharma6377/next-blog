import React, { Component } from 'react';
import LeadForm from '@/components/LeadForm';
import Link from 'next/link';
import { fetchDataFromDB } from '@/utils/helper';


export default function Page () {
    return (
        <>
            <div className="container mx-auto my-5 px-4">
                <h1 className="text-3xl font-bold text-center">Apply For Loan</h1>
                <p className="text-center">Feel free to connect with us for any requirement</p>
                <div className="my-5 flex justify-center">
                    <div className="w-full sm:w-1/2 bg-white shadow-md p-5 rounded-lg">
                        <h3 className="text-xl text-center font-semibold mb-4">Please fill the form and we will reach back to you</h3>
                        <LeadForm />
                    </div>
                </div>
            </div>
            <section className="flex items-center justify-center bg-gray-100 p-5 my-5 rounded-lg">
                <img src="/images/icons/check-eligibility.svg" alt="Check Eligibility" className="mr-4" />
                <div>
                    <h1 className="text-xl font-bold">Check Eligibility for Home loan</h1>
                    <p>Loans are available to individuals with a steady source of income. Find your eligibility with our handy calculator.</p>
                    <Link href="/eligibility-calculator" className="mt-2 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Check your Eligibility</Link>
                </div>
            </section>
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold mt-5">Frequently Asked Questions</h2>
                <div className="mt-5">
                    {/* FAQ Item 1 */}
                    <div className="border-b border-gray-300 mb-2">
                        <h5 className="flex justify-between items-center py-3 cursor-pointer" onClick={() => document.getElementById('collapse1').classList.toggle('hidden')}>
                            <span>Question 1</span>
                            <button className="focus:outline-none">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H9m6-6l-6 6 6 6" />
                                </svg>
                            </button>
                        </h5>
                        <div id="collapse1" className="hidden">
                            <p className="py-2">Answer1</p>
                        </div>
                    </div>
                    {/* FAQ Item 2 */}
                    <div className="border-b border-gray-300 mb-2">
                        <h5 className="flex justify-between items-center py-3 cursor-pointer" onClick={() => document.getElementById('collapse2').classList.toggle('hidden')}>
                            <span>Question 2</span>
                            <button className="focus:outline-none">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H9m6-6l-6 6 6 6" />
                                </svg>
                            </button>
                        </h5>
                        <div id="collapse2" className="hidden">
                            <p className="py-2">Answer2</p>
                        </div>
                    </div>
                    {/* FAQ Item 3 */}
                    <div className="border-b border-gray-300 mb-2">
                        <h5 className="flex justify-between items-center py-3 cursor-pointer" onClick={() => document.getElementById('collapse3').classList.toggle('hidden')}>
                            <span>Question 3</span>
                            <button className="focus:outline-none">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H9m6-6l-6 6 6 6" />
                                </svg>
                            </button>
                        </h5>
                        <div id="collapse3" className="hidden">
                            <p className="py-2">Answer3</p>
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