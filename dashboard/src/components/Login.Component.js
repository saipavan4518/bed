import React from "react";
import '../assets/css/Login.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {Redirect} from 'react-router-dom';
require('dotenv').config();

export default class Login extends React.Component{
    constructor(){
        super();
        this.state = {
            hid:"",
            password:"",
            isredirect: false
        }
        this.onchange = this.onchange.bind(this);
        this.onsubmit = this.onsubmit.bind(this);
    }
    onsubmit(e){
        e.preventDefault();
        const form = {
            hid: this.state.hid,
            password: this.state.password
        }

        const url = `http://localhost:5000/admin/login`;
        axios.post(url, form)
        .then((data)=>{
            let eid = data.data.eid
            let message = data.data.details
            if(eid === 500){
                console.log(message)
            }
            if(eid === 0){
                //success
                const token = data.headers["x-access-token"]
                localStorage.setItem("token", token);
                let cookie = new Cookies();
                cookie.set("user",{"hid":this.state.hid},{
                    secure:true
                })
                this.setState({
                    isredirect:true
                })
                console.log(message)
            }
            if(eid === 100){
                //servers down
                console.log(message)
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    onchange(e){
        const {name, value} = e.target;
        this.setState({
            [name]:value
        })
    }
    render(){
        if(this.state.isredirect){
            return(
                <Redirect push 
                to={{
                    pathname:"/dashboard/admin/hospital"
                }}
                />
            )
        }
        return(
            <div className="login-container">
                <div className="login-header">
                    <h2>Login</h2>
                </div>
                <div className="login-form">
                    <form onSubmit={this.onsubmit}>
                        <div className="login-form-item">
                            <input className="form-field" placeholder="HID" name="hid" type="text" value={this.state.hid} onChange={this.onchange}/>
                            
                        </div>
                        <div className="login-form-item">
                            <input className="form-field" placeholder="Password" name="password" type="password" value={this.state.password} onChange={this.onchange}/>
                        </div>
                        <div className="login-form-button">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}