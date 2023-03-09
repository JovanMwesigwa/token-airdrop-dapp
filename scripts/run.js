const { ethers } = require('hardhat')
const hre = require('hardhat')

async function main() {
  // Define a list of wallets to airdrop Tokens
  const airdropAddresses = [
    '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    '0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc',
    '0x90f79bf6eb2c4f870365e785982e1f101e93b906',
    '0x15d34aaf54267db7d7c367839aaf71a00a2c6a65',
    '0x9965507d1a55bcc2695c58ba16fb37d819b0a4dc',
  ]

  const amount = ethers.utils.parseEther('10')

  const factory = await hre.ethers.getContractFactory('AirToken')
  const [owner] = await hre.ethers.getSigners()
  const contract = await factory.deploy()

  await contract.deployed()
  console.log('Contract deployed to: ', contract.address)
  console.log('Contract deployed by (Owner): ', owner.address, '\n')

  //   Add the addresses
  for (let j = 0; j < airdropAddresses.length; j++)
    await contract.addWallet(airdropAddresses[j])

  const tx = await contract.airdrop(airdropAddresses, amount)
  await tx.wait()
  console.log('Tokens airdropped successfully!')

  console.log('\nCurrent Token balances:')
  for (let i = 0; i < airdropAddresses.length; i++) {
    let bal = await contract.balanceOf(airdropAddresses[i])
    console.log(`${i + 1}. ${airdropAddresses[i]}: ${bal}`)
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
