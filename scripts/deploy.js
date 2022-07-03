// imports
const { ethers, run, network } = require("hardhat")

// async main
async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")

  console.log("Deploying contract ......")

  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()
  console.log(`Deployed contract to: ${simpleStorage.address}`)

  // What happens when we deploy to our hardhat network (test net)
  console.log(network.config)
  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    console.log("wating for block confirmation .....")
    await simpleStorage.deployTransaction.wait(6)
    await verify(simpleStorage.address, [])
  }

  // Interact with contract
  const currentValue = await simpleStorage.retrieve()
  console.log(`Current value is: ${currentValue}`)

  // Update the current value
  const transactionResponse = await simpleStorage.store(8)
  await transactionResponse.wait(1)
  const updatedValue = await simpleStorage.retrieve()
  console.log(`Updated value is: ${updatedValue}`)
}

async function verify(contracAdress, args) {
  console.log("Verifying contract .....")

  try {
    await run("verify:verify", {
      address: contracAdress,
      constructorArguments: args,
    })
  } catch (error) {
    error.message.toLowerCase().includes("already verified")
      ? console.log("Already verified")
      : console.log(error)
  }
}

// main
main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err)(process.exit(1))
  })
