const TareasContract = artifacts.require("TareasContract.sol");

module.exports = function (deployer) {
  deployer.deploy(TareasContract);
};