import React from 'react';

import Login from './Login.Component';
import Register from './Register.component';
import '../assets/css/Panel.css';

export default class Panel extends React.Component{
    constructor(){
        super();
        this.state = {
            main: "login"
        }
        this.onchange = this.onchange.bind(this);
    }
    onchange(e){
        this.setState({
            main:e
        })
    }
    render(){
        let ren_main = ""
        if(this.state.main === "login"){
            ren_main = <Login />
        }else{
            ren_main = <Register />
        }
        return(
            <div className="panel-container">
                <div className="panel-control">
                    {ren_main}
                </div>
                <div className="panel-control-buttons">
                    <button className="panel-btn" onClick={()=>{this.onchange("login")}}>Login</button>
                    <button className="panel-btn" style={{marginLeft:"5%"}} onClick={()=>{this.onchange("register")}}>Register</button>
                </div>
            </div>
        )
    }
}