// components/LpRefer.js
import React from 'react';
import RefrenceForm from '../RefrenceForm';

function LpRefer() {
    return (
        <div className="container mx-auto my-5 px-4">
            <div className="flex justify-center mb-5">
                <img src="/images/logo.svg" alt="Logo" className="logo" />
            </div>
            <h1 className="text-3xl font-bold text-center mb-2">Refer a Peer, Friend or a Relative</h1>
            <p className="text-center mb-5">
                Help them to Save on their EMI &amp; earn attractive Referral Bonus for Yourself
            </p>
            <div className="flex justify-center">
                <div className="w-full max-w-lg">
                    <RefrenceForm />
                </div>
            </div>
        </div>
    );
}

export default LpRefer;
