const { task } = require("hardhat/config")

task("block-number", "Prints the current block number").setAction(
  async (tasksArgs, hre) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber()
    console.log(`Current Block number value is: ${blockNumber}`)
  }
)

module.exports = {}
