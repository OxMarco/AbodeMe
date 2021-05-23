import React, { Component } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { Link } from "react-router-dom";
import ProgressBar from 'react-bootstrap/ProgressBar';
import emailjs from 'emailjs-com';
import SweetAlert from 'sweetalert2-react';
import DashboardHeader from '../../components/dashboard-header/dashboard-header';
import Secret from '../../components/secret/secret';

export default class Let extends Component {
    constructor (props) {
        super(props);

        this.state = { 
            address: '',
            latitude: '',
            longitude: '',
            country: '',
            region: '',
            zip: '',
            title: '',
            description: '',
            surface: '',
            price: '',
            collateral: '',
            code: '',
            image: null,
            progress: 0,
            button_disabled: false,
            show: false,
            userInfo: this.props.userInfo
        };
    }

    componendDidMount() {
        this.props.tracker.pageVisited('let');
    }

    handleFormSubmit = async (e) => {
        e.preventDefault();

        this.setState({ button_disabled: true });

        let secretNetwork = new Secret();
        await secretNetwork.getHandle();
        let secretResponse = await secretNetwork.store(this.state.code);
        let secretResult = JSON.parse(String.fromCharCode(...secretResponse.data));
        let secretTokenId = secretResult?.mint_nft?.token_id;
        console.log(secretTokenId);

        const res = await fetch(`https://us1.locationiq.com/v1/search.php?key=pk.f9586cd00dbee8301b57de330d3112a7&format=json&q=${this.state.address}`)
        const response = await res.json();
        console.log(response[0]['lat']);
        this.setState({
            latitude: response[0]['lat'],
            longitude: response[0]['lon']
        });

        this.setState({progress: 25});

        const image = await this.props.ipfs.add(this.state.image, {
            progress: (prog) => console.log(prog),
        });
        const imageCID = image.path;

        this.setState({progress: 50});

        const data = JSON.stringify({ 
            latitude: parseFloat(this.state.latitude),
            longitude: parseFloat(this.state.longitude),
            country: this.state.country,
            region: this.state.region,
            zip: this.state.zip,
            title: this.state.title,
            description: this.state.description,
            surface: parseFloat(this.state.surface),
            image: imageCID,
        });

        const metadata = await this.props.ipfs.add(data);
        const metadataCID = metadata.path;

        this.setState({progress: 75});

        //await this.sendMail("..."); // TBD

        const flag = await this.props.api.create(metadataCID, parseFloat(this.state.price), parseFloat(this.state.collateral), secretTokenId);
        if(!flag) alert('Error');

        this.setState({progress: 100, button_disabled: false, show: true });

        e.target.reset();
    }

    sendMail = async (data) => {
        var templateParams = {
            to: this.props.userInfo['email'],
            id: data
        };
        await emailjs.send('service_bi3gqt9', 'template_i3jg7ee', templateParams, 'user_df7doAY0vH3ifJMBgVXNG');
    }

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({
            [e.target.name]: value
        });
    }

    handleFileChange = (e) => {
        this.setState({ image: e.target.files[0] });
    }

    selectCountry = (val) => {
        this.setState({ country: val });
    }
    
    selectRegion = (val) => {
        this.setState({ region: val });
    }

    render() {
        const { address,
                country,
                region,
                zip,
                title,
                description,
                surface,
                price,
                collateral,
                code,
                progress,
                button_disabled,
                show,
                userInfo
            } = this.state;

        return (
        <>
            <SweetAlert
                show={show}
                title="Success"
                text="You have successfully created a listing for this property!"
                onConfirm={() => this.setState({ show: false, progress: 0 })}
            />
            
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
                                        <li><a href="#"><i className="fa fa-plus"></i>To Let</a></li>
                                        <li><a href="#"><i className="fa fa-minus"></i>To Rent</a></li>
                                        <li><Link to="/let"><i className="fa fa-edit"></i>Add New</Link></li>
                                    </ul>
                                </div>
                                
                            </div>
                        </div>
                        
                        <div className="col-lg-9 col-md-8 col-sm-12">
                            <div className="dashboard-wrapers">
                            
                                <div className="form-submit">	
                                    <h4>Create New Listing</h4>
                                    <br />
                                    <div className="submit-section">
                                        <form className="form-row" onSubmit={this.handleFormSubmit}>

                                            <div className="form-group col-md-6">
                                                <label>Address</label>
                                                <input type="text" className="form-control" name="address" id="address" placeholder="Hide Park..." min="2" max="255" value={address} onChange={this.handleChange} required />
                                            </div>

                                            <div className="form-group col-md-6">
                                                <label>Zip</label>
                                                <input type="text" className="form-control" name="zip" id="zip" placeholder="012..." value={zip} onChange={this.handleChange} required />
                                            </div>
                                            
                                            <div className="form-group col-md-6">
                                                <label>Country</label>
                                                <CountryDropdown value={country} onChange={(val) => this.selectCountry(val)} className="custom-select d-block w-100" name="country" id="country" required />
                                            </div>
                                            
                                            <div className="form-group col-md-6">
                                                <label>Region</label>
                                                <RegionDropdown country={country} value={region} onChange={(val) => this.selectRegion(val)} className="custom-select d-block w-100" name="region" id="region" required />
                                            </div>

                                            <div className="form-group col-md-12">
                                                <label>Title</label>
                                                <input type="text" className="form-control" name="title" id="title" placeholder="A catchy title" min="3" max="100" value={title} onChange={this.handleChange} required />
                                            </div>
                                            
                                            <div className="form-group col-md-12">
                                                <label>Description</label>
                                                <textarea className="form-control" name="description" id="description" placeholder="Tell us more about the property to let" min="10" max="500" spellCheck="true" value={description} onChange={this.handleChange} required></textarea>
                                            </div>
                                            
                                            <div className="form-group col-md-6">
                                                <label htmlFor="surface">Surface (m2)</label>
                                                <input type="number" className="form-control" name="surface" id="surface" placeholder="100" value={surface} onChange={this.handleChange} required />
                                            </div>
                                            
                                            <div className="form-group col-md-6">
                                                <label htmlFor="price">Price/day (USD)</label>
                                                <input type="number" className="form-control" name="price" id="price" placeholder="45" min="1" max="10000" value={price} onChange={this.handleChange} required />
                                            </div>
                                            
                                            <div className="form-group col-md-6">
                                                <label htmlFor="collateral">Deposit (USD)</label>
                                                <input type="number" className="form-control" name="collateral" id="collateral" placeholder="100" min="0" max="10000" value={collateral} onChange={this.handleChange} required />
                                            </div>

                                            <div className="form-group col-md-6">
                                                <label htmlFor="code">Entrance Code</label>
                                                <input type="text" className="form-control" name="code" id="code" placeholder="1234" min="1" max="100" value={code} onChange={this.handleChange} required />
                                            </div>

                                            <div className="form-group col-md-12">
                                                <label>Image</label>
                                                <input type="file" className="form-control-file" name="image" id="image" accept="image/*" onChange={this.handleFileChange} required />
                                            </div>
                                            <br />
                                            <div className="form-group col-lg-12 col-md-12">
                                                <button className="btn btn-theme" type="submit" disabled={button_disabled}>Add to the List</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                        
                                <ProgressBar animated now={progress} />

                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>
            </>
        );
    }
}
