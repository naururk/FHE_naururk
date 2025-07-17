import { ethers } from "hardhat";

async function main() {
  const factory = await ethers.getContractFactory("PrivateComparator");
  const contract = await factory.deploy();
  await contract.waitForDeployment();
  console.log("PrivateComparator deployed to:", await contract.getAddress());
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
