import React, { Component } from 'react';
import Slider from "react-slick"; // Import react-slick slider
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import "slick-carousel/slick/slick.css"; // Import slick carousel css
import "slick-carousel/slick/slick-theme.css"; // Import slick carousel theme
import LeadForm from '@/components/LeadForm';

export class EmiCalculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            work: '',
            amount: 100000,
            roi: 10,
            tenureY: 10,
            tenureM: 6,
            emi: 0,
            totalRepayment: 0,
            totalInterest: 0,
        };
    }

    componentDidMount() {
        this.calculateEMI();
    }

    calculateEMI = () => {
        const { amount, roi, tenureY, tenureM } = this.state;
        const term = tenureY * 12 + tenureM;
        if (amount <= 0 || roi <= 0 || term <= 0) {
            this.setState({
                emi: 0,
                totalRepayment: 0,
                totalInterest: 0,
            });
            return;
        }
        const interest = roi / 1200;
        const top = Math.pow(1 + interest, term);
        const bottom = top - 1;
        const ratio = top / bottom;
        const emi = Math.trunc(amount * interest * ratio);
        const totalRepayment = Math.trunc(emi * term);
        this.setState({
            emi,
            totalRepayment,
            totalInterest: totalRepayment - amount,
        });
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value }, this.calculateEMI);
    };

    changeTenureY = (e) => {
        const value = Math.max(0, Math.min(30, e.target.value));
        this.setState(
            { tenureY: value, tenure: value + this.state.tenureM / 12 },
            this.calculateEMI
        );
    };

    changeTenureM = (e) => {
        const value = Math.max(0, Math.min(11, e.target.value));
        this.setState(
            { tenureM: value, tenure: this.state.tenureY + value / 12 },
            this.calculateEMI
        );
    };

    changeRoi = (e) => {
        const value = Math.max(0, Math.min(20, e.target.value));
        this.setState({ roi: value }, this.calculateEMI);
    };

    changeAmount = (e) => {
        const value = Math.max(0, Math.min(50000000, e.target.value));
        this.setState({ amount: value }, this.calculateEMI);
    };

    render() {
        const options = {
            chart: {
                type: 'pie',
                backgroundColor: 'transparent',
            },
            credits: { enabled: false },
            series: [
                {
                    name: 'Share',
                    data: [
                        { name: 'Principal', y: this.state.amount, color: '#052f5f' },
                        { name: 'Interest', y: this.state.totalInterest, color: '#f0b765' },
                    ],
                },
            ],
        };

        const slickSettings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            fade: true,
            arrows: true,
        };

        return (
            <>
                <section className="pageBanner">
                    <img src="images/icons/emi-calculator.svg" alt="" />
                    <div>
                        <h1>EMI Calculator</h1>
                        <p>How much will I pay every month?</p>
                    </div>
                </section>
                <div className="container mt-5">
                    <p>TheTrueLoans EMI Calculator helps you determine your Equated Monthly Installment (EMI) instantly.</p>
                    <div className="row my-5 flex-h">
                        <div className="col-sm-7">
                            <div className="calculatorFields mb-5">
                                {/* Loan Amount Input */}
                                <div className="range-slider">
                                    <label className="bigLabel">Loan Amount:</label>
                                    <input
                                        type="number"
                                        min={0}
                                        max={50000000}
                                        className="form-control"
                                        name="amount"
                                        value={this.state.amount}
                                        onChange={this.changeAmount}
                                        placeholder="Loan Amount"
                                    />
                                    <Slider {...slickSettings}>
                                        <div>{/* Loan amount slider content */}</div>
                                    </Slider>
                                </div>
                                {/* Rate of Interest Input */}
                                <div className="range-slider my-5">
                                    <label className="bigLabel">Rate of Interest:</label>
                                    <input
                                        type="number"
                                        min={0}
                                        max={20}
                                        className="form-control"
                                        name="roi"
                                        value={this.state.roi}
                                        onChange={this.changeRoi}
                                        placeholder="Rate of Interest"
                                    />
                                    <Slider {...slickSettings}>
                                        <div>{/* Rate of Interest slider content */}</div>
                                    </Slider>
                                </div>
                                {/* Loan Tenure Input */}
                                <div className="range-slider">
                                    <label className="bigLabel">Loan Tenure:</label>
                                    <div className="tenureInputs">
                                        <input
                                            type="number"
                                            min={0}
                                            max={30}
                                            name="tenureY"
                                            value={this.state.tenureY}
                                            onChange={this.changeTenureY}
                                            placeholder="Years"
                                        />
                                        <input
                                            type="number"
                                            min={0}
                                            max={11}
                                            name="tenureM"
                                            value={this.state.tenureM}
                                            onChange={this.changeTenureM}
                                            placeholder="Months"
                                        />
                                    </div>
                                    <Slider {...slickSettings}>
                                        <div>{/* Tenure slider content */}</div>
                                    </Slider>
                                </div>
                                <h3>Your EMI: ₹{this.state.emi.toLocaleString()}</h3>
                            </div>
                        </div>
                        <div className="col-sm-5">
                            <div className="emiResult">
                                <h2>Loan Details</h2>
                                <div>
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <h3>Total Interest</h3>
                                            <p>₹{this.state.totalInterest.toLocaleString()}</p>
                                        </div>
                                        <div className="col-sm-4">
                                            <h3>Principal</h3>
                                            <p>₹{this.state.amount.toLocaleString()}</p>
                                        </div>
                                        <div className="col-sm-4">
                                            <h3>Total Amount</h3>
                                            <p>₹{this.state.totalRepayment.toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <HighchartsReact highcharts={Highcharts} options={options} />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 my-div mt-5">
                            <button className="amitBtnGolden" data-toggle="modal" data-target="#applyNow">
                                Apply Now
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default EmiCalculator;
