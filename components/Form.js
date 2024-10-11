// components/Form.js
import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
            message: '',
            city: '',
            how: '',
            showHowText: false,
        };
    }

    onChange = (e) => { 
        this.setState({ [e.target.name]: e.target.value }); 
    }

    callSwal = (mesg) => { 
        swal({ title: mesg, timer: 4000 }); 
    }

    phoneValidate = (e) => { 
        if (e.target.value.length < 11) {
            this.setState({ phone: e.target.value }); 
        }
    }

    changeName = (e) => { 
        this.setState({ name: e.target.value.replace(/[^A-Za-z]/gi, "") }); 
    }

    howText = (e) => { 
        this.setState({ how: e.target.value }); 
    }

    submitAddHandler = async (e) => {
        e.preventDefault();
        const data = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            message: this.state.message,
            city: this.state.city,
            how: this.state.how,
        };

        try {
            const res = await axios.post('/api/contactForm', data); // Update the API endpoint as necessary
            if (res.data.success) {
                localStorage.setItem('message', 'Form submitted successfully');
                window.location.href = '/thank-you';
            }
        } catch (error) {
            console.error('Error submitting form', error);
        }
    }

    changeHow = (e) => {
        if (e.target.value === 'showTextBox') {
            this.setState({
                showHowText: true,
                how: '',
            });
        } else if (e.target.value !== 'blank') {
            this.setState({
                how: e.target.value,
                showHowText: false,
            });
        } else {
            this.setState({ how: '' });
        }
    }

    render() {
        return (
            <form onSubmit={this.submitAddHandler} className="contactForm bg-white p-6 rounded shadow-md">
                <label className="block mb-2">Name *</label>
                <input 
                    className="form-control border border-gray-300 rounded p-2 mb-4 w-full" 
                    type="text" 
                    name="name" 
                    required 
                    placeholder="Name Please *" 
                    value={this.state.name} 
                    onChange={this.changeName} 
                />
                
                <label className="block mb-2">Email *</label>
                <input 
                    className="form-control border border-gray-300 rounded p-2 mb-4 w-full" 
                    type="email" 
                    name="email" 
                    required 
                    placeholder="Email Please *" 
                    value={this.state.email} 
                    onChange={this.onChange} 
                /> 

                <label className="block mb-2">Mobile Number *</label>
                <input 
                    className="form-control border border-gray-300 rounded p-2 mb-4 w-full" 
                    type="number" 
                    onKeyDown={(e) => e.key === 'e' && e.preventDefault()} 
                    min="0"  
                    name="phone" 
                    required 
                    placeholder="Mobile Number Please *" 
                    value={this.state.phone} 
                    onChange={this.phoneValidate} 
                />

                <label className="block mb-2">City *</label>
                <input 
                    className="form-control border border-gray-300 rounded p-2 mb-4 w-full" 
                    type="text" 
                    name="city" 
                    required 
                    placeholder="City Please *" 
                    value={this.state.city} 
                    onChange={this.onChange} 
                /> 

                <label className="block mb-2">How did you come to know of us? *</label>
                <select 
                    className="form-control border border-gray-300 rounded p-2 mb-4 w-full" 
                    required 
                    onChange={this.changeHow} 
                    name="how" 
                    value={this.state.how}
                >
                    <option value="blank">How did you come to know of us? *</option>
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

                {this.state.showHowText && (
                    <input 
                        type="text" 
                        placeholder="Any other (Please Specify) *" 
                        className="form-control border border-gray-300 rounded p-2 mb-4 w-full" 
                        required 
                        onChange={this.howText} 
                        name="how" 
                        value={this.state.how} 
                    />
                )}
                
                <label className="block mb-2">Message *</label>
                <textarea 
                    name="message" 
                    className="form-control border border-gray-300 rounded p-2 mb-4 w-full" 
                    required 
                    placeholder="Please tell us a little about your requirement" 
                    value={this.state.message} 
                    onChange={this.onChange}
                ></textarea>
                
                <div className="my-div">
                    <button className="amitBtn bg-blue-600 text-white rounded p-2 hover:bg-blue-700 transition w-full">Submit</button>
                </div>                    
            </form>
        );
    }
}

export default Form;
