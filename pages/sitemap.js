import { fetchDataFromDB } from '@/utils/helper';
import React from 'react'

function Sitemap() {
    return (
        <>
            <div className="container contact my-5">
                <h1 className="heading">Sitemap</h1>
                <p className="text-center">Sitemap</p>
                <div className="row my-5">
                </div>
            </div>
        </>
    )
}
export default Sitemap;



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