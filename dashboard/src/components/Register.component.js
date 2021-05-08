import React from "react";
import axios from 'axios';
import '../assets/css/Register.css';

export default class Register extends React.Component{
    constructor(){
        super();
        this.state = {
            hid:"",
            password:"",
            adID:"",
            message:"",
            isM: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e){
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }
    onSubmit(e){
        e.preventDefault();
        console.log("sndfkj")
        const url = "http://localhost:5000/admin/register"
        const form = {
            hid: this.state.hid,
            password: this.state.password,
            adID: this.state.adID
        }
        axios.post(url, form)
        .then((data)=>{
            let eid = data.data.eid
            let details = data.data.details
            if(eid === 0){
                //success
                this.setState({
                    message:details,
                    isM: true
                })
                console.log(details)
            }else if(eid === 1000){
                //not authenticated
                this.setState({
                    message:details,
                    isM: true
                })
            }
            console.log(data.data)
        })
        .catch((error)=>{
            console.log(error)
        })
        console.log(this.state)
    }
    render(){
        let message = ""
        if(this.state.isM === true){
            message = <div className="register-message">
            <div className="r-m-head">
                <p>Notification</p>
                
            </div>
            <div className="r-m-content">
                <p>{this.state.message}</p>
            </div>
            </div>
        }
        return(
            <div className="register-container">
                <div className="register-header">
                    <h2>Register</h2>
                </div>
                <div className="register-form">
                    <form onSubmit={this.onSubmit}>
                        <div className="login-form-item">
                            
                            <input className="form-field" placeholder="HID" type="text" onChange={this.onChange} value={this.state.hid} name="hid" />
                        </div>
                        <div className="login-form-item">
                            
                            <input className="form-field" placeholder="Password" type="password" onChange={this.onChange} value={this.state.password} name="password" />
                        </div>
                        <div className="login-form-item">
                            
                            <input className="form-field" placeholder="Admin ID" type="password" onChange={this.onChange} value={this.state.adID} name="adID" />
                        </div>
                        <div className="register-form-button">
                            <button className="btn btn-primary">Submit</button>
                        </div>
                        {message}
                    </form>
                </div>
            </div>
        )
    }
}