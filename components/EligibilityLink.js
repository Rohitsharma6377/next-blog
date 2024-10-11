// components/EligibilityLink.js
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const EligibilityLink = () => {
    return (
        <section className="pageEligibility flex items-center p-6 bg-gray-100 rounded-lg shadow-lg">
            <Image
                src="/images/icons/check-eligibility.svg"
                alt="Check Eligibility Icon"
                width={100} // specify width
                height={100} // specify height
                className="mr-6"
            />
            <div>
                <h1 className="text-2xl font-bold mb-2">Check Eligibility for Home Loan</h1>
                <p className="text-gray-600 mb-4">Loans are available to all individuals, regardless of their income. Find your eligibility with our handy calculator.</p>
                <Link
                    href="/eligibility-calculator"
                    className="amitBtn inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700"
                >
                    Calculate my Eligibility
                </Link>
            </div>
        </section>
    );
};

export default EligibilityLink;
