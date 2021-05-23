import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import MapBox from '../../components/mapbox/mapbox';

export default class Rent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect_url: '',
            my_lat: 51.509865,
            my_lng: -0.118092,
            address: '',
            tokens: []
        };
    }

    async componentDidMount () {
        this.props.tracker.pageVisited('let');

        this.setState({ address: this.props.address });

        const all = await this.props.api.getAll();

        console.info(all);

        let t = [];
        for(let i = 1; i <= all; i++) {
            try {
                const temp = await this.props.api.get(i);
                t.push(temp);
            } catch (e) {
            }
        }

        this.setState({ tokens: t });
    }

    geolocate() {
    }

    viewDetails(id) {
        this.setState({redirect_param: id, redirect_url: 'info'});
    }

    render() {
        const { tokens, redirect_param, redirect_url, my_lat, my_lng, address } = this.state;

        if (redirect_url) {
            return <Redirect to={redirect_url + '/' + redirect_param} />
        }

        return (
            <>
                <div className="fs-container half-map">

                <div className="fs-left-map-box">
                    <div className="home-map fl-wrap">
                        <div className="map-container fw-map">
                            <MapBox lat={my_lat} lng={my_lng} id="map-main" />
                        </div>
                    </div>
                </div>
                
                <div className="fs-inner-container">
                    <div className="fs-content">
                        
                        <div className="row">
                            
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="shorting-wrap">
                                    <h5 className="shorting-title">{tokens.length} Results</h5>
                                    <div className="shorting-right">
                                        <button onClick={() => this.geolocate()}>LocateMe</button>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                            
                        <div className="row m-0">
                        
                        { tokens && tokens.filter(token => token.tenant === '0x0000000000000000000000000000000000000000' && token.owner !== address).map((token) =>
                            <div className="col-lg-6 col-md-12 col-sm-12" key={token.id}>
                                <div className="tour-simple-wrap style-3">
                                    <div className="tour-simple-thumb">
                                        <Link to={"/info/"+token.id}><img src={token.image} className="img-fluid img-responsive" alt="property" /></Link>
                                    </div>
                                    <div className="tour-simple-caption">
                                        <div className="ts-caption-left">
                                            <div className="ovrall-rating">
                                                <i className="fa fa-star filled"></i>
                                                4.7 Good
                                            </div>
                                            <h4 className="ts-title"><Link to={"/info/"+token.id}>{token.title}</Link></h4>
                                        </div>
                                    </div>
                                    <div className="tour-simple-footer">
                                        <ul>
                                            <li><i className="fa fa-ruler-combined"></i>{token.surface} sqmt</li>
                                            <li><i className="fa fa-coins"></i>${token.price}/day</li>
                                            <li><i className="fa fa-wallet"></i>${token.collateral} deposit</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                    
                        </div>
                    
                        { tokens === [] && 
                        <div className="row">
                            <div className="col-md-12 col-sm-12 mt-3">
                                <div className="text-center">
                                    
                                    <div className="spinner-grow text-danger" role="status">
                                      <span className="sr-only">Loading...</span>
                                    </div>
                                    <div className="spinner-grow text-warning" role="status">
                                      <span className="sr-only">Loading...</span>
                                    </div>
                                    <div className="spinner-grow text-success" role="status">
                                      <span className="sr-only">Loading...</span>
                                    </div>
                                    
                                </div>
                            </div>	
                        </div>
                        }
                        
                    </div>
                </div>
                
            </div>
            <div className="clearfix"></div>
            </>
        );
    }
}
