// components/Disclaimer.js
import React, { useState } from 'react';

const Disclaimer = () => {
    const [oneLine, setOneLine] = useState(true);

    const multiLine = () => {
        setOneLine(!oneLine);
    };

    return (
        <div className="disDiv cursor-pointer" onClick={multiLine}>
            <p className={`disclaimer ${oneLine ? 'truncate' : ''}`}>
                *Terms and conditions apply. Credit at sole discretion of lender subject to credit appraisal, eligibility check, rates, charges and terms. Information displayed is indicative and from collected from public sources. TheTrueLoans is an independent professional service provider and is not related to the government or government bodies or any regulator or any credit information bureau in any way. Information carried at this website is not and should not be construed as an offer or solicitation or invitation to borrow or lend. The Company does not undertake any liability with respect to the correctness of the content, information and calculations. Information is subject to change without notice. By submitting your query or using any tools or calculators, you authorize TheTrueLoans to share your information with lender(s), consent for such lender(s) to access your credit information report and contact you regarding your query overriding your number being in National Do Not Call Registry. This is a free service and no charges are payable by the borrower to TheTrueLoans. The Company may receive remuneration from lenders for services provided to them.<br />
                We may offer cashback and other schemes from time to time. The cashback amount may vary from lender to lender and we reserve the right to withdraw such schemes any time without any prior notice. You may check the details of the schemes from your relationship officers before applying for a loan.
            </p>
            <div className="readBtn pt-2 text-blue-600 underline">
                {oneLine ? <p>Read More...</p> : <p>Show Less...</p>}
            </div>
        </div>
    );
};

export default Disclaimer;
