import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Header extends Component {

    render() {
        return (
        <>
            <div className="header header-light">
                <div className="container">
                    <nav id="navigation" className="navigation navigation-landscape">
                        <div className="nav-header">
                            <Link className="nav-brand" to="/">
                                <img src="https://github.com/grcasanova/AbodeMe/blob/master/images/logo.png?raw=true" className="logo" height="40" alt="logo" />
                            </Link>
                            <div className="nav-toggle"></div>
                        </div>
                        <div className="nav-menus-wrapper">
                            <ul className="nav-menu">
                                
                                <li className="">
                                    <Link to="/">Homepage</Link>
                                </li>
                                
                                <li>
                                    <Link to="/rent">Explore</Link>
                                </li>
                                
                            </ul>
                            
                            <ul className="nav-menu nav-menu-social align-to-right">
                                <li><Link to="/dashboard"><i className="fas fa-user-circle text-info mr-1"></i>Dashboard</Link></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
            <div className="clearfix"></div>
        </>
        );
    }

}
