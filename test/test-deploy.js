const { ethers } = require("hardhat");
const { assert, expect } = require("chai");

describe("Simple Storage", function () {
  let simpleStorage, simpleStorageFactory
  
  beforeEach(async () => {
    simpleStorageFactory = await ethers.getContractFactory("simpleStorage")
    simpleStorage = await simpleStorageFactory.deploy()
  })

  it('start with a current value of 0', async () => {
    const currentValue = await simpleStorage.retrieve()
    const retrievedValue = 0
    assert.equal(currentValue.toString(), retrievedValue)
  })

  it('updates when we call store', async () => {
    // the way I wrote my code
    /*
    const store = await simpleStorage.store(8)
    const storedValue = await store.wait(1)
    const retrievedValue = await simpleStorage.retrieve()
    const updatedValue = 8

    assert.equal(retrievedValue.toString(), updatedValue)
    */

    // How Patrick wrote his code 
    const expectedValue = 7
    const transactionResponse = await simpleStorage.store(expectedValue)
    await transactionResponse.wait(1)

    const currentValue = await simpleStorage.retrieve()
    assert.equal(currentValue.toString(), expectedValue)
  } )
});
