const HashCheck = artifacts.require(`./HashCheck.sol`)

module.exports = function(deployer) {
  // ESR20 tokens
  deployer.deploy(HashCheck);
};
