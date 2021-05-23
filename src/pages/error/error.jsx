import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Newsletter from '../../components/newsletter/newsletter';

export default class Error extends Component {
    render() {
        return (
            <>
                <section className="error-wrap">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6 col-md-10">
                                <div className="text-center">
                                    <img src="https://kumarpreet.com/travlio-live/travlio/assets/img/404.png" className="img-fluid" alt="404" />
                                    <Link className="btn btn-theme" to="/">Back To Home</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Newsletter />
            </>
        );
    }
}
