import { fetchDataFromDB } from '@/utils/helper';
import React from 'react';

const Disclaimer = () => {
    return (
        <>
            <div className="container mx-auto my-5 p-5">
                <h1 className="text-3xl font-bold text-center">Disclaimer</h1>
                <div className="my-5">
                    <div className="text-base space-y-4">
                        <p>
                            TheTrueLoans intends to provide clear information about different banking products and services. The information and data in the website are generic in nature. This information has been obtained from sources believed to be reliable. We have not verified it and make no guarantee, warranty or representation about it. Any projections, opinions, assumptions or estimates used are for example only. You and/or your advisors should conduct a careful, independent investigation of offers to determine to your satisfaction the suitability of any offer. We are not responsible for any sort of discrepancies.
                        </p>
                        <p>
                            There is no purpose of violating any copyright or intellectual copyrights issues. All information provided on the website www.thetrueloans.com; is subject to the discretion of the same and is likely to change without any notice. Though, any changes in public utility will be communicated immediately on the website. We recommend that you keep rechecking the Terms of Use and Privacy policy on a regular basis.
                        </p>
                        <p>
                            We have tried to maintain high standards of the material posted on the website www.thetrueloans.com; TheTrueLoans is not legally responsible for the same in any matter whatsoever. Employees, partners, and associated staff of TheTrueLoans are not accountable for any loss, harm, or damage due to usage of information from the website. Customers are advised to use their own discretion in such matters. It is a mutual understanding that customers&apos; association with the portal will be at the customers&apos; preference and risk.
                        </p>
                        <p>
                            Visitors to this Website and every third party is hereby informed that the owners of this Website, are the intermediaries/ DSAs of some of the banks, financial institutions, whose products are dealt with on this Website. It is made abundantly clear that TheTrueLoans, its parent/ associate companies, its partners/ directors, shareholders, officers and employees and thetrueloans.com are in no way responsible or liable for any one for his/her investment or credit buy decision(s) (availing any kind of loans or taking credit card through us), and every prospect/loan seeker/ investor/policy-holder shall be solely responsible for the consequences of his/her decision(s).
                        </p>
                        <p>
                            BEWARE OF FRAUDULENT PHONE CALLS AND E-MAILS. TheTrueLoans clarifies to public that TheTrueLoans offers its services to the users for free. TheTrueLoans or its officials will never ask customers/visitors to deposit any money/cash for any of our services. Public receiving such phone calls/emails are requested to intimate TheTrueLoans along with details at contactus@thetrueloans.com.
                        </p>
                        <p>
                            TheTrueLoans makes no warranties or representations, express or implied, on products offered through the website/ platform. The Company accepts no liability for any damages or losses, however caused, in connection with the use of, or on the reliance of its product or related services availed through the platform.
                        </p>
                        <p>
                            Credit is offered at the sole discretion of the banks/ financial institutions that you may choose through this website. TheTrueLoans shall not be responsible for denial of a loan against the applications made through TheTrueLoans. The users are advised to read the terms and conditions of the banks/ financial institutions carefully and take up issues, if any, related to the loans applied for/ approved/ disbursed directly with the respective bank/ financial institution.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Disclaimer;


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