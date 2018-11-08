import React, { Component } from 'react';
import Login from '../screens/login/Login';
import { BrowserRouter as Router, Route } from 'react-router-dom';
class Controller extends Component {
    constructor(){
        super();
        this.baseUrl = "https://api.instagram.com/v1/";
    }
    render() {
        return (
            <Router>
                <div className="main-container">
                    <Route exact path='/' render={(props) => <Login {...props}  baseUrl={this.baseUrl} />} />
                </div>
            </Router>
        )
    }
}

export default Controller;