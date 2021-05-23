import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Newsletter from '../../components/newsletter/newsletter';

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            properties: [],
        }
    }

    async componentDidMount() {
        this.props.tracker.pageVisited('home');

        try {
            const itemsNumber = await this.props.api.getAll();
            let items = [];
            for (let itemId = 1; itemId <= itemsNumber; itemId++) {
                try {
                    const item = await this.props.api.get(itemId);
                    items.push(item);
                    this.setState({ properties: items });
                } catch (e) {
                    console.log('error')
                }
            }
        } catch(e) {
            console.error("error")
            console.error(e)
        }
    }

    render() {
        return (
            <>
            <div className="main-banner full" style={{ backgroundImage: `url("https://kumarpreet.com/travlio-live/travlio/assets/img/banner-5.jpg")` }} data-overlay="5">
                <div className="container">
                    <div className="col-md-12 col-sm-12">
                    
                        <div className="caption text-center cl-white mb-3">
                            <span className="stylish">Just pick a location and pay day by day</span>
                            <h1>Where will you live next?</h1>
                        </div>
                        
                        <div className="faq-search">
                            <form>
                                <input name="search" className="form-control" placeholder="Type a city or location..." />
                                <button type="submit"> <i className="fa fa-search theme-cl"></i> </button>
                            </form>
                        </div>
                        
                    </div>
                </div>
                <div className="shape-bottom" data-negative="true"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100"> <path className="elementor-shape-fill" fill="#FFF" fillRule="evenodd" d="M720.99 0C960.78 0 1200.45 33.333 1440 100H0C240.872 33.333 481.202 0 720.99 0z"></path> </svg></div>
            </div>
            
            <section className="pt-2 pb-5">
                <div className="container">
                
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <div className="sec-heading center">
                                <p>Popular Locations</p>
                                <h2>Featured Houses</h2>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row">
                        
                        {
                            this.state.properties &&
                            this.state.properties
                                .filter(property => property.tenant === '0x0000000000000000000000000000000000000000')
                                .slice(0,3)
                                .map((property) =>
                            <div className="col-lg-4 col-md-6 col-sm-12" key={property.id}>
                                <div className="tour-simple-wrap">
                                    <div className="tour-simple-thumb">
                                        <a href="#"><img src={property.image} className="img-fluid img-responsive" alt="property" /></a>
                                    </div>
                                    <div className="tour-simple-caption">
                                        <div className="ts-caption-left">
                                            <h4 className="ts-title"><Link to={"/info/"+property.id}>{property.region}, {property.country}</Link></h4>
                                            <span>2 people, {property.surface} sqmt</span>
                                        </div>
                                        <div className="ts-caption-right">
                                            <div className="ts-caption-rating">
                                                <i className="fa fa-star filled"></i>
                                                <i className="fa fa-star filled"></i>
                                                <i className="fa fa-star filled"></i>
                                                <i className="fa fa-star filled"></i>
                                                <i className="fa fa-star"></i>
                                            </div>
                                            <h5 className="ts-price">${property.price}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                    </div>
                
                </div>
            </section>
            <Newsletter />
            </>
        );
    }
}
