import React, { useState, useEffect } from "react";
import { Actor, HttpAgent } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { getPrincipalId } from "../../auth/AuthService";
import { idlFactory } from "../../service.did";

const agent = new HttpAgent({
  host: process.env.REACT_APP_LOCAL_NETWORK,
});

const myCanisterActor = Actor.createActor(idlFactory, {
  agent,
  canisterId: process.env.REACT_APP_CANISTER_ID,
});

const TicketNFTComponent = () => {
  const [balance, setBalance] = useState("0");
  const [response, setResponse] = useState(null);
  const [userPrincipalId, setUserPrincipalId] = useState(null);

  useEffect(() => {
    const fetchPrincipal = async () => {
      const principalId = await getPrincipalId();
      if (principalId) {
        getBalanceOfDip721(principalId);
        setUserPrincipalId(principalId);
        // console.log(principalId);
      } else {
        console.error("No principal ID found");
      }
    };

    fetchPrincipal();
  }, []);

  // Function to get data from the canister
  const getBalanceOfDip721 = async (userPrincipal) => {
    try {
      // Ensure that you are passing a Principal object to the actor method
      const principal = Principal.fromText(userPrincipal);
      const balance = await myCanisterActor.balanceOfDip721(principal);
      setBalance(balance.toString());
    } catch (error) {
      console.error("Error getting balance:", error);
    }
  };

  // Function to post data to the canister
  const safeTransferFromDip721 = async (
    fromPrincipal,
    toPrincipal,
    tokenId
  ) => {
    try {
      const receipt = await myCanisterActor.safeTransferFromDip721(
        fromPrincipal,
        toPrincipal,
        tokenId
      );
      setResponse(receipt);
    } catch (error) {
      console.error("Error transferring NFT:", error);
    }
  };

  // Event handlers that call the above functions
  const handleGetBalance = () => {
    // You would replace 'user-principal-id' with the actual principal ID
    if (!userPrincipalId) {
      console.log("Login First!");
      return;
    }
    getBalanceOfDip721(userPrincipalId);
  };

  const handleTransfer = () => {
    // You would replace these with actual principal IDs and token ID
    safeTransferFromDip721(
      "5ib3s-r5a77-exfkc-43egg-bcvjp-ovimv-xzffi-gjepj-ggama-akpk2-hqe",
      "to3s7r-5yogk-oy6kx-mzw6b-a4g3r-4weat-klypp-kzcsa-fcjqy-p5drx-vae",
      "6"
    );
  };

  return (
    <div className="text-white">
      <h1>Interact with Local Canister</h1>
      <button onClick={handleGetBalance}>Get Balance</button>
      <p>Balance: {balance}</p>
      <button onClick={handleTransfer}>Transfer NFT</button>
      <p>Response: {JSON.stringify(response)}</p>
    </div>
  );
};

export default TicketNFTComponent;
