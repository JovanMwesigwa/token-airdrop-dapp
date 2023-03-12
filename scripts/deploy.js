const { ethers } = require('hardhat')
const hre = require('hardhat')

async function main() {
  const factory = await hre.ethers.getContractFactory('AirToken')
  const [owner] = await hre.ethers.getSigners()
  const contract = await factory.deploy()

  await contract.deployed()
  console.log('Contract deployed to: ', contract.address)
  console.log('Contract deployed by (Owner): ', owner.address, '\n')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
