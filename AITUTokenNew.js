const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AITUTokenNew", function () {
  let AITUToken, aitutoken, owner, addr1, addr2;
  const initialSupply = 5000; // Новое начальное количество токенов

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    const AITUTokenFactory = await ethers.getContractFactory("AITUTokenNew");
    aitutoken = await AITUTokenFactory.deploy(initialSupply);
    await aitutoken.waitForDeployment();
  });

  it("should deploy with correct initial supply", async function () {
    const totalSupply = await aitutoken.totalSupply();
    expect(totalSupply).to.equal(ethers.parseUnits(initialSupply.toString(), 18));
  });

  it("should allow transfers and log transactions", async function () {
    await aitutoken.transfer(addr1.address, ethers.parseUnits("200", 18));

    const balance = await aitutoken.balanceOf(addr1.address);
    expect(balance).to.equal(ethers.parseUnits("200", 18));

    const latestSender = await aitutoken.getLatestTransactionSender();
    const latestReceiver = await aitutoken.getLatestTransactionReceiver();

    expect(latestSender).to.equal(owner.address);
    expect(latestReceiver).to.equal(addr1.address);
  });
});
