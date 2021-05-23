import React from 'react';
import { Route, Switch } from 'react-router-dom';
import IpfsHttpClient from 'ipfs-http-client';
import IpfsRouter from 'ipfs-react-router'
import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";

import Home from './pages/home/home';
import Dashboard from './pages/dashboard/dashboard';
import Rent from './pages/rent/rent';
import Let from './pages/let/let';
import Info from './pages/info/info';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Loader from './components/loader/loader';
import Api from './components/api/api';
import Tracker from './components/tracker/tracker';

export default class App extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            tracker: new Tracker(),
            userInfo: '',
            address: '',
            web3: null,
            api: null,
            ipfs: null,
            loggedIn: false
        };

        this.ensureLoggedIn = this.ensureLoggedIn.bind(this);
    }

    async init() {

        const torus = new Torus({});
        await torus.init({
            buildEnv: "production", // default: production
            network: {
                host: "mumbai", // default: mainnet
                chainId: 80001, // default: 1
                networkName: "Mumbai Test Network" // default: Main Ethereum Network
            },
            enableLogging: true,
        });

        await torus.login();

        const web3 = new Web3(torus.provider);

        const address = (await web3.eth.getAccounts())[0];
        const userInfo = await torus.getUserInfo();

        const ipfs = IpfsHttpClient({
            host: "ipfs.infura.io",
            port: "5001",
            protocol: "https",
        });

        const api = new Api(web3, address);

        this.setState({
            userInfo: userInfo,
            address: address,
            web3: web3,
            api: api,
            ipfs: ipfs,
            loggedIn: true
        });
    }

    async ensureLoggedIn() {
        while (!this.state.loggedIn) {
            try {
                await this.init();
            } catch (e) {
                console.error("Login failed: " + e.toString());
            }
        }
    }

    async componentDidMount() {
        await this.ensureLoggedIn();
    }

    render() {
        const { loggedIn } = this.state;

        if(!loggedIn)
            return(
                <Loader />
            );
        else
        return (
            <IpfsRouter>
                <>
                <Header />
                <Switch>
                    <Route exact path="/let" render={(props) => <Let tracker={this.state.tracker} address={this.state.address} web3={this.state.web3} api={this.state.api} userInfo={this.state.userInfo} ipfs={this.state.ipfs} {...props} />} />
                    <Route exact path="/rent" render={(props) => <Rent tracker={this.state.tracker} address={this.state.address} web3={this.state.web3} api={this.state.api} userInfo={this.state.userInfo} ipfs={this.state.ipfs} {...props} />} />
                    <Route exact path="/dashboard" render={(props) => <Dashboard tracker={this.state.tracker} address={this.state.address} web3={this.state.web3} api={this.state.api} userInfo={this.state.userInfo} {...props} />} />
                    <Route exact path="/info/:id" render={(props) => <Info tracker={this.state.tracker} address={this.state.address} web3={this.state.web3} api={this.state.api} userInfo={this.state.userInfo} {...props} />} />
                    <Route render={(props) => <Home tracker={this.state.tracker} address={this.state.address} api={this.state.api} />} />
                </Switch>
                <Footer />
                </>
            </IpfsRouter>
        );
    }
}
