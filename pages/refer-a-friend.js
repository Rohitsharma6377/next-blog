import React from 'react'
import RefrenceForm from '../components/RefrenceForm'
import { fetchDataFromDB } from '@/utils/helper';

function ReferFriend() {
    return (
        <>
            <div className="container contact my-5">
                <h1 className="heading">Refer a Peer, Friend or a Relative</h1>
                <p className="text-center">Help them to Save on their EMI &amp; earn attractive Referral Bonus for Yourself</p>
                <div className="row">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-8">
                        <RefrenceForm/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReferFriend;



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