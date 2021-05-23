import React, { Component } from 'react';
import { SigningCosmWasmClient } from "secretjs";
import { Random } from "@iov/crypto";

const CHAIN_ID = "holodeck-2";
const API_URL = "https://bootstrap.secrettestnet.io/";
export const CONTRACT_ADDRESS = "secret19vc03hfsuqfsmt73c4fypg5au07lfngpcw2ytc";

export default class Secret {
    constructor() {
        this.client = null;
        this.address = null;
        this.keplrLoaded = false;
    }

    async getHandle() {

        if (window?.keplr?.enable) {

            // Enabling before using the Keplr is recommended.
            // This method will ask the user whether or not to allow access if they haven't visited this website.
            // Also, it will request user to unlock the wallet if the wallet is locked.
            await window.keplr.enable(CHAIN_ID)

            const offlineSigner = window.getOfflineSigner(CHAIN_ID)
            const enigmaUtils = window.getEnigmaUtils(CHAIN_ID)

            // You can get the address/public keys by `getAccounts` method.
            // It can return the array of address/public key.
            // But, currently, Keplr extension manages only one address/public key pair.
            // XXX: This line is needed to set the sender address for SigningCosmosClient.
            const accounts = await offlineSigner.getAccounts()
            const address = accounts[0].address

            // Initialize the gaia api with the offline signer that is injected by Keplr extension.
            const cosmJS = new SigningCosmWasmClient(
                API_URL,
                address,
                offlineSigner,
                enigmaUtils
            );

            this.client = cosmJS;

        } else {
            alert(1);
        }
    }

    async store(code) {
        const token_id = Random.getBytes(16).reduce(
            (acc, b) => acc + b.toString(16).padStart(2, "0"),
            ''
        );

        return await this.client.execute(CONTRACT_ADDRESS, {
            "mint_nft": {
                token_id,
                public_metadata: {description: code}
            }
        });
    }

    async get(tokenId) {
        return await this.client.execute(CONTRACT_ADDRESS, {
            "burn_nft": {
                token_id: tokenId
            }
        });
        
        /*.then(res => {
            let result = JSON.parse(String.fromCharCode(...res.data))
            this.setState({ revealed: result?.burn_nft?.secret?.description});
        }).catch(err => {
            console.error(err)
        });
        */
    }
}
