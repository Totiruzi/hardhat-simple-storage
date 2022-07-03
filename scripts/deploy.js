// imports
const { ethers } = require("hardhat")

// async main
async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")

  console.log("Deploying contract ......")

  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()
  console.log(`Deployed contract to: ${simpleStorage.address}`)
}

// main
main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err)(process.exit(1))
  })
