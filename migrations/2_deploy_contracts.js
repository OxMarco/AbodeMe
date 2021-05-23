var RentalToken = artifacts.require("RentalToken");
var AbodeMe = artifacts.require("AbodeMe");

module.exports = function(deployer) {
    deployer.deploy(RentalToken);
    deployer.deploy(AbodeMe);
};
