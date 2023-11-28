import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import * as AuthService from "../auth/AuthService";

import HeaderSection from "../component/HeaderSection";
import TicketNFTComponent from "../component/ticket/TicketNFTComponent";
import ListOfNFTTickets from "../component/ticket/ListOfNFTTickets";
import { truncateFromMiddle } from "../utils";
import { initJuno, listDocs } from "@junobuild/core";

export default function MyTicketNFT() {
  const [userPrincipalId, setUserPrincipalId] = useState(null);
  const [events, setEvents] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      await initJuno({
        satelliteId: "4knjt-tiaaa-aaaal-adenq-cai",
      });

      setReady(true);
      console.log(ready);
    })();
  }, []);

  useEffect(() => {
    if (!ready) {
      return;
    }
    const fetchAllDocuments = async () => {
      try {
        const eventList = await listDocs({
          collection: "favourse99",
          filter: {
            order: {
              desc: true,
              field: "startDateTime",
            },
          },
        });

        if (eventList) {
          setEvents(eventList.items);
        } else {
          throw new Error("Document not found");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
        setEvents(null);
      }
    };

    fetchAllDocuments();
  }, [ready]);

  useEffect(() => {
    const checkIfAuthenticated = async () => {
      const isAuthenticated = await AuthService.isAuthenticated();
      if (isAuthenticated) {
        const principalUserId = await AuthService.getPrincipalId();
        setUserPrincipalId(principalUserId);
      } else {
        console.error("No principal ID found");
      }
    };

    checkIfAuthenticated();
  }, []);

  const handleLogin = async () => {
    console.log("clicked");
    await AuthService.login(() => {
      // Perform actions after successful login
      window.location.reload(); // or use React Router to redirect
    });
  };

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
        <title>My NFT Ticket | Favourse</title>
      </Helmet>
      <HeaderSection />
      {userPrincipalId ? (
        <div className="mt-4 flex flex-col items-center p-4">
          <>
            <h1 className="text-center text-3xl text-white md:text-4xl font-semibold">
              My NFT Ticket
            </h1>
            <div className="w-full md:w-4/5 mt-3 p-4 md:p-10 rounded-sm grid grid-cols-1 md:grid-cols-1 gap-4 justify-center items-center">
              {/* {user ? <div>tes</div> : <TicketNFTComponent principalId={user} />} */}
              {/* <TicketNFTComponent /> */}
              {events ? (
                events.map((event, index) => (
                  <div key={event.data.canisterId}>
                    {/* Render a paragraph element: */}
                    <p className="text-white" key={index}>
                      {event.data.canisterId}
                    </p>
                    {/* Uncomment and return your ListOfNFTTickets component if needed */}
                    <ListOfNFTTickets
                      key={event.data.canisterId}
                      userPrincipal={userPrincipalId}
                      canisterId={event.data.canisterId}
                    />
                  </div>
                ))
              ) : (
                <p className="text-white">Loading</p>
              )}
            </div>
          </>
        </div>
      ) : (
        <div className="p-4 md:p-52 md:pt-52 pt-52">
          <h1 className="text-7xl text-center text-white md:text-9xl font-bold">
            Upps..
          </h1>
          <p></p>
          <p className="text-center text-md mt-3 font-thin md:text-2xl text-white">
            Please{" "}
            <span
              className="font-normal hover:underline cursor-pointer"
              onClick={handleLogin}
            >
              log in
            </span>{" "}
            to access this feature.
          </p>
        </div>
      )}
    </div>
  );
}
