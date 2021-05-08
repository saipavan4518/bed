import React from 'react';
import axios from 'axios';

export default class MainForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            hid: this.props.data,
            tcb:0,
            ocb:0,
            tob:0,
            oob:0,
            tvb:0,
            ovb:0,
            tib:0,
            oib:0,
            name:""
        }
        this.onchange = this.onchange.bind(this);
        this.onsubmit = this.onsubmit.bind(this);
    }
    onchange(e){
        const {name, value} = e.target;
        this.setState({
            [name]:value
        })
    }
    onsubmit(e){
        e.preventDefault();
        console.log(this.state);
        const url = "http://localhost:5000/admin/hospital/update/data"
        axios.put(url,this.state)
        .then((data)=>{
            let eid = data.data.eid;
            let details = data.data.details;
            if(eid === 0){
                //success
                console.log(details);
                this.setState({
                    tcb:0,
                    ocb:0,
                    tob:0,
                    oob:0,
                    tvb:0,
                    ovb:0,
                    tib:0,
                    oib:0,
                    name:""
                })
            }else{
                //failure
                this.setState({
                    tcb:0,
                    ocb:0,
                    tob:0,
                    oob:0,
                    tvb:0,
                    ovb:0,
                    tib:0,
                    oib:0,
                    name:""
                })
                console.log(details);
            }
        })
    }
    render(){
        return(
            <div className="dashboard-main-form">
                <form onSubmit={this.onsubmit}>
                <div className="dashboard-main-form-item">
                    <label>Total Covid Beds</label>
                    <input className="d-form-field" placeholder="Total Covid Beds" name="tcb" type="number" value={this.state.tcb} onChange={this.onchange}/>
                </div>
                <div className="dashboard-main-form-item">
                    <label>Occupied covid Beds</label>
                    <input className="d-form-field" placeholder="Occupied covid Beds" name="ocb" type="number" value={this.state.ocb} onChange={this.onchange}/>
                </div>
                <div className="dashboard-main-form-item">
                    <label>Total Oxygen Supply Beds</label>
                    <input className="d-form-field" placeholder="Total Oxygen Supply Beds" name="tob" type="number" value={this.state.tob} onChange={this.onchange}/>
                </div>
                <div className="dashboard-main-form-item">
                    <label>Occupied Oxygen Supply Beds</label>
                    <input className="d-form-field" placeholder="Occupied Oxygen Supply Beds" name="oob" type="number" value={this.state.oob} onChange={this.onchange}/>
                </div>
                <div className="dashboard-main-form-item">
                    <label>Total Ventilator Beds</label>
                    <input className="d-form-field" placeholder="Total Ventilator Beds" name="tvb" type="number" value={this.state.tvb} onChange={this.onchange}/>
                </div>
                <div className="dashboard-main-form-item">
                    <label>Occupied Ventilator Beds</label>
                    <input className="d-form-field" placeholder="Occupied Ventilator Beds" name="ovb" type="number" value={this.state.ovb} onChange={this.onchange}/>
                </div>
                <div className="dashboard-main-form-item">
                    <label>Total ICU Beds</label>
                    <input className="d-form-field" placeholder="Total ICU Beds" name="tib" type="number" value={this.state.tib} onChange={this.onchange}/>
                </div>
                <div className="dashboard-main-form-item">
                    <label>Occupied ICU Beds</label>
                    <input className="d-form-field" placeholder="Occupied ICU Beds" name="oib" type="number" value={this.state.oib} onChange={this.onchange}/>
                </div>
                <div className="dashboard-main-form-item">
                    <label>Name of the Updater</label>
                    <input className="d-form-field" placeholder="Name of the Updater" name="name" type="text" value={this.state.name} onChange={this.onchange}/>
                </div>
                <div className="dashboard-form-button">
                    <button className="btn btn-primary">Update</button>
                </div>
            </form>
        
            </div>
        )
    }
}