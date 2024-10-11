// components/OptOut.js
import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

class OptOut extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            state: '',
            city: '',
            pin: '',
            remarks: ''
        };
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    callSwal = (mesg) => {
        swal({ title: mesg, timer: 4000 });
    };

    submitHandler = (e) => {
        e.preventDefault();
        const data = {
            name: this.state.firstName,
            email: this.state.email,
            address: JSON.stringify([this.state.state, this.state.city, this.state.pin]),
            remarks: this.state.remarks,
            user: JSON.stringify([this.state.firstName, this.state.lastName, this.state.email, this.state.phone])
        };

        axios.post('/api/optOutForm', data)
            .then(res => {
                if (res.data.success) {
                    this.callSwal(res.data.message);
                    // Redirect to thank you page
                    window.location.href = '/thank-you';
                }
            })
            .catch(err => console.log('Error:', err));
    };

    resetData = () => {
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            state: '',
            city: '',
            pin: '',
            remarks: ''
        });
    };

    render() {
        return (
            <form onSubmit={this.submitHandler} className="max-w-xl mx-auto p-4 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Opt-Out Form</h2>
                <div className="grid grid-cols-1 gap-4">
                    <input type="text" placeholder="First Name" className="form-control border rounded p-2" required onChange={this.onChange} name="firstName" value={this.state.firstName} />
                    <input type="text" placeholder="Last Name" className="form-control border rounded p-2" required onChange={this.onChange} name="lastName" value={this.state.lastName} />
                    <input type="email" placeholder="Your Email" className="form-control border rounded p-2" required onChange={this.onChange} name="email" value={this.state.email} />
                    <input type="text" placeholder="State" className="form-control border rounded p-2" required onChange={this.onChange} name="state" value={this.state.state} />
                    <input type="text" placeholder="City" className="form-control border rounded p-2" required onChange={this.onChange} name="city" value={this.state.city} />
                    <input type="text" placeholder="PIN" className="form-control border rounded p-2" required onChange={this.onChange} name="pin" value={this.state.pin} />
                    <textarea placeholder="Remarks" className="form-control border rounded p-2" onChange={this.onChange} name="remarks" value={this.state.remarks}></textarea>
                    <button type="submit" className="amitBtn mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                        Submit
                    </button>
                </div>
            </form>
        );
    }
}

export default OptOut;
