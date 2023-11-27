import React from "react";
import { truncateFromMiddle } from "../../../utils";

const TicketItem = ({ data }) => {
  // Use destructuring to extract key_val_data from data
  const { key_val_data } = data;

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white text-black m-4 p-4">
      <img src={key_val_data.logoData} className="rounded-lg" />
      <div className="flex flex-row justify-between items-center">
        <h3>Token ID : {key_val_data.tokenId}</h3>
        <h3>
          canister ID :{(truncateFromMiddle(key_val_data.canisterId), 10)}
        </h3>
      </div>
      <h2 className="font-bold text-xl mb-2">{key_val_data.name}</h2>
      <div className="flex flex-row justify-between items-center">
        <h4 className="text-black/50">Network</h4>
        <h4>ICP Network</h4>
      </div>
    </div>
  );
};

export default TicketItem;
