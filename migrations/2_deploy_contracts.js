
const MultisendBase = artifacts.require("./MultisendBase.sol");

module.exports = function(deployer) {
     
  deployer.deploy(MultisendBase);

};