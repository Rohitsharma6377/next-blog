// components/RefrenceForm.js
import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

const RefrenceForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        refName: '',
        refPhone: '',
        refCity: '',
        requirement: '',
        how: '',
        showHowText: false,
    });

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const phoneValidate = (e) => {
        if (e.target.value.length < 11) {
            setFormData({ ...formData, phone: e.target.value });
        }
    };

    const refPhoneValidate = (e) => {
        if (e.target.value.length < 11) {
            setFormData({ ...formData, refPhone: e.target.value });
        }
    };

    const changeName = (e) => {
        setFormData({ ...formData, name: e.target.value.replace(/[^A-Za-z]/gi, '') });
    };

    const changeRefName = (e) => {
        setFormData({ ...formData, refName: e.target.value.replace(/[^A-Za-z]/gi, '') });
    };

    const submitAddHandler = async (e) => {
        e.preventDefault();
        const data = {
            ...formData,
        };

        try {
            const res = await axios.post('/referForm', data);
            if (res.data.success) {
                localStorage.setItem('message', 'Form submitted successfully');
                window.location.href = '/thank-you';
            }
        } catch (err) {
            console.error('Error:', err);
        }
    };

    const changeReq = (e) => {
        if (e.target.value !== 'blank') {
            setFormData({ ...formData, requirement: e.target.value });
        }
    };

    const changeHow = (e) => {
        if (e.target.value === 'showTextBox') {
            setFormData({ ...formData, showHowText: true, how: '' });
        } else if (e.target.value !== 'blank') {
            setFormData({ ...formData, how: e.target.value, showHowText: false });
        } else {
            setFormData({ ...formData, how: '' });
        }
    };

    return (
        <form onSubmit={submitAddHandler} className="bg-white p-6 rounded-lg shadow-md">
            <label className="block text-sm font-medium mb-1">Your Name *</label>
            <input
                className="form-control w-full p-2 border border-gray-300 rounded mb-4"
                type="text"
                name="name"
                required
                placeholder="Your Name Please *"
                value={formData.name}
                onChange={changeName}
            />
            <label className="block text-sm font-medium mb-1">Your Email *</label>
            <input
                className="form-control w-full p-2 border border-gray-300 rounded mb-4"
                type="email"
                name="email"
                required
                placeholder="Your Email Please *"
                value={formData.email}
                onChange={onChange}
            />
            <label className="block text-sm font-medium mb-1">Your Mobile Number *</label>
            <input
                className="form-control w-full p-2 border border-gray-300 rounded mb-4"
                type="number"
                onKeyDown={(e) => e.key === 'e' && e.preventDefault()}
                min="0"
                name="phone"
                required
                placeholder="Mobile Number Please *"
                value={formData.phone}
                onChange={phoneValidate}
            />
            <label className="block text-sm font-medium mb-1">Name of person being referred *</label>
            <input
                className="form-control w-full p-2 border border-gray-300 rounded mb-4"
                type="text"
                name="refName"
                required
                placeholder="Name of person being referred *"
                value={formData.refName}
                onChange={changeRefName}
            />
            <label className="block text-sm font-medium mb-1">Mobile Number of person being referred *</label>
            <input
                className="form-control w-full p-2 border border-gray-300 rounded mb-4"
                type="number"
                onKeyDown={(e) => e.key === 'e' && e.preventDefault()}
                min="0"
                name="refPhone"
                required
                placeholder="Mobile Number of person being referred *"
                value={formData.refPhone}
                onChange={refPhoneValidate}
            />
            <label className="block text-sm font-medium mb-1">City of person being referred *</label>
            <input
                className="form-control w-full p-2 border border-gray-300 rounded mb-4"
                type="text"
                name="refCity"
                required
                placeholder="City of person being referred *"
                value={formData.refCity}
                onChange={onChange}
            />
            <label className="block text-sm font-medium mb-1">Type of loan *</label>
            <select
                className="form-control w-full p-2 border border-gray-300 rounded mb-4"
                required
                onChange={changeReq}
                name="requirement"
                value={formData.requirement}
            >
                <option value="blank">Type of Loan?</option>
                <option value="Balance transfer of existing loan">Balance Transfer of Existing Loan</option>
                <option value="Home construction loan">Home Construction Loan</option>
                <option value="New home loan">New Home Loan</option>
                <option value="Home improvement loan">Home Improvement Loan</option>
                <option value="Loan against property">Loan Against Property</option>
                <option value="Plot loan">Plot Loan</option>
            </select>
            <label className="block text-sm font-medium mb-1">How did you come to know of us? *</label>
            <select
                className="form-control w-full p-2 border border-gray-300 rounded mb-4"
                required
                onChange={changeHow}
                name="how"
                value={formData.how}
            >
                <option value="blank">How did you come to know of us?</option>
                <option value="Internet">Internet</option>
                <option value="Friends/Family">Friends/Family</option>
                <option value="Colleagues">Colleagues</option>
                <option value="Emailer">Emailer</option>
                <option value="SMS">SMS</option>
                <option value="Phone call">Phone call</option>
                <option value="Facebook">Facebook</option>
                <option value="Linkedin">Linkedin</option>
                <option value="Whatsapp">Whatsapp</option>
                <option value="showTextBox">Any other</option>
            </select>
            {formData.showHowText && (
                <input
                    className="form-control w-full p-2 border border-gray-300 rounded mb-4"
                    type="text"
                    placeholder="Please specify"
                    value={formData.how}
                    onChange={(e) => onChange(e)}
                    name="how"
                />
            )}
            <div className="mt-4">
                <button className="amitBtn w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">Submit</button>
            </div>
        </form>
    );
};

export default RefrenceForm;
