import React, { Component } from 'react';

export default class DashboardHeader extends Component {

    render() {
        return (
        <>
            <div className="image-cover page-title" style={{ backgroundImage: `url("https://kumarpreet.com/travlio-live/travlio/assets/img/banner.jpg")` }} data-overlay="6">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            
                            <h2 className="ipt-title">Hello, {this.props.userInfo.name}</h2>
                            <span className="ipn-subtitle text-light">Edit & View Your Account</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
        );
    }

}
