// pages/cashback.js
import React from 'react';
import Header from '../components/Header'; // Update the path if necessary
import Footer from '../components/Footer'; // Update the path if necessary
import { fetchDataFromDB } from '@/utils/helper';

function Cashback() {
    return (
        <>
            <div className="container mx-auto my-5 px-4">
                <h1 className="text-3xl font-bold mb-5">Cash Back Offer - Terms & Conditions</h1>
                <div className="my-5">
                    <div className="mb-5">
                        <h2 className="text-xl font-semibold">Definitions</h2>
                        <p>For the purpose of these terms and conditions (“Terms and Conditions”):</p>
                        <ul className="list-disc pl-5">
                            <li>“Website” shall mean www.thetrueloans.com</li>
                            <li>“Lender/s” or a “Preferred Lender” shall mean a Bank or a Non-Banking Finance Company (NBFC) or a Housing Finance Company (HFC) whose loan offers are listed on the website and with whom TheTrueLoans is empanelled as an agent for selling theirs loan and/ or other financial products/ services.</li>
                            <li>“Loan” or “Facility” shall mean a loan that the customer has taken from a Lender through TheTrueLoans.</li>
                            <li>“Customer/s” shall mean individual/s registered on the website of TheTrueLoans as a customer before applying for the loan and who have taken the loan from his/ her chosen finance company, through TheTrueLoans.</li>
                            <li>“Validity period” is the calendar month in which the “Cash Back” offer has been displayed on the website OR the period as mentioned on the website.</li>
                            <li>“Gift” or “Cash Back” or “Offer” or “Program” shall mean a specific amount as communicated by the representative of TheTrueLoans, at the time of filling of the loan application form by the customer, subject to the disbursement happening within the validity period.</li>
                            <li>“Privacy Policy” shall mean the terms and conditions applicable to the usage of the website.</li>
                        </ul>
                    </div>

                    <div className="mb-5">
                        <h3 className="text-lg font-semibold">Membership/ Registration:</h3>
                        <p>The customers are required to register on our website www.thetrueloans.com as a customer.</p>
                    </div>

                    <div className="mb-5">
                        <h3 className="text-lg font-semibold">Validity Period:</h3>
                        <p>01 November 2020 to 31 December 2020.</p>
                    </div>

                    <div className="mb-5">
                        <h3 className="text-lg font-semibold">Our Cashback offer:</h3>
                        <p>The Cash Back offer is being made by TheTrueLoans.</p>
                        <p>Our Cashback offer allows customers to earn cashback on tracked services (loans) from a few preferred lenders listed on the website. Cash Back may not be applicable for loans taken from some of the lenders listed on our website, even if it is through TheTrueLoans.</p>
                        <p>To qualify for cashback, the lender must confirm that the customer’s purchase (loan) is tracked and is found to be made through TheTrueLoans (constituting a “Qualifying Transaction“). In the event that the Lenders do not track a transaction and do not attribute it to be done through TheTrueLoans, then any due or expected cashback from these loans will also not be paid to the customer.</p>
                        <p>Even if the loan application of the customer is processed & the loan is disbursed by a preferred lender, but not through TheTrueLoans, the customer is not entitled for any cash back.</p>
                        <p>The maximum monthly cash back offered to the customers, as per the current offer is INR 15000/- (Fifteen thousand Indian Rupees only). All customers may not be entitled to get the maximum Cash Back amount. The Cash Back amount will vary from customer to customer, depending upon the loan amount, rate of interest, fees, etc. offered to the customer.</p>
                        <p>The Program is not available wherever prohibited and/or on products/services for which such programs cannot be offered for any reason whatsoever.</p>
                    </div>

                    <div className="mb-5">
                        <h3 className="text-lg font-semibold">Cash Back Receipt Method:</h3>
                        <p>The cash back amount shall be credited to the bank account of the customer within 90 days of the disbursement of the loan.</p>
                        <p>If you are asked for, and provide, details of a bank account into which you wish to receive payments (your “Cashback Receipt Method”), you (a) must ensure that you are, and remain, fully entitled to use that Cashback Receipt Method, and (b) confirm that you wish to receive cashback through that Cashback Receipt Method. You should keep this information updated through your Account. Note that your Cashback Receipt Method (such as NEFT) may have rules about the minimum payment that you can receive through that Cashback Receipt Method.</p>
                        <p>Any government levies or applicable taxes accruing on account of cashback will have to be paid and borne by the customer directly.</p>
                    </div>

                    <div className="mb-5">
                        <h3 className="text-lg font-semibold">Cashback Payment:</h3>
                        <p>The winners of the Cashback will be intimated about the value of the cash back amount through email or SMS on their registered email address or/and mobile number respectively after the disbursement of the loan. It is the responsibility of the customer to ascertain the exact value of the Cash Back amount applicable to him/her, from the representative of TheTrueLoans at the time of filling up of the application form.</p>
                        <p>After a Customer successfully completes a Qualifying Transaction (when the loan is disbursed by the preferred lender and processed through TheTrueLoans), and once we have received the resulting commission for that Qualifying Transaction, we pass that Cashback to the customer through his/her Cashback Receipt Method. Please note that there are various circumstances in which a transaction with a preferred lender may not constitute a Qualifying Transaction, or Cashback may not result from it. The customer understands that from time to time the lenders may increase or decrease the commission paid – in which case the cashback offer illustrated on our Site may be incorrect.</p>
                        <p>If the Loan is foreclosed by the customer or the disbursement is reversed by the lender or amended by any means within a year of the date of disbursement, then the cashback payment will not be made or the customer will have to return the cashback amount to TheTrueLoans. Apart from the Lender, it is also mandatory for the customers to intimate us about any foreclosure of loan or reversal of disbursement or any amendment in the loan, for which they might have earned cashback unduly. Whether a loan disbursement/transaction shall qualify as a Qualifying Transaction for cashback shall be at the sole discretion of TheTrueLoans and the Customer understands and agrees to the same. Further, we shall not be responsible in the event if due to some technical or other error we cannot trace a disbursement of loan back to the Customer and does not qualify the transaction as a Qualifying Transaction for any reason whatsoever.</p>
                        <p>Further, in the event that the Lender feels that the loan disbursement is not genuine for any reason whatsoever and we do not receive any commission for the loan transaction, the Customer will not receive any Cashback. We do allow you to query this with us. If a lender still hasn’t paid a manual commission claim after a period of six months then we reserve the right to close the enquiry claim. We reserve the right to reclaim or make balance adjustments accordingly where it has been established that any credit has been applied in error. This will include but is not limited to transactions where the credit is not genuinely due or payment for any credited transaction has not been received from a Lender or its agencies and/or misuse or fraud. This can include transactions which have already been paid over to you by NEFT or any other method.</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cashback;


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