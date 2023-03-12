const { ethers } = require('hardhat')
const hre = require('hardhat')

async function main() {
  // Define a list of wallets to airdrop Tokens
  const airdropAddresses = []

  const amount = ethers.utils.parseEther('10')

  const factory = await hre.ethers.getContractFactory('AirToken')
  const [owner] = await hre.ethers.getSigners()
  const others = await hre.ethers.getSigners()
  const contract = await factory.deploy()

  await contract.deployed()
  console.log('Contract deployed to: ', contract.address)
  console.log('Contract deployed by (Owner): ', owner.address, '\n')

  //   Add the addresses
  for (let j = 0; j < others.length; j++) {
    await contract.addWallet(others[j].address)
    airdropAddresses.push(others[j].address)
  }

  const tx = await contract.airdrop(airdropAddresses, amount)
  await tx.wait()
  console.log('Tokens airdropped successfully!')

  console.log('\nCurrent Token balances:')
  for (let i = 0; i < airdropAddresses.length; i++) {
    let bal = await contract.balanceOf(airdropAddresses[i])
    console.log(`${i + 1}. ${airdropAddresses[i]}: ${bal}`)
  }

  const allCaondidates = await contract.getAllCandidates()
  console.log('Candidates: ', allCaondidates)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
