
const Multisend = artifacts.require("./Multisend.sol");

module.exports = function(deployer) {
     
  deployer.deploy(Multisend);

};