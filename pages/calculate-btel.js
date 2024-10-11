// pages/calculate-btel.js
import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import BlogCarousel from '../blog/BlogCarousel';
import { fetchDataFromDB } from '@/utils/helper';

class CalculateBtel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            work: '',
            amount: 100000,
            roi: 10,
            tenureY: 10,
            tenureM: 6,
            tenure: 10.5,
            emi: 0,
            totalRepayment: 0,
            totalInterest: 0,
            newRoi: 9,
            newEmi: 0,
            newTotalRepayment: 0,
            newTotalInterest: 0,
            monthlySaving: 0,
            annualSaving: 0,
            saving: 'EMI',
            showData: false,
            emiSaving: 0,
            blogs: []
        };
    }

    componentDidMount() {
        this.calculateEMI();
        this.callApi();
    }

    callApi = async () => {
        const response = await fetch('/suggest');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        this.setState({
            blogs: body.blogs
        });
    };

    onChange = (e) => { this.setState({ [e.target.name]: e.target.value }); }

    changeTenureY = (e) => {
        let { value, min, max } = e.target;
        value = Math.max(Number(min), Math.min(Number(max), Number(value)));
        this.setState({ tenureY: value }, () => this.calculateEMI());
    };

    changeTenureM = (e) => {
        let { value, min, max } = e.target;
        value = Math.max(Number(min), Math.min(Number(max), Number(value)));
        this.setState({ tenureM: value }, () => this.calculateEMI());
    };

    changeRoi = (e) => {
        let { value, min, max } = e.target;
        value = Math.max(Number(min), Math.min(Number(max), Number(value)));
        this.setState({ roi: value }, () => this.calculateEMI());
    }

    changeAmount = (e) => {
        let { value, min, max } = e.target;
        value = Math.max(Number(min), Math.min(Number(max), Number(value)));
        this.setState({ amount: value }, () => this.calculateEMI());
    }

    changeNewRoi = (e) => {
        let { value, min, max } = e.target;
        value = Math.max(Number(min), Math.min(Number(max), Number(value)));
        this.setState({ newRoi: value }, () => this.calculateEMI());
    }

    price_in_words = (price) => {
        // [your existing code for price_in_words]
    }

    calculateEMI = () => {
        // [your existing code for calculateEMI]
    }

    render() {
        const options1 = {
            chart: { type: 'column', backgroundColor: 'transparent' },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true,
                        align: 'center',
                        color: '#000',
                        style: { textOutline: false }
                    },
                    pointPadding: 0.1,
                    groupPadding: 0
                }
            },
            credits: { enabled: false },
            title: false,
            subtitle: false,
            legend: { align: 'right', verticalAlign: 'middle', layout: 'vertical' },
            xAxis: {
                categories: ['Monthly EMI'],
                labels: { x: -10 },
                gridLineWidth: 0,
                minorGridLineWidth: 0
            },
            yAxis: { allowDecimals: false, title: { text: 'Savings in Rs' }, gridLineWidth: 0, minorGridLineWidth: 0 },
            series: [{
                name: 'Existing Loan',
                color: '#f0b765',
                data: [{ y: this.state.emi, color: '#f0b765' }]
            }, {
                name: 'New Loan',
                color: '#052f5f',
                data: [{ y: this.state.newEmi, color: '#052f5f' }]
            }],
            responsive: {
                rules: [{
                    condition: { maxWidth: 500 },
                    chartOptions: {
                        legend: { align: 'center', verticalAlign: 'bottom', layout: 'horizontal' },
                        yAxis: { labels: { align: 'left', x: 0, y: -5 }, title: { text: null } },
                        subtitle: { text: null },
                        credits: { enabled: false }
                    }
                }]
            }
        };

        const options2 = {
            // Similar to options1, just with different data
        };

        return (
            <>
                <div className="container my-5">
                    <h2 className="heading">Calculate Savings after Balance Transfer of Existing Loan</h2>
                    <div className="row">
                        {/* Existing Loan Details */}
                        {/* New Loan Details */}
                    </div>
                    {this.state.showData ?
                        <div className="row newROI my-5">
                            <div className="col-sm-12 btelResult">
                                <h3 className="mb-3">Savings after Balance Transfer of Loan</h3>
                                {this.state.saving === 'EMI' ?
                                    <>
                                        {/* Monthly and Total Savings Display */}
                                    </>
                                    : this.state.saving === 'Tenure' ?
                                        <p className="text-center"><strong>Your tenure will be reduced by {Math.ceil(this.state.emiSaving * this.state.tenure)} EMIs</strong></p>
                                        : null}
                            </div>
                        </div>
                        : null}
                </div>
                <section className="pageEligibility">
                    {/* Eligibility Check Section */}
                </section>
                <BlogCarousel blogs={this.state.blogs} />
            </>
        );
    }
}

export default CalculateBtel;




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
