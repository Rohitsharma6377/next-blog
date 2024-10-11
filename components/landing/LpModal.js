// components/LpModal.js
import React from 'react';
import Form from '../Form';

function LpModal() {
  return (
    <div className="container mx-auto my-5 px-4">
      <div className="flex justify-center mb-5">
        <img src="/images/logo.svg" alt="Logo" className="logo" />
      </div>
      <h1 className="text-3xl font-bold text-center mb-5">Connect with us</h1>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/3 mb-5 md:mb-0 order-2 md:order-1">
          <h2 className="text-xl mb-4">Please fill in the form to get a callback</h2>
          <img src="/images/icons/hand.svg" alt="Hand" className="hidden md:block" />
        </div>
        <div className="md:w-1/3 order-1 md:order-2">
          <Form />
        </div>
      </div>
    </div>
  );
}

export default LpModal;
