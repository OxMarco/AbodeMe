import React, { Component } from 'react';
import { Link } from "react-router-dom";
import DashboardHeader from '../../components/dashboard-header/dashboard-header';

const SuperfluidSDK = require("@superfluid-finance/js-sdk");

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tokens: [],
            userInfo: this.props.userInfo
        };
    }

    async componentDidMount () {
        this.props.tracker.pageVisited('dashboard');

        this.setState({ address: this.props.address });

        const all = await this.props.api.getAll();

        var t = [];
        for(let i = 1; i <= all; i++) {
            try {
                const temp = await this.props.api.get(i);
                t.push(temp);
            } catch (e) {
            }
        }

        this.setState({ tokens: t });
    }

    async remove(token) {
        await this.props.api.remove(token.id);
    }

    async unrent(token) {

        const sf = new SuperfluidSDK.Framework({
            web3: this.props.web3,
        });
        await sf.initialize()

        const owner = sf.user({
            address: token.owner,
            token: '0x15F0Ca26781C3852f8166eD2ebce5D18265cceb7'
        });

        const tenant = sf.user({
            address: token.tenant,
            token: '0x15F0Ca26781C3852f8166eD2ebce5D18265cceb7'
        });

        sf.cfa.deleteFlow({
            superToken: '0x15F0Ca26781C3852f8166eD2ebce5D18265cceb7',
            sender: tenant,
            receiver: owner,
            by: this.state.address,
        });

        this.props.api.leave(token.id);
    }

    render() {
        const { tokens, address, userInfo } = this.state;

        return (
            <>
            <DashboardHeader userInfo={userInfo} />
            
            <section className="gray">
                <div className="container-fluid">
                    <div className="row">
                        
                        <div className="col-lg-3 col-md-4 col-sm-12">
                            <div className="dashboard-navbar">
                                
                                <div className="d-user-avater">
                                    <img src={userInfo.profileImage} className="img-fluid avater" alt="profile" />
                                    <h4>{userInfo.name}</h4>
                                    <span>Verified via {userInfo.verifier}</span>
                                </div>
                                
                                <div className="d-navigation">
                                    <ul>
                                        <li><a href="#let"><i className="fa fa-plus"></i>To Let</a></li>
                                        <li><a href="#rent"><i className="fa fa-minus"></i>To Rent</a></li>
                                        <li><Link to="/let"><i className="fa fa-edit"></i>Add New</Link></li>
                                    </ul>
                                </div>
                                
                            </div>
                        </div>
                        
                        <div className="col-lg-9 col-md-8 col-sm-12">
                            <div className="dashboard-wrapers">
                            
                                <div className="dashboard-gravity-list mt-0">
                                    <h4 id="let">As Landlord</h4>
                                    <ul>
                                    { tokens && tokens.filter(token => token.owner === address).map((token) =>
                                        <li>
                                            <div className="list-box-listing">
                                                <div className="list-box-listing-img">
                                                    <Link to={"/info/"+token.id}>
                                                        <img src={token.image} alt="property" />
                                                    </Link>
                                                </div>
                                                <div className="list-box-listing-content">
                                                    <div className="inner">
                                                        <h3><a href="#">{token.title}</a></h3>
                                                        <span>{token.region}, {token.country}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="buttons-to-right">
                                                <Link to={"/info/"+token.id} className="button gray"><i className="fa fa-eye"></i> View</Link>&nbsp;
                                                <a href="#" onClick={() => this.remove(token)} className="button gray"><i className="fa fa-trash"></i> Delete</a>
                                            </div>
                                        </li>
                                    )}
                                    </ul>

                                    <h4 id="rent">As Tenant</h4>
                                    <ul>
                                    { tokens && tokens.filter(token => token.tenant === address).map((token) =>
                                        <li>
                                            <div className="list-box-listing">
                                                <div className="list-box-listing-img">
                                                    <Link to={"/info/"+token.id}>
                                                        <img src={token.image} alt="property image" />
                                                    </Link>
                                                </div>
                                                <div className="list-box-listing-content">
                                                    <div className="inner">
                                                        <h3><a href="#">{token.title}</a></h3>
                                                        <span>{token.region}, {token.country}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="buttons-to-right">
                                                <a href="#" className="button gray"><i className="fa fa-eye"></i> View</a>
                                                <a href="#" onClick={() => this.unrent(token)} className="button gray"><i className="fa fa-trash"></i> Stop Rent</a>
                                            </div>
                                        </li>
                                    )}
                                    </ul>
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>
            </>
        );
    }
}
