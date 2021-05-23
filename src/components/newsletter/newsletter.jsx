import React, { Component } from 'react';

export default class Newsletter extends Component {

    render() {
        return (
            <section className="alert-wrap pt-5 pb-5" style={{ backgroundImage: `url(https://kumarpreet.com/travlio-live/travlio/assets/img/bg-new.png")`,  background:"#ff5722" }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="jobalert-sec">
                            <h3 className="mb-1 text-light">Get New Properties Notification!</h3>
                            <p className="text-light">Subscribe & get all new properties notification.</p>
                        </div>
                    </div>
                    
                    <div className="col-lg-6 col-md-6">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Enter Your Email" />
                            <div className="input-group-append">
                                <button type="button" className="btn btn-black black">Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        );
    }
}
