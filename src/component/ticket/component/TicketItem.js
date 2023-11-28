import React from "react";
import { truncateFromMiddle } from "../../../utils";

const TicketItem = ({ data, canisterId }) => {
  // Use destructuring to extract key_val_data from data
  const { key_val_data } = data;
  console.log(key_val_data.LogoData);

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white text-black m-4 p-4">
      <img src={key_val_data.LogoData} alt={key_val_data.name} />
      <object data={key_val_data.LogoData}></object>
      <div className="flex text-black/50 flex-row mt-2 text-xs justify-between items-center">
        <h3>
          Ticket ID : <b className="text-black/80">01</b>
        </h3>
        <h3>
          canister ID :{" "}
          <b className="text-black/80">{truncateFromMiddle(canisterId, 10)} </b>
        </h3>
      </div>
      <h2 className="font-bold text-2xl my-3">{key_val_data.name}</h2>
      <div className="flex flex-row justify-between text-sm items-center">
        <h4 className="text-black/80">Network</h4>
        <h4>
          <b>ICP Network</b>
        </h4>
      </div>
    </div>
  );
};

export default TicketItem;
