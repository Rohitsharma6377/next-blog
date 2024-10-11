import React, { Component } from 'react'
// import Services from '../parts/Services'
// import BlogCarousel from '../blog/BlogCarousel'
import Link from 'next/link'
import { fetchDataFromDB } from '@/utils/helper'

export class ThankYou extends Component {
    constructor(props) {
        super(props)
        this.state = {
            blogs:         this.props.blogs
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        this.callApi()
    }

    callApi = async () => {
        const response = await fetch('/suggest'); 
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message)
        this.setState({
            blogs: body.blogs
        })
    }
    render() {
        return (
            <>
            <div className="container thankYou my-5">
                <h1 className="heading">Thank You for connecting with us</h1>
                <p className="text-center">We will reach back to you in a while. Till then, please check our services.</p>
                <div className="row my-5">
                    <div className="col-sm-12 services">
                        {/* <Services/> */}
                    </div>
                </div>
                <div className="container pt-5">
                    <div className="row emiEli">
                        <div className="col-sm-6 text-center">
                            <h2>EMI Calculator</h2>
                            <p className="text-center">How much will I pay every month?</p>
                            <Link href="/emi-calculator" className="amitBtn">EMI Calculator</Link>
                        </div>
                        <div className="col-sm-6 text-center">
                            <h2>Eligibility Calculator</h2>
                            <p className="text-center">What loan amount can I borrow?</p>
                            <Link href="/eligibility-calculator" className="amitBtn">Eligibility Calculator</Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* <BlogCarousel blogs={this.state.blogs}/> */}
        </>
        )
    }
}

export default ThankYou;



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