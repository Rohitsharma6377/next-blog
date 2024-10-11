import React, { useContext } from 'react'
import FAQs from '../components/Faqs'
import MyContext from "@/context/MyContext";
import Image from 'next/image';
import { fetchDataFromDB } from '@/utils/helper';

const faqs = [
    {
        question: "What is a Home Loan for salaried professionals?",
        answer: "On the basis of the monthly salary earned, lenders calculate the amount which they can offer to a salaried professional as a Home Loan for buying a new home/flat/builder floor, etc. Depending upon multiple factors like total take-home salary, type of employer, years in service, etc., lenders can offer loans up to 90% of the agreement value for a tenure of up to 30 years."
    },
    {
        question: "What is a Home Loan for self-employed?",
        answer: "Self-employed professionals are people who run their own businesses. It may be a doctor running a clinic or a practicing CA or an owner of a large company. Various lenders offer home loans to self-employed professionals to buy a new home."
    },
    {
        question: "I am self-employed but, do not have an income proof like an ITR. Can I still get a Home Loan?",
        answer: "Yes, even with no income proof, self-employed people can avail of a home loan facility."
    },
    {
        question: "What is a Home Loan for salaried professionals?",
        answer: "On the basis of the monthly salary earned, lenders calculate the amount which they can offer to a salaried professional as a Home Loan for buying a new home/flat/builder floor, etc. Depending upon multiple factors like total take-home salary, type of employer, years in service, etc., lenders can offer loans up to 90% of the agreement value for a tenure of up to 30 years."
    },
    {
        question: "What is a Home Loan for self-employed?",
        answer: "Self-employed professionals are people who run their own businesses. It may be a doctor running a clinic or a practicing CA or an owner of a large company. Various lenders offer home loans to self-employed professionals to buy a new home."
    },
    {
        question: "I am self-employed but, do not have an income proof like an ITR. Can I still get a Home Loan?",
        answer: "Yes, even with no income proof, self-employed people can avail of a home loan facility."
    },
    {
        question: "What is a Home Loan for salaried professionals?",
        answer: "On the basis of the monthly salary earned, lenders calculate the amount which they can offer to a salaried professional as a Home Loan for buying a new home/flat/builder floor, etc. Depending upon multiple factors like total take-home salary, type of employer, years in service, etc., lenders can offer loans up to 90% of the agreement value for a tenure of up to 30 years."
    },
    {
        question: "What is a Home Loan for self-employed?",
        answer: "Self-employed professionals are people who run their own businesses. It may be a doctor running a clinic or a practicing CA or an owner of a large company. Various lenders offer home loans to self-employed professionals to buy a new home."
    },
    {
        question: "I am self-employed but, do not have an income proof like an ITR. Can I still get a Home Loan?",
        answer: "Yes, even with no income proof, self-employed people can avail of a home loan facility."
    },
];

function Faq() {
    const { openForm } = useContext(MyContext);

    return (
        <>
            <FAQs data={faqs}/>
            <section className="pageEligibility flex flex-col md:flex-row items-center justify-between p-6 bg-blue-50 rounded-lg shadow-lg">
                <div className="flex-shrink-0">
                    <Image 
                        src="images/icons/balance-transfer-of-existing-loan.svg" 
                        alt="Balance Transfer Icon" 
                        width={400} height={400}
                        className="w-32 h-32 md:w-48 md:h-48 object-contain mx-auto" 
                    />
                </div>
                <div className="text-center md:text-left mt-4 md:mt-0 md:ml-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Start Building Your Future!</h2>
                    <p className="text-gray-600 mt-2 mb-4">
                        Take the first step towards financial freedom. 
                    </p>
                    <button onClick={openForm} className="bg-yellow-500 text-white py-2 px-4 rounded-md shadow hover:bg-yellow-600 transition duration-200">
                        Request a Call Back
                    </button>
                </div>
            </section>
        </>
    )
}

export default Faq


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