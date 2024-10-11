import React, { useState, useEffect, useCallback, useContext } from 'react';
import Slider from 'react-slick';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import MyContext from "@/context/MyContext";
import { fetchDataFromDB } from '@/utils/helper';

const EmiCalculator = () => {
    const { openForm } = useContext(MyContext);

    const [amount, setAmount] = useState(100000);
    const [roi, setRoi] = useState(10);
    const [tenureY, setTenureY] = useState(10);
    const [tenureM, setTenureM] = useState(6);
    const [emi, setEmi] = useState(0);
    const [totalRepayment, setTotalRepayment] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);

    // Calculate EMI based on the given parameters
    const calculateEMI = useCallback((amount, roi, tenureY, tenureM) => {
        const term = tenureY * 12 + tenureM;
        if (amount <= 0 || roi <= 0 || term <= 0) {
            return { emi: 0, totalRepayment: 0, totalInterest: 0 };
        }
        const interest = roi / 1200;
        const top = Math.pow(1 + interest, term);
        const bottom = top - 1;
        const ratio = top / bottom;
        const emi = Math.trunc(amount * interest * ratio);
        const totalRepayment = Math.trunc(emi * term);
        return { emi, totalRepayment, totalInterest: totalRepayment - amount };
    }, []);

    // Update EMI calculation when values change
    useEffect(() => {
        const { emi, totalRepayment, totalInterest } = calculateEMI(amount, roi, tenureY, tenureM);
        setEmi(emi);
        setTotalRepayment(totalRepayment);
        setTotalInterest(totalInterest);
    }, [amount, roi, tenureY, tenureM, calculateEMI]);

    // Formatter for consistent number formatting in INR
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
        }).format(value);
    };

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
                    { name: 'Principal', y: amount, color: '#052f5f' },
                    { name: 'Interest', y: totalInterest, color: '#f0b765' },
                ],
            },
        ],
    };

    const slickSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <>
            <section className="bg-blue-100 p-6 md:p-8 rounded-lg shadow-lg">
                <div className="flex flex-col md:flex-row items-center justify-center">
                    <img
                        src="/images/icons/emi-calculator.svg"
                        alt="EMI Calculator Icon"
                        className="w-20 h-20 md:w-28 md:h-28 mr-0 md:mr-6 mb-4 md:mb-0"
                    />
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-bold text-gray-800">EMI Calculator</h1>
                        <p className="text-lg text-gray-600">How much will I pay every month?</p>
                    </div>
                </div>
            </section>

            <div className="container mx-auto mt-5 p-5">
                <p className="text-white text-center">
                    The TrueLoans EMI Calculator helps you determine your Equated Monthly Installment (EMI) instantly.
                </p>
                <div className="container mx-auto my-5 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Section: Input Fields */}
                        <div className="bg-slate-500 shadow-lg p-6 rounded-lg border">
                            <h2 className="text-2xl font-bold mb-4">Calculate Your EMI</h2>
                            <div className="mb-5">
                                {/* Loan Amount Input */}
                                <label className="text-lg font-semibold">Loan Amount:</label>
                                <input
                                    type="number"
                                    min={0}
                                    max={50000000}
                                    className="w-full p-3 border rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={amount}
                                    onChange={(e) => setAmount(Math.max(0, Math.min(50000000, Number(e.target.value))))}
                                    placeholder="Loan Amount"
                                />
                            </div>
                            {/* Rate of Interest */}
                            <div className="mb-5">
                                <label className="text-lg font-semibold">Rate of Interest:</label>
                                <input
                                    type="number"
                                    min={0}
                                    max={20}
                                    className="w-full p-3 border border-gray-300 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={roi}
                                    onChange={(e) => setRoi(Math.max(0, Math.min(20, Number(e.target.value))))}
                                    placeholder="Rate of Interest"
                                />
                            </div>
                            {/* Tenure */}
                            <div>
                                <label className="text-lg font-semibold">Loan Tenure:</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="number"
                                        min={0}
                                        max={30}
                                        className="w-full p-3 border border-gray-300 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={tenureY}
                                        onChange={(e) => setTenureY(Math.max(0, Math.min(30, Number(e.target.value))))}
                                        placeholder="Years"
                                    />
                                    <input
                                        type="number"
                                        min={0}
                                        max={11}
                                        className="w-full p-3 border border-gray-300 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={tenureM}
                                        onChange={(e) => setTenureM(Math.max(0, Math.min(11, Number(e.target.value))))}
                                        placeholder="Months"
                                    />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mt-5 text-blue-600">
                                Your EMI: {formatCurrency(emi)}
                            </h3>
                        </div>

                        {/* Right Section: Charts */}
                        <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-200">
                            <h2 className="text-2xl font-bold mb-4">Loan Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <h3 className="text-lg font-semibold">Total Interest</h3>
                                    <p className="text-xl font-bold text-blue-600">
                                        {formatCurrency(totalInterest)}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">Principal</h3>
                                    <p className="text-xl font-bold text-blue-600">
                                        {formatCurrency(amount)}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">Total Amount</h3>
                                    <p className="text-xl font-bold text-blue-600">
                                        {formatCurrency(totalRepayment)}
                                    </p>
                                </div>
                            </div>

                            {/* Highcharts Pie Chart */}
                            <div className="mt-4">
                                <HighchartsReact highcharts={Highcharts} options={options} />
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-5">
                        <button onClick={openForm} className="bg-yellow-500 text-white py-2 px-4 rounded-md">Apply Now</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmiCalculator;


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