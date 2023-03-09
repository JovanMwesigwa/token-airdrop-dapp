import { ConnectWallet } from '@thirdweb-dev/react'
import { useAddress } from '@thirdweb-dev/react'

export default function Home() {
  const address = useAddress()
  return (
    <div className="w-full h-screen flex-1 flex-col bg-bg-primary">
      <nav className="w-full flex px-16 flex-row items-center justify-between h-16">
        <div className="flex flex-1">
          <h2 className="text-lg text-gray-200">AirDropper</h2>
        </div>
        <ul>
          <li>
            <ConnectWallet />
          </li>
        </ul>
      </nav>

      <main className="flex flex-1 flex-col items-center justify-center p-6 text-neutral-200">
        <h1 className="text-4xl font-medium text-neutral-50 ">
          Sign-up for your AirDrop
        </h1>

        <div className="p-6 flex flex-col bg-white shadow-lg my-6 w-1/2 h-1/2 rounded-md">
          <div className="flex flex-row w-full">
            <div className="flex flex-1 items-center text-neutral-600 text-lg border-[0.5px] rounded-md px-4 mr-2">
              {address ? address : 'wallet not connected'}
            </div>
            <button className="bg-blue-500 text-white p-2 px-6 rounded-md font-medium">
              {address ? 'ADD WALLET' : 'CONNECT'}
            </button>
          </div>

          <h3 className="text-sm text-neutral-600 my-4">
            ✅ Tutorial, Add your current account and press airdrop to get the
            token!
          </h3>

          <div className="flex w-full flex-col border-[0.5px] rounded-t-md  rounded-b-md">
            <div className="flex flex-row w-full p-4 items-center rounded-t-md  justify-between bg-purple-700 text-white">
              <h1>Active Addresses</h1>
            </div>
            <h2 className="mx-3 my-2 text-neutral-600">
              0xD2c2591162162Fc57a40bc8a3C9cff0E6dFc9824
            </h2>
            <h2 className="mx-3 my-2 text-neutral-600">
              0xD2c2591162162Fc57a40bc8a3C9cff0E6dFc9824
            </h2>
            <h2 className="mx-3 my-2 text-neutral-600">
              0xD2c2591162162Fc57a40bc8a3C9cff0E6dFc9824
            </h2>
          </div>
        </div>
      </main>
    </div>
  )
}
