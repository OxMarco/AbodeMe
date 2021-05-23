// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;
pragma abicoder v2;

import "./RentalToken.sol";

contract AbodeMe {

    RentalToken private _tokenFactory;
    
    constructor() {
        _tokenFactory = new RentalToken();
    }
    
    function create(string memory metadata, uint256 price, uint256 collateral, string memory code) public returns (uint256) {
        return _tokenFactory.mintIt(msg.sender, metadata, price, collateral, code);
    }
    
    function remove(uint256 id) public {
        _tokenFactory.burnIt(id, msg.sender);
    }
    
    function get(uint256 id) public view returns (string memory, uint256, uint256, address, address) {
        return ( _tokenFactory.tokenURI(id), _tokenFactory.tokenPrice(id), _tokenFactory.tokenCollateral(id), _tokenFactory.tokenLandlord(id), _tokenFactory.tokenTenant(id) );
    }

    function getAll() public view returns (uint256) {
        return _tokenFactory.allTokens();
    }
    
    function startRent(uint256 id) public payable returns(string memory) {
        require(msg.value == _tokenFactory.tokenCollateral(id), "Insufficient funds sent");
    
        _tokenFactory.startRent(id, msg.sender);
    
        return _tokenFactory.tokenCode(id);
    }
    
    function stopRent(uint256 id) public {
        _tokenFactory.stopRent(id, msg.sender);
        
        address payable landlord = payable(_tokenFactory.tokenLandlord(id));
        landlord.transfer(_tokenFactory.tokenCollateral(id));
    }
}
