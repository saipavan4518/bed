import React from 'react';
import Cookies from 'universal-cookie';
import '../assets/css/Dashboard.css';
import {Redirect} from 'react-router-dom';

export default class Navbar extends React.Component{
    constructor(){
        super();
        this.state = {
            isLogged: true
        }
        this.logout = this.logout.bind(this);
    }
    logout(e){
        const cookies = new Cookies();
        cookies.remove("user");
        this.setState({
            isLogged:false
        })
    }
    render(){
        if(this.state.isLogged === false){
            return(
                <Redirect to={{
                    pathname:"/admin/panel"
                }}/>
            )
            
        }
        return(
            <div className="dashboard-navbar">
                    <div className="dashboard-head"><p>Dashboard</p></div>
                    <div className="dashboard-nav-list">
                        <ul>
                            <li onClick={this.logout}>Logout</li>
                        </ul>
                    </div>
            </div>
        )
    }
}