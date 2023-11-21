import React from "react";
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../service.did";
import MintNFTForm from "./component/MintNFTForm"; // Adjust the import path as necessary

const agent = new HttpAgent({
  host: process.env.REACT_APP_LOCAL_NETWORK,
});

const myCanister = Actor.createActor(idlFactory, {
  agent,
  canisterId: process.env.REACT_APP_CANISTER_ID,
});

const mintNFT = async (to, metadata) => {
  try {
    const result = await myCanister.mintDip721(to, metadata);
    return result;
  } catch (error) {
    console.error("Failed to mint NFT:", error);
  }
};

const MintNFTTickets = () => {
  return (
    <div>
      <h1>Mint your NFT</h1>
      <MintNFTForm mintNFT={mintNFT} />
    </div>
  );
};

export default MintNFTTickets;
