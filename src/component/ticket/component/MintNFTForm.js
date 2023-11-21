import React, { useState, useEffect } from "react";
import { Principal } from "@dfinity/principal";
import { getPrincipalId } from "../../../auth/AuthService";

const MintNFTForm = ({ mintNFT }) => {
  const [userPrincipalId, setUserPrincipalId] = useState("");
  //   const [eventName, setEventName] = useState("");
  //   const [description, setDescription] = useState("");
  //   const [startDate, setStartDate] = useState("");
  //   const [endDate, setEndDate] = useState("");
  //   const [location, setLocation] = useState("");
  //   const [capacity, setCapacity] = useState("");
  //   const [price, setPrice] = useState("");

  useEffect(() => {
    const fetchPrincipal = async () => {
      const principalId = await getPrincipalId();
      if (principalId) {
        setUserPrincipalId(principalId);
        console.log(userPrincipalId);
      } else {
        console.error("No principal ID found");
      }
    };

    fetchPrincipal();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const encoder = new TextEncoder();
    const dataBlob = encoder.encode("hello");

    // Construct the key_val_data with the correct variant structure
    const key_val_data = [
      { key: "description", val: { TextContent: "hai test" } },
      { key: "tag", val: { TextContent: "Ticket" } }, // This looks like a static value
      { key: "contentType", val: { TextContent: "text/plain" } }, // This looks like a static value
      { key: "locationType", val: { Nat8Content: 4 } }, // The number 4 should match the location type expected by your backend
      // Include additional fields as required by your application
    ];

    // The metadata should be an array of records based on the terminal command structure
    const metadata = [
      {
        purpose: { Rendered: null }, // or Preview, depending on your use case
        data: dataBlob,
        key_val_data: key_val_data,
      },
    ];

    // Convert to principal
    const principal = Principal.fromText(userPrincipalId);

    try {
      // Call the mint function with the properly structured metadata
      const result = await mintNFT(principal, metadata);
      console.log(result);
    } catch (error) {
      console.error("Error minting NFT:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <input
        type="text"
        onChange={(e) => setEventName(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg w-full"
        placeholder="Event Name"
      />
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg w-full"
        placeholder="Description"
      />
      <input
        type="text"
        onChange={(e) => setStartDate(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg w-full"
        placeholder="Start Date"
      />
      <input
        type="text"
        onChange={(e) => setEndDate(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg w-full"
        placeholder="End Date"
      />
      <input
        type="text"
        onChange={(e) => setLocation(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg w-full"
        placeholder="Location"
      />
      <input
        type="number"
        onChange={(e) => setCapacity(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg w-full"
        placeholder="Capacity"
      />
      <input
        type="number"
        onChange={(e) => setPrice(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg w-full"
        placeholder="Price"
      /> */}
      <button type="submit">Mint NFT</button>
    </form>
  );
};

export default MintNFTForm;
