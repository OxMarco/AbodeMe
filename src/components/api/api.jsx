import sanitizeHtml from 'sanitize-html';
import ABI from '../../abi.json';

export default class Api {
    constructor(web3, address) {
        this.address = address;
        this.web3 = web3;
        this.contract = new this.web3.eth.Contract(ABI, '0X1367ED1A3785A9CAA625EC2D932A05B4DCF47E3B');
        this.contract.setProvider(this.web3.currentProvider);
    }

    create(metadata, price, collateral, secretTokenId) {
        this.contract.methods.create(metadata, price, collateral, secretTokenId).send({from: this.address});

        /*
            .on('transactionHash', function(hash) {
                console.log('Transaction hash: ');
                console.log(hash);
            })
            .on('confirmation', function(confirmationNumber, receipt) {
                console.log('confirmation');
                console.log(confirmationNumber);
                console.log(receipt);
            })
            .on('receipt', function(receipt) {
                console.log('receipt');
                console.log(receipt);
            })
            .on('error', function(error, receipt) {
                console.log('error');
                console.log(error);
                console.log(receipt);
            });
            */

        return true;
    }

    async getAll() {
        return await this.contract.methods.getAll().call();
    }

    async get(id) {
        let data = await this.contract.methods.get(id).call(); // 0 => metadata, 1 => price, 2 collateral, 3 => owner, 4 => tenant

        var metadataCID = data[0];
        const res = await fetch(`https://ipfs.io/ipfs/${metadataCID}`);
        const response = await res.json();

        const metadata = {
            id: id,
            latitude: sanitizeHtml(response['latitude']),
            longitude: sanitizeHtml(response['longitude']),
            country: sanitizeHtml(response['country']),
            region: sanitizeHtml(response['region']),
            zip: sanitizeHtml(response['zip']),
            title: sanitizeHtml(response['title']),
            description: sanitizeHtml(response['description']),
            surface: sanitizeHtml(response['surface']),
            price: data[1],
            collateral: data[2],
            image: `https://ipfs.io/ipfs/${response['image']}`,
            owner: data[3],
            tenant: data[4]
        };

        return metadata;
    }

    remove(tokenId) {
        return this.contract.methods.remove(tokenId).send({from: this.address});
    }

    rent(tokenId, collateral) {
        return this.contract.methods.startRent(tokenId).send({from: this.address, value: this.web3.utils.toWei(collateral)});
    }

    leave(tokenId) {
        return this.contract.methods.stopRent(tokenId).send({from: this.address});
    }
}
