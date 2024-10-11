import React, { Component } from 'react'
import axios from 'axios'
// import window from 'global'
import swal from 'sweetalert'

export class RefrenceForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name:               '',               
            email:              '',
            phone:              '',
            refName:            '',
            refPhone:           '',
            refCity:            '',
            requirement:        '',
            how:                '',
            showHowText :       false,
        }
    }

    onChange= (e) => { this.setState({ [e.target.name]: e.target.value }) }
    callSwal=(mesg)=>{ swal({ title: mesg, timer: 4000 }) }
    phoneValidate =(e)=>{ if(e.target.value.length<11){ this.setState({ phone:  e.target.value }) } }
    refPhoneValidate =(e)=>{ if(e.target.value.length<11){ this.setState({ refPhone:  e.target.value }) } }
    changeName=(e)=>{ this.setState({ name: e.target.value.replace(/[^A-Za-z]/gi, "") }) }
    changeRefName=(e)=>{ this.setState({ refName: e.target.value.replace(/[^A-Za-z]/gi, "") }) }
    howText=(e)=>{ this.setState({ how : e.target.value }) }

    submitAddHandler = async(e) =>{
        e.preventDefault()
            const data={
                name:               this.state.name, 
                email:              this.state.email,
                phone:              this.state.phone,
                refName:            this.state.refName,
                refPhone:           this.state.refPhone,
                refCity:            this.state.refCity,
                requirement:        this.state.requirement,
                how:                this.state.how
            }               
            axios.post('/referForm', data)
            .then( res=> {
                if(res.data.success){
                    localStorage.setItem('message', 'Form submitted succesfully')
                    // window.location.href = '/thank-you'
                }
            })
            .catch(err=>console.log('err', err))
    }

    changeReq=(e)=>{ if(e.target.value !== 'blank'){ this.setState({ requirement: e.target.value }) } }

    changeHow=(e)=>{
        if(e.target.value == 'showTextBox'){
            this.setState({
                showHowText :       true,
                how:                ''
            })
        }else
        if(e.target.value !== 'blank'){
            this.setState({
                how :               e.target.value, 
                showHowText :       false
            })            
        }else{
            this.setState({ how: '' })
        }
    }

    render() {
        return (
            <>
                <form encType="multipart/form-data" onSubmit={this.submitAddHandler} className="contactForm">
                    <label>Your Name *</label>
                    <input className="form-control" type="text" name="name" required placeholder="Your Name Please *" value={this.state.name} onChange={this.changeName}/>
                    <label>Your Email *</label>
                    <input className="form-control" type="email" name="email" required placeholder="Your Email Please *" value={this.state.email} onChange={this.onChange}/> 
                    <label>Your Mobile Number *</label>
                    <input className="form-control" type="number" onKeyDown={ (e) => e.key === 'e' && e.preventDefault() } min="0"  name="phone" required placeholder="Mobile Number Please *" value={this.state.phone} onChange={this.phoneValidate}/>
                    <label>Name of person being referred *</label>
                    <input className="form-control" type="text" name="name" required placeholder="Name of person being referred *" value={this.state.refName} onChange={this.changeRefName}/>
                    <label>Mobile Number of person being referred *</label>
                    <input className="form-control" type="number" onKeyDown={ (e) => e.key === 'e' && e.preventDefault() } min="0"  name="refPhone" required placeholder="Mobile Number of person being referred *" value={this.state.refPhone} onChange={this.refPhoneValidate}/>
                    <label>City of person being referred *</label>
                    <input className="form-control" type="text" name="refCity" required placeholder="City of person being referred *" value={this.state.refCity} onChange={this.onChange}/>                    
                    <label>Type of loan *</label>
                    <select className="form-control" required onChange={this.changeReq} name="requirement" value={this.state.requirement}>
                        <option value="blank">Type of Loan?</option>
                        <option value="Balance transfer of existing loan">Balance Transfer of Existing Loan</option>
                        <option value="Home construction loan">Home Construction Loan</option>
                        <option value="New home loan">New Home Loan</option>
                        <option value="Home improvement loan">Home Improvement Loan</option>
                        <option value="Loan against property">Loan Against Property</option>
                        <option value="Plot loan">Plot Loan</option>
                    </select>
                    <label>How did you come to know of us? *</label>
                    <select className="form-control" required onChange={this.changeHow} name="how" value={this.state.how}>
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
                    <div className="my-div"><button className="amitBtn">Submit</button></div>                    
                </form>
            </>
        )
    }
}
export default RefrenceForm