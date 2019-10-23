
const ETHDexFeeSend = artifacts.require("./ETHDexFeeSend.sol");

module.exports = function(deployer) {
     
  deployer.deploy(ETHDexFeeSend);

};