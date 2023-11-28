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
  // const [response, setResponse] = useState(null);
  // const [userPrincipalId, setUserPrincipalId] = useState(null);

  useEffect(() => {
    const fetchPrincipal = async () => {
      const principalId = await getPrincipalId();
      if (principalId) {
        getBalanceOfDip721(principalId);
        // setUserPrincipalId(principalId);
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

  return (
    <div className="text-white">
      <p>Total Tickets: {balance}</p>
    </div>
  );
};

export default TicketNFTComponent;
