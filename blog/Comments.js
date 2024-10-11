import React, { Component } from 'react'
// import { Modal } from 'reactstrap'
// import CKEditor from 'ckeditor4-react'
import axios from 'axios'
import swal from 'sweetalert'
// import moment from "moment"

const block = [
    'sex',
    'girl',
    'porn',
    'nude',
    'horny',
    'bitch',
    'Viagra',
    'Gambling',
    'Cryptocurrencies',
    'Cryptocurrency',
    '$',
    'Bitcoin',
    'USD',
    'www',
    'htttp'
]
export class Comments extends Component {
    constructor(props) {
        super(props)
            this.state = {
                user:                  [],
                name:                  '',
                email:                 '',
                comment:               '',
                error:                 '',
                order:                 0,
                status:                0,
                commentId:             0,
                addmodalIsOpen:        false,
                message:               '',
                errorReason:           ''
            }
            this.handleChange1 = this.handleChange1.bind( this )
            this.onEditorChange1 = this.onEditorChange1.bind( this )
    }
        
    onChange= (e) => { this.setState({ [e.target.name]: e.target.value },()=>this.checkForHTML()) }
    onEditorChange1( evt1 ) { this.setState( { comment: evt1.editor.getData() },()=>this.checkForHTML() ) }
    handleChange1( changeEvent1 ) { this.setState( { comment: changeEvent1.target.value } ) }
    callSwal=(mesg)=>{ swal({ title: mesg, timer: 4000 }) }
    componentDidMount(){
        if(typeof(Storage) !== "undefined"){ this.setState({ user: JSON.parse(localStorage.getItem('user')) || [] }) }
    }

    checkForHTML=()=>{
        block.map((i)=>{
            if(this.state.name.includes(i) || this.state.comment.includes(i)){
                this.setState({ 
                    error:          "Error in inputs being provided",
                    errorReason:    i
                })
            }
        })
    }

    addAdminModalOn = (i)=>{
        this.setState({ 
            addmodalIsOpen:         true,
            commentId:              i.id,
            name:                   'Team TrueLoans',
            email:                  'connect@trueloans.com',
            order:                  1,
            status:                 1
    })}

    addUserModalOn = (i)=>{ 
        this.setState({ 
            addmodalIsOpen:         true,
            commentId:              i.id,
            order:                  1,
            status:                 0
    })}
    
    resetData = ()=>{
        this.setState({
            name:               '',
            email:              '',
            comment:            '',
            commentId:          0,
            order:              0,
            status:             0,
            addmodalIsOpen:     false,
            error:              '',
            errorReason:        ''
        })
    }

    submitComment = (e) => {
        e.preventDefault()
        const data={
            id:                 this.props.blogId,
            order:              this.state.order,
            status:             this.state.status,
            commentId:          this.state.commentId,
            name:               this.state.name,
            email:              this.state.email,
            comment:            this.state.comment
        }             
        axios.post('/admin/addComment', data)
            .catch(err=>console.log('err', err))
            .then(res=>{ 
                this.callSwal(res.data.message)
            })
        this.resetData()
    }
    render() {
        return (
            <>
                <div className="comments">
                    <h3 className="heading"><span>Share your </span>Views</h3>
                    <p>Please keep your views respectful and not include any anchors, promotional content or obscene words in them. Such comments will be definitely removed and your IP be blocked for future purpose.</p>
                    <form encType="multipart/form-data" onSubmit={this.submitComment}>
                        <div className="card">
                            <div className="row">
                                <div className="col-sm-5">
                                    <label>Name</label>
                                    <input className="form-control" type="text" name="name" required placeholder="Name Please" value={this.state.name} onChange={this.onChange}/>
                                </div>    
                                <div className="col-sm-7">
                                    <label>Email</label>
                                    <input className="form-control" type="email" name="email" required placeholder="Email Please" value={this.state.email} onChange={this.onChange}/> 
                                </div>    
                                <div className="col-sm-12">
                                    <label>Comment</label>
                                    {/* <CKEditor onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } data={this.state.comment} content= {this.state.comment} onChange={this.onEditorChange1} /> */}
                                    { this.state.error ?
                                        <>
                                            <p>{this.state.error}</p>
                                            <p>Do not include - {this.state.errorReason}</p>
                                            <button className="amitBtn" onClick={this.resetData}>Try Again</button> 
                                        </>
                                    :   <button className="amitBtn">Submit</button> 
                                    }
                                    { this.state.message ?  <p>{this.state.message}</p> : null }
                                </div>
                            </div>
                        </div>
                    </form>
                    {this.props.comments ?
                        <>
                            {this.props.comments.length > 0 ?
                                <>
                                    <h3 className="heading"><span>Some love showed </span>by people </h3>
                                    <div className="row comments">
                                        <div className="col-sm-12">
                                            {/* { this.props.comments.map((i, index)=>{ return(
                                                <div className="card mb-3" key={index}> 
                                                    <section className="originalComment" dangerouslySetInnerHTML={{ __html: i.comment }}/>
                                                    <span style={{display:'block', textAlign:'right'}}><strong>{i.user}</strong> on {moment(i.updated_at).format("DD MMMM  YYYY")}
                                                    </span>
                                                    { this.props.response.map((j, index)=>{ 
                                                        if(i.id === j.commentId){
                                                            return(
                                                                <div className="adminReply" key={index}>
                                                                    <section className="not-found-controller" dangerouslySetInnerHTML={{ __html: j.comment }}/>
                                                                    <span><strong>{j.user}</strong> on {moment(i.updated_at).format("DD MMMM  YYYY")}</span>
                                                                </div>
                                                    )} })}
                                                    <div className="forAdmin my-3">
                                                        { this.state.user.role=='Admin' ? <button className="amitBtn" onClick={()=>this.addAdminModalOn(i)}>Reply by Admin</button> : <button className="amitBtn" onClick={()=>this.addUserModalOn(i)}>Reply</button> }
                                                    </div>
                                                </div>
                                            ) })} */}
                                        </div>
                                    </div>
                                </>
                            : null }
                        </>
                    :null }
                </div>
            </>
        )
    }
}
export default Comments