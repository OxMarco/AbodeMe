import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Footer extends Component {

    render() {
        return (
            <footer className="dark-footer skin-dark-footer">
                <div>
                    <div className="container">
                        <div className="row">
                            
                            <div className="col-5">
                                <div className="footer-widget">
                                    <img src="https://github.com/grcasanova/AbodeMe/blob/master/images/logo.png?raw=true" height="65" className="img-footer" alt="logo" />
                                    <div className="footer-add">
                                        <p><strong>Email:</strong><br /><a href="mailto:hello@abode.me">hello@abode.me</a></p>
                                        <p><strong>Contract Address:</strong><br /><a href="https://explorer-mumbai.maticvigil.com/address/0x1F380FAE62A39661a87D4c72b0C9d31f9815B5C3">mumbai</a></p>
                                    </div>
                                    
                                </div>
                            </div>		

                            <div className="col">
                                <div className="footer-widget">
                                    <h4 className="widget-title">Navigation</h4>
                                    <ul className="footer-menu">
                                        <li><Link to="/">Homepage</Link></li>
                                        <li><Link to="/dashboard">Dashboard</Link></li>
                                        <li><Link to="/rent">Browse all properties</Link></li>
                                        <li><Link to="/let">Rent a property</Link></li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div className="col">
                                <div className="footer-widget">
                                    <h4 className="widget-title">Sponsors</h4>
                                    <ul className="footer-menu">
                                        <li><a href="https://superfluid.finance/">SuperFluid</a></li>
                                        <li><a href="https://polygon.technology/">Polygon</a></li>
                                        <li><a href="https://scrt.network/">Secret Network</a></li>
                                        <li><a href="https://tor.us/">Torus</a></li>
                                    </ul>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                
                <div className="footer-bottom">
                    <div className="container">
                        <div className="row align-items-center">
                            
                            <div className="col-lg-6 col-md-6">
                                <p className="mb-0">Made for the Open DeFi Hackathon Challenge - May 2021</p>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}
