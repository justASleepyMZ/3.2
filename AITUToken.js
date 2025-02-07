const { expect } = require("chai");
const hre = require("hardhat");

describe("AITUToken", function () {
  let AITUToken, aitutoken, owner, addr1, addr2;

  beforeEach(async function () {
    // Получаем ethers через hre
    const { ethers } = hre;
    [owner, addr1, addr2] = await ethers.getSigners();

    // Деплоим контракт
    AITUToken = await ethers.getContractFactory("AITUToken");
    aitutoken = await AITUToken.deploy();
    await aitutoken.waitForDeployment();
  });

  it("should have correct initial supply", async function () {
    const { ethers } = hre;
    const totalSupply = await aitutoken.totalSupply();
    expect(totalSupply).to.equal(ethers.parseUnits("2000", 18));
  });

  it("should transfer tokens correctly and log transaction", async function () {
    const { ethers } = hre;
    await aitutoken.transfer(addr1.address, ethers.parseUnits("100", 18));

    const balance = await aitutoken.balanceOf(addr1.address);
    expect(balance).to.equal(ethers.parseUnits("100", 18));

    const latestSender = await aitutoken.getLatestTransactionSender();
    const latestReceiver = await aitutoken.getLatestTransactionReceiver();

    expect(latestSender).to.equal(owner.address);
    expect(latestReceiver).to.equal(addr1.address);
  });
});

