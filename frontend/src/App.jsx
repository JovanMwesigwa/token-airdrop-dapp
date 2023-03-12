import { useMoralis, useWeb3Contract } from 'react-moralis'
import { Avatar, ConnectButton } from 'web3uikit'
import { ethers } from 'ethers'
import { ADMIN_ADDRESS, ABI, CONTRACT_ADDRESS } from '../constants'
import { useEffect, useState } from 'react'

export default function Home() {
  const { isWeb3Enabled, Moralis, account } = useMoralis()
  const [candidates, setCandidates] = useState()

  useEffect(() => {
    if (isWeb3Enabled) {
      populateData()
    }
  }, [isWeb3Enabled, account])

  const populateData = async () => {
    try {
      const result = await getAllCandidates()
      setCandidates(result)
    } catch (error) {
      console.log(error.response)
    }
  }

  const addUser = async () => {
    try {
      const res = await addWallet()
      console.log(res)
    } catch (error) {
      console.log(error.response)
    }
  }

  const airDropTokens = async () => {
    const res = await airdrop()
    console.log(res)
    // try {
    // } catch (error) {
    //   console.log(error.response)
    // }
  }

  const { runContractFunction: getAllCandidates } = useWeb3Contract({
    abi: ABI,
    contractAddress: CONTRACT_ADDRESS,
    functionName: 'getAllCandidates',
    params: {},
  })

  const { runContractFunction: airdrop } = useWeb3Contract({
    abi: ABI,
    contractAddress: CONTRACT_ADDRESS,
    functionName: 'airdrop',
    params: {
      recipients: candidates,
      amount: ethers.utils.parseEther('10'),
    },
  })

  const { runContractFunction: addWallet } = useWeb3Contract({
    abi: ABI,
    contractAddress: CONTRACT_ADDRESS,
    functionName: 'addWallet',
    params: { userAddress: account },
  })

  return (
    <div className="flex-col flex-1 w-full h-screen bg-bg-primary">
      <nav className="flex flex-row items-center justify-between w-full h-16 px-16">
        <div className="flex flex-1">
          <h2 className="text-lg text-gray-200">AirDropper</h2>
        </div>
        <ul>
          <li>
            <ConnectButton moralisAuth={false} />
          </li>
        </ul>
      </nav>

      <main className="flex flex-col items-center justify-center flex-1 p-6 text-neutral-200">
        <h1 className="text-4xl font-medium text-neutral-50 ">
          Sign-up for your AirDrop
        </h1>

        <div className="flex flex-col w-1/2 p-6 my-6 bg-white rounded-md shadow-lg h-1/2">
          <div className="flex flex-row w-full">
            <div className="flex flex-1 items-center text-neutral-600 text-lg border-[0.5px] rounded-md px-4 mr-2">
              {account ? account : 'wallet not connected'}
            </div>
            <button
              onClick={addUser}
              className="p-2 px-6 font-medium text-white bg-blue-500 rounded-md"
            >
              {account ? 'ADD WALLET' : 'CONNECT'}
            </button>
          </div>

          <h3 className="my-4 text-sm text-neutral-600">
            ✅ Tutorial, Add your current account and press airdrop to get the
            token!
          </h3>

          <div className="flex w-full flex-col border-[0.5px] rounded-t-md  rounded-b-md">
            <div className="flex flex-row items-center justify-between w-full p-4 text-white bg-purple-700 rounded-t-md">
              <h1>Active Addresses</h1>
            </div>
            {candidates &&
              candidates.map((item) => (
                <h2 className="mx-3 my-2 text-neutral-600">{item}</h2>
              ))}
          </div>
        </div>
        {account === ADMIN_ADDRESS && (
          <button
            onClick={airDropTokens}
            className="bg-red-600 rounded-md p-2 px-4"
          >
            Air Drop
          </button>
        )}
      </main>
    </div>
  )
}
