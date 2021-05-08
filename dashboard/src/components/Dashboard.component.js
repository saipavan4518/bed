import React from "react";
import Cookies from 'universal-cookie';
import {Redirect} from 'react-router-dom';
import '../assets/css/Dashboard.css';
import Navbar from './Navbar.component';
import axios from 'axios';
import MainForm from './Mainform.component';

export default class Dashboard extends React.Component{
    constructor(){
        super();
        this.state = {
            isLogged: true,
            hid: "",
            isInfo: false,
            infoORm: false,
            isC: 0,
            addr:"",
            pincode:"",
            State:"",
            district:"",
            poc1:"",
            poc2:""
        }
        this.mhandler = this.mhandler.bind(this);
        this.onchange = this.onchange.bind(this);
        this.onsubmit = this.onsubmit.bind(this);
    }
    onsubmit(e){
        e.preventDefault();
        console.log("sakdalk")
        const form = {
            hid: this.state.hid,
            addr:this.state.addr,
            pincode: this.state.pincode,
            state: this.state.State,
            district: this.state.district,
            poc1: this.state.poc1,
            poc2: this.state.poc2,
            isC: this.state.isC
        }
        const url = "http://localhost:5000/admin/hospital/update/info";
        axios.put(url, form)
        .then((data)=>{
            let eid = data.data.eid;
            let d = data.data.details;
            if(eid === 0){
                //success
                this.setState({
                    isInfo:false,
                    isfoORm: false
                })
                console.log(d)
            }else{
                console.log(d)
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    onchange(e){
        const {name, value} = e.target;
        this.setState({
            [name]:value
        })
    }
    mhandler(e){
        this.setState({
            infoORm:true
        })
        console.log("hello")
    }

    componentDidMount(){
        const cookies = new Cookies();
        let user = cookies.get('user');
        if(!user){
            this.setState({
                isLogged:false
            })
        }else{
            this.setState({
                hid:user.hid
            })
        }

        const url = "http://localhost:5000/admin/hospital/info/updated"
        console.log(this.state.hid);
        axios.get(url,{
            params:{
                hid:user.hid
            }
        })
        .then((data)=>{
            let eid = data.data.eid;
            if(eid !== 0){
                this.setState({
                    isInfo: true
                })
            }
        })
        .catch((error)=>{console.log(error);})
    }
   
    render(){
        if(this.state.isLogged === false){
            return(
                <Redirect to={{
                    pathname:"/admin/panel"
                }}/>
            )
            
        }
        let m_or_form = this.state.infoORm ? 
        <div className="dashboard-form">
            <form onSubmit={this.onsubmit}>
                <div className="dashboard-form-item">
                    <input className="form-field" placeholder="Address" name="addr" type="text" value={this.state.addr} onChange={this.onchange}/>
                </div>
                <div className="dashboard-form-item">
                    <input className="form-field" placeholder="Pincode" name="pincode" type="text" value={this.state.pincode} onChange={this.onchange}/>
                </div>
                <div className="dashboard-form-item">
                    <input className="form-field" placeholder="State" name="State" type="text" value={this.state.State} onChange={this.onchange}/>
                </div>
                <div className="dashboard-form-item">
                    <input className="form-field" placeholder="District" name="district" type="text" value={this.state.district} onChange={this.onchange}/>
                </div>
                <div className="dashboard-form-item">
                    <input className="form-field" placeholder="Phone Number 1" name="poc1" type="text" value={this.state.poc1} onChange={this.onchange}/>
                </div>
                <div className="dashboard-form-item">
                    <input className="form-field" placeholder="Phone Number 2" name="poc2" type="text" value={this.state.poc2} onChange={this.onchange}/>
                </div>
                <div className="dashboard-radio">
                    <div>
                        Covid Hospital
                    </div>
                    <div className="radio-input">
                        <p >YES</p>
                        <input class="form-check-input" value={1} type="radio" name="isC" onChange={this.onchange}/>
                    </div>
                    <div className="radio-input">
                        <p>NO</p>
                        <input class="form-check-input" value={0} type="radio" name="isC" onChange={this.onchange}/>
                    </div>
                </div>
                <div className="dashboard-form-button">
                    <button className="btn btn-primary">Update</button>
                </div>
            </form>
        </div>
        : 
        <div class="alert alert-primary" role="alert">
                     Please Fill in the Initial Details about the Hospital, <u className="db-link" onClick={this.mhandler}>Click Here</u>  
        </div>
        let message = ""
        if(this.state.isInfo === true){
            message = m_or_form
        }else{
            message = <MainForm key={this.state.hid} data={this.state.hid}/>
        }   
        return(
            <div className="dashboard-container">
                <Navbar />
                <div className="dashboard-message">
                    {message}
                </div>
            </div>
        )
    }
}