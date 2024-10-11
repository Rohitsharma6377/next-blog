import React, { useState } from 'react';
import Link from 'next/link';
import { fetchDataFromDB } from '@/utils/helper';

const CompareHomeLoan = () => {
    const [search, setSearch] = useState('');

    const data = [
        {
            id: 1,
            img: 'lic-housing-finance-4.png',
            bank: 'LIC HFL Home Loan',
            interest: '6.90% p.a. onwards <span>(Floating Rate)</span>',
            fee: 'Up to ₹1 Cr - 0.25% of Loan Amount, subject to maximum ₹10,000/- (Plus GST), Above ₹1 Cr and up to ₹5 Crs - 0.25% of Loan Amount, subject to maximum ₹25,000/- (Plus GST) <span>(Processing Fee)</span>',
            amount: '₹ 30L - ₹ 5Crs <span>Loan Amount</span> 5-30 Years <span>Tenure Range</span>'
        }
        // Add more loan data as needed
    ];

    const filteredData = data.filter((item) => {
        return item.bank.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <>
            <section className="bg-gray-100 py-10">
                <div className="container mx-auto flex flex-col items-center">
                    <img src="images/icons/home-loan-for-salaried-professionals.svg" alt="Home Loan" className="mb-4" />
                    <h1 className="text-3xl font-bold">Compare Home Loans</h1>
                    <p className="text-gray-600">Get a home loan today</p>
                </div>
            </section>
            <div className="container mx-auto my-5">
                <h2 className="text-2xl font-semibold text-center">Compare Home Loans</h2>
                <p className="text-center mb-4">Check loans from various banks and choose the one that suits you.</p>
                <input
                    type="text"
                    placeholder="Search for banks here"
                    className="w-full max-w-md p-2 border border-gray-300 rounded-md"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="mt-5">
                    <div className="grid grid-cols-5 font-semibold border-b">
                        <div className="p-2">Bank Name</div>
                        <div className="p-2">Interest Rate</div>
                        <div className="p-2">Processing Fee</div>
                        <div className="p-2">Loan Amount/Tenure</div>
                        <div className="p-2"></div>
                    </div>
                    {filteredData.length > 0 ? (
                        filteredData.map((item) => (
                            <div className="grid grid-cols-5 border-b py-2" key={item.id}>
                                <div className="flex items-center p-2">
                                    <img className="h-10 w-10 mr-2" src={`/images/banks/${item.img}`} alt={item.bank} />
                                    {item.bank}
                                </div>
                                <div className="p-2" dangerouslySetInnerHTML={{ __html: item.interest }} />
                                <div className="p-2" dangerouslySetInnerHTML={{ __html: item.fee }} />
                                <div className="p-2" dangerouslySetInnerHTML={{ __html: item.amount }} />
                                <div className="p-2">
                                    <Link className="bg-blue-500 text-white py-1 px-3 rounded-md" href="/enquire">
                                        Enquire Now
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center p-4">No banks found.</div>
                    )}
                </div>
            </div>
            <section className="bg-gray-200 py-10">
                <h2 className="text-2xl font-semibold text-center">Looking for a Home Loan?</h2>
                <Link className="bg-blue-500 text-white py-2 px-4 rounded-md" href="/apply-for-home-loan">Apply for Home Loan</Link>
            </section>
            <div className="container mx-auto">
                <div id="accordion" className="mt-5">
                    <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
                    <div className="border border-gray-300 rounded-md mt-4">
                        {/* Question 1 */}
                        <div className="border-b">
                            <button className="flex justify-between w-full p-4 text-left" onClick={() => document.getElementById("collapse1").classList.toggle("hidden")}>
                                <span>Question 1</span>
                                <span className="text-gray-500">+</span>
                            </button>
                            <div id="collapse1" className="collapse hidden">
                                <div className="p-4">Answer 1</div>
                            </div>
                        </div>
                        {/* Question 2 */}
                        <div className="border-b">
                            <button className="flex justify-between w-full p-4 text-left" onClick={() => document.getElementById("collapse2").classList.toggle("hidden")}>
                                <span>Question 2</span>
                                <span className="text-gray-500">+</span>
                            </button>
                            <div id="collapse2" className="collapse hidden">
                                <div className="p-4">Answer 2</div>
                            </div>
                        </div>
                        {/* Question 3 */}
                        <div className="border-b">
                            <button className="flex justify-between w-full p-4 text-left" onClick={() => document.getElementById("collapse3").classList.toggle("hidden")}>
                                <span>Question 3</span>
                                <span className="text-gray-500">+</span>
                            </button>
                            <div id="collapse3" className="collapse hidden">
                                <div className="p-4">Answer 3</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CompareHomeLoan;


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