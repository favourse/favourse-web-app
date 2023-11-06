import WalletConnectProvider from "@web3-react/walletconnect";
import { useState } from "react";
import Web3Modal from "web3modal";
import { truncateFromMiddle } from "../../utils/utils";

// import { ethers } from "ethers";
const ethers = require("ethers");
// const BigNumber = require("ethers");

function ConnectButton() {
  const [connected, setConnected] = useState(false);
  const [connectedAccnt, setConAcnt] = useState("");
  const [data, setdata] = useState({
    address: "",
    Balance: null,
  });

  // Button handler button for handling a
  // request event for metamask
  const btnhandler = () => {
    // Asking if metamask is already present or not
    if (window.ethereum) {
      // res[0] for fetching a first wallet
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => accountChangeHandler(res[0]));
    } else {
      alert("install metamask extension!!");
    }
  };

  // getbalance function for getting a balance in
  // a right format with help of ethers
  const getbalance = (address) => {
    // Requesting balance method
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [address, "latest"],
      })
      .then((balance) => {
        // Setting balance
        setdata({
          Balance: ethers.utils.formatEther(balance),
        });
      });
  };

  // Function for getting handling all events
  const accountChangeHandler = (account) => {
    // Setting an address data
    setdata({
      address: account,
    });

    // Setting a balance
    getbalance(account);
  };
  // const connectToWallet = async () => {
  //   //ProviderOptions to give give different wallet options.
  //   const providerOptions = {
  //     //For metamask wallet
  //     injected: {
  //       display: {
  //         name: "MetaMask",
  //         description: "Connect with metamask from Browser",
  //       },
  //     },
  //     //For walletconnect with mobile qr code scan
  //     walletconnect: {
  //       display: {
  //         name: "WalletConnect",
  //         description: "Scan QR code with mobile wallet",
  //       },
  //       package: WalletConnectProvider,
  //       options: {
  //         rpc: {
  //           //Provide chain id, network rpc url
  //           5: "https://goerli.infura.io/v3/",
  //         },
  //       },
  //     },
  //   };

  //   const web3ModalConnect = new Web3Modal({
  //     cacheProvider: false, // optional
  //     providerOptions, // required
  //     theme: "dark",
  //   });
  //   // const ethers = require("ethers");
  //   const instance = await web3ModalConnect.connect(); // To connect with selected provider from browser
  //   //Optional for now
  //   const providerInstance = new ethers.providers.Web3Provider(instance);
  //   const signer = providerInstance.getSigner(); //Get signer object
  //   const currentAccount = await signer.getAddress(); //Get connected account address

  //   await walletEventHandler(instance);
  //   setConAcnt(currentAccount);
  //   setConnected(true);
  // };
  // const walletEventHandler = async (instance) => {
  //   await instance.on("accountsChanged", () => {
  //     // Your implementation here...
  //     //   alert("account changed");
  //     console.log("account changed");
  //     setConnected(false);
  //   });
  //   await instance.on("disconnect", () => {
  //     // Your implementation here...
  //     //   alert("disconnected");
  //     console.log("disconnected");
  //     setConnected(false);
  //   });
  //   await instance.on("chainChanged", () => {
  //     // Your implementation here...
  //     console.log("chain changed");

  //     //   alert("chain changed");
  //     setConnected(false);
  //   });
  // };
  if (data.address == "") {
    return (
      //   <div className="App">
      //     <div>
      //       <button onClick={connectToWallet}> Connect Now</button>
      //     </div>
      //   </div>
      <div className="hidden lg:flex items-center lg:flex-1 lg:justify-end">
        <a
          onClick={btnhandler}
          className="z-20 text-sm flex text-white  duration-200 hover:shadow-lg shadow-white bg-violet-600/[.6] hover:bg-violet-600 rounded-lg px-4 py-2 items-center flex-row font-semibold leading-6 "
        >
          Connect
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="#ffffff"
            className="w-5 h-5 ml-1 "
          >
            <path
              fillRule="evenodd"
              d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M6 10a.75.75 0 01.75-.75h9.546l-1.048-.943a.75.75 0 111.004-1.114l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 11-1.004-1.114l1.048-.943H6.75A.75.75 0 016 10z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
    );
  } else {
    return (
      <div className="hidden lg:flex items-center lg:flex-1 lg:justify-end">
        <a className="z-20 text-sm flex text-white  duration-200 hover:shadow-lg shadow-white bg-violet-600/[.6] hover:bg-violet-600 rounded-lg px-4 py-2 items-center flex-row font-semibold leading-6 ">
          {truncateFromMiddle(data.address, 10)}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="#ffffff"
            className="w-5 h-5 ml-1 "
          >
            <path
              fillRule="evenodd"
              d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M6 10a.75.75 0 01.75-.75h9.546l-1.048-.943a.75.75 0 111.004-1.114l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 11-1.004-1.114l1.048-.943H6.75A.75.75 0 016 10z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
      //   <div className="text-white">
      //     <div>
      //       <p>You are connected with {connectedAccnt}</p>
      //     </div>
      //   </div>
    );
  }
}
export default ConnectButton;
