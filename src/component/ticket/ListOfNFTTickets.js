import React, { useEffect, useState } from "react";
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../service.did";
import { Principal } from "@dfinity/principal";
import TicketItem from "./component/TicketItem";

// const dip721NFTCanisterId = process.env.REACT_APP_CANISTER_ID;

const ListOfNFTTickets = ({ userPrincipal, canisterId, isMain }) => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  const agent = new HttpAgent({
    host:
      isMain === "https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io"
        ? "https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io"
        : process.env.REACT_APP_LOCAL_NETWORK,
  });

  useEffect(() => {
    const fetchNFTs = async () => {
      if (!userPrincipal) {
        console.error("Principal is null or undefined");
        setLoading(false);
        return;
      }
      try {
        const principal = Principal.fromText(userPrincipal);
        const dip721NFTActor = await Actor.createActor(idlFactory, {
          agent,
          canisterId: canisterId,
        });

        // Call the `getTokenIdsForUserDip721` method from the smart contract
        const tokenIds = await dip721NFTActor.getTokenIdsForUserDip721(
          principal
        );

        // Fetch metadata for each token ID
        const metadataPromises = Array.from(tokenIds).map((tokenId) => {
          // tokenId is already a BigInt, no need to convert
          return dip721NFTActor.getMetadataDip721(tokenId);
        });

        // Await the resolution of the metadataPromises
        const metadataResults = await Promise.allSettled(metadataPromises);

        // After getting metadataResults from Promise.allSettled
        const successfulMetadata = metadataResults
          .filter((result) => result.status === "fulfilled" && result.value.Ok)
          .map((result) => {
            // Assuming the ID is in the first element of the Ok array
            const item = result.value.Ok[0];
            const keyValueData = {};

            item.key_val_data.forEach((kv) => {
              keyValueData[kv.key] = kv.val.TextContent;
            });

            // Extract the ID from the Uint8Array, assuming it's a string encoded in UTF-8
            const decoder = new TextDecoder();
            const id = decoder.decode(new Uint8Array(item.data));

            return {
              ...item,
              id, // Add the ID here
              key_val_data: keyValueData, // This will replace the key_val_data array with an object
            };
          });

        // Now, set the state with this data
        setNfts(successfulMetadata);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [userPrincipal]);

  if (loading) {
    return <div>Loading your NFTs...</div>;
  }

  return (
    <div className="flex flex-wrap justify-center">
      {nfts.map((nft, index) => {
        return <TicketItem key={index} data={nft} canisterId={canisterId} />;
      })}
    </div>
  );
};

export default ListOfNFTTickets;
