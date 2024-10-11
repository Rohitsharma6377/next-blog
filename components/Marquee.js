// components/Marquee.js
import React, { useEffect, useState } from 'react';

function Marquee() {
    const width = window.innerWidth;

    const Maquree = () => {
        const [pos, setPos] = useState(0);
        const [run, setRun] = useState(true);

        const scrollEff = () => {
            if (run) setPos((p) => (p < width ? p + 1 : -width));
        };

        useEffect(() => {
            const tm = setTimeout(scrollEff, 10);
            return () => clearTimeout(tm);
        }, [pos]);

        const onMouseLeave = () => {
            setRun(false);
        };

        const onMouseEnter = () => {
            setRun(true);
            setPos(pos + 1); // to trigger useEffect
        };

        return (
            <div
                className="overflow-hidden whitespace-nowrap bg-yellow-200 py-2"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <p className="inline-block" style={{ left: pos + 'px', transition: 'left 0.1s linear' }}>
                    <span className="mx-8">
                        Avail CASH BACK up to <span className="font-bold">&#8377;15000/-</span>{' '}
                        <span className="text-gray-700">(T&amp;C Apply)</span>
                    </span>
                    <span className="mx-8">Our Door Step services ensure your Convenience</span>
                    <span className="mx-8">End-to-end facilitation – Enquiry to Loan Disbursal</span>
                    <span className="mx-8">
                        TheTrueLoans offers <span className="text-yellow-600 font-bold">FREE</span> services to its customers
                    </span>
                </p>
            </div>
        );
    };

    return <Maquree />;
}

export default Marquee;
