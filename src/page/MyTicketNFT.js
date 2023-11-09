import React from "react";
import { Helmet } from "react-helmet";

import HeaderSection from "../component/HeaderSection";
import TicketNFTComponent from "../component/ticket/TicketNFTComponent";

export default function MyTicketNFT() {
  return (
    <div className="h-fit min-h-screen pb-52 bg-gradient-to-r from-violet-900 via-violet-950 to-black">
      <div
        className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <Helmet>
        <title>My Ticket NFT | Favourse</title>
      </Helmet>
      <HeaderSection />

      <div className="mt-4 flex flex-col items-center p-4">
        <h1 className="text-center text-3xl text-white md:text-4xl font-semibold">
          My Ticket NFT
        </h1>
        <div className="w-full md:w-3/5 mt-3 p-4 md:p-10 rounded-sm grid grid-cols-1 md:grid-cols-1 gap-4 justify-center items-center">
          {/* {user ? <div>tes</div> : <TicketNFTComponent principalId={user} />} */}
          <TicketNFTComponent />
        </div>
      </div>
    </div>
  );
}
