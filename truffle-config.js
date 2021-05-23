const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const MNEMONIC = fs.readFileSync(".mnemonic").toString().trim();

module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",     // Localhost (default: none)
            port: 8545,            // Standard Ethereum port (default: none)
            network_id: "*",       // Any network (default: none)
        },
        matic: {
            provider: () => new HDWalletProvider(MNEMONIC, `https://rpc-mumbai.matic.today`),
            network_id: 80001,
            confirmations: 2,
            timeoutBlocks: 200,
            skipDryRun: true
        },
        ropsten: {
            provider: () => new HDWalletProvider(MNEMONIC, "https://ropsten.infura.io/"),
            network_id: 3,
            confirmations: 2,
            timeoutBlocks: 200,
            skipDryRun: true
        },
        xdai: {
            provider: () => new HDWalletProvider(MNEMONIC, "https://dai.poa.network"),
            network_id: 100,
            confirmations: 2,
            timeoutBlocks: 200,
            gas: 500000,
            gasPrice: 1000000000
        }
    },
    compilers: {
        solc: {
            version: "0.8.0",    // Fetch exact version from solc-bin (default: truffle's version)
            // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
            // settings: {          // See the solidity docs for advice about optimization and evmVersion
            //  optimizer: {
            //    enabled: false,
            //    runs: 200
            //  },
            //  evmVersion: "byzantium"
            // }
        }
    }
};