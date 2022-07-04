const { ethers } = require("hardhat");
const { assert, expect } = require("chai");

describe("Simple Storage", function () {
  let SimpleStorage, SimpleStorageFactory
  
  beforeEach(async () => {
    SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
    SimpleStorage = await SimpleStorageFactory.deploy()
  })

  it('start with a current value of 0', async () => {
    const currentValue = await SimpleStorage.retrieve()
    const retrievedValue = 0
    assert.equal(currentValue.toString(), retrievedValue)
  })

  it('updates when we call store', async () => {
    // the way I wrote my code
    /*
    const store = await SimpleStorage.store(8)
    const storedValue = await store.wait(1)
    const retrievedValue = await SimpleStorage.retrieve()
    const updatedValue = 8

    assert.equal(retrievedValue.toString(), updatedValue)
    */

    // How Patrick wrote his code 
    const expectedValue = 7
    const transactionResponse = await SimpleStorage.store(expectedValue)
    await transactionResponse.wait(1)

    const currentValue = await SimpleStorage.retrieve()
    assert.equal(currentValue.toString(), expectedValue)
  })

  it('add a person and favorite number', async () => {
    const addPerson = await SimpleStorage.addPerson('Grace', 7)

  })
});
