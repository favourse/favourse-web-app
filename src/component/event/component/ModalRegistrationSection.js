import React, { useState, useEffect } from "react";
import * as AuthService from "../../../auth/AuthService";
import { useNavigate } from "react-router-dom";
import { idlFactory as dip721IdlFactory } from "../../../service.did";
import { Actor, HttpAgent } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";

import { numberWithCommas } from "../../../utils/utils";
import DeployModal from "./DeployModal";
import FavIcon from "../../../assets/fav-icon.png";

export default function ModalRegistrationSection({ event }) {
  const price = event?.price ? numberWithCommas(event.price) : "0";
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isSuccess, setIsSucces] = useState("minting");
  const [user, setUser] = useState(null);
  const [ticketsLeft, setTicketsLeft] = useState(BigInt(0));

  useEffect(() => {
    const checkIfAuthenticated = async () => {
      const isAuthenticated = await AuthService.isAuthenticated();
      if (isAuthenticated) {
        const principalUserId = await AuthService.getPrincipalId();
        setUser(principalUserId);
      }
    };

    checkIfAuthenticated();
  }, []);

  const popupLogin = (e) => {
    setIsLogin(true);
  };
  const handleLogin = async () => {
    console.log("clicked");
    await AuthService.login(() => {
      // Perform actions after successful login
      window.location.reload(); // or use React Router to redirect
    });
  };

  useEffect(() => {
    const dip721NFTActor = Actor.createActor(dip721IdlFactory, {
      agent: new HttpAgent({
        host:
          event.agentUrl === "https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io"
            ? "https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io"
            : process.env.REACT_APP_LOCAL_NETWORK,
      }), // Adjust the host if necessary
      canisterId: event.canisterId,
    });

    Promise.all([
      dip721NFTActor.totalSupplyDip721(),
      dip721NFTActor.getMaxLimitDip721(),
    ])
      .then(([supply, limit]) => {
        setTicketsLeft(BigInt(limit) - BigInt(supply));
        // console.log(ticketsLeft); // Calculate tickets left
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const principal = Principal.fromText(user);

    const agent = new HttpAgent({
      host:
        event.agentUrl === "https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io"
          ? "https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io"
          : process.env.REACT_APP_LOCAL_NETWORK,
    }); // Change to your network host
    agent.fetchRootKey().catch((err) => {
      console.warn(
        "Unable to fetch root key. Check your network connectivity.",
        err
      );
    });

    const textEncoder = new TextEncoder();
    const dataAsUint8Array = textEncoder.encode(event.name);

    const metadataDesc = [
      {
        purpose: { Rendered: null },
        data: Array.from(dataAsUint8Array), // Convert string to binary blob
        key_val_data: [
          { key: "startDateTime", val: { TextContent: event.startDateTime } },
          { key: "endDateTime", val: { TextContent: event.startDateTime } },
          { key: "location", val: { TextContent: event.location } },
          { key: "LogoData", val: { TextContent: event.logoData } },
          { key: "name", val: { TextContent: event.name } },
        ],
      },
    ];

    try {
      const dip721Actor = Actor.createActor(dip721IdlFactory, {
        agent,
        canisterId: event.canisterId,
      });
      const mintReceipt = await dip721Actor.mintDip721(
        principal, // The recipient's principal ID
        metadataDesc
      );

      // Handle the response from the minting function
      console.log(mintReceipt);
      setIsSucces("success");
      setTimeout(() => {
        navigate("/my-ticket");
      }, 2000);
    } catch (error) {
      if (error instanceof Error && error.name === "CertificateError") {
        console.error("Certificate verification failed. Retrying...");
        // Implement retry logic here
      } else {
        console.error("An unexpected error occurred:", error);
      }
      console.error("Minting failed", error);
      setIsSucces("error");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  return (
    <div className="w-full h-fit bg-zinc-800 rounded-md">
      <div className="border-b-[1px] border-white/10 py-2 px-6 flex flex-row items-center font-semibold text-lg">
        <div className="w-5 mt-[6px] mr-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 40"
            fill="#ffffff"
            version="1.1"
            x="0px"
            y="0px"
            fillRule="evenodd"
            clipRule="evenodd"
            stroke-linejoin="round"
            stroke-miterlimit="2"
          >
            <g transform="matrix(1,0,0,1,-148,-185)">
              <g>
                <g transform="matrix(0.418133,0,0,0.418133,141.842,133.106)">
                  <path d="M49.133,149.622C50.028,148.345 51.49,147.584 53.05,147.584C54.61,147.584 56.072,148.345 56.967,149.622L60.208,154.247L65.609,155.901C67.1,156.357 68.276,157.513 68.758,158.996C69.24,160.48 68.968,162.105 68.03,163.351L64.633,167.863L64.729,173.51C64.755,175.07 64.02,176.545 62.758,177.462C61.496,178.379 59.866,178.622 58.391,178.115L53.05,176.279L47.709,178.115C46.234,178.622 44.604,178.379 43.342,177.462C42.08,176.545 41.345,175.07 41.371,173.51L41.467,167.863L38.07,163.351C37.132,162.105 36.86,160.48 37.342,158.996C37.824,157.513 39,156.357 40.491,155.901L45.892,154.247L49.133,149.622ZM41.891,160.474L45.783,165.643C46.104,166.069 46.273,166.59 46.264,167.123L46.154,173.592L52.272,171.488C52.776,171.315 53.324,171.315 53.828,171.488L59.946,173.592L59.836,167.123C59.827,166.59 59.996,166.069 60.317,165.643L64.209,160.474L58.022,158.58C57.512,158.424 57.069,158.102 56.763,157.666L53.05,152.367L49.337,157.666C49.031,158.102 48.588,158.424 48.078,158.58L41.891,160.474Z" />
                </g>
                <g transform="matrix(1,0,0,0.933333,-2.36753e-11,11.55)">
                  <path d="M177,200.223C175.689,200.223 174.625,201.363 174.625,202.768C174.625,204.172 175.689,205.313 177,205.313C177.552,205.313 178,205.792 178,206.384L178,211.607C178,213.382 176.657,214.821 175,214.821L153,214.821C151.343,214.821 150,213.382 150,211.607L150,206.384C150,205.792 150.448,205.313 151,205.313C152.311,205.313 153.375,204.172 153.375,202.768C153.375,201.363 152.311,200.223 151,200.223C150.448,200.223 150,199.744 150,199.152L150,194.464C150,193.612 150.316,192.794 150.879,192.191C151.441,191.589 152.204,191.25 153,191.25L175,191.25C175.796,191.25 176.559,191.589 177.121,192.191C177.684,192.794 178,193.612 178,194.464L178,199.152C178,199.744 177.552,200.223 177,200.223ZM176,198.204L176,194.464C176,194.18 175.895,193.908 175.707,193.707C175.52,193.506 175.265,193.393 175,193.393L153,193.393C152.735,193.393 152.48,193.506 152.293,193.707C152.105,193.908 152,194.18 152,194.464C152,194.464 152,198.204 152,198.204C153.933,198.689 155.375,200.549 155.375,202.768C155.375,204.986 153.933,206.847 152,207.332L152,211.607C152,212.199 152.448,212.679 153,212.679L175,212.679C175.552,212.679 176,212.199 176,211.607C176,211.607 176,207.332 176,207.332C174.067,206.847 172.625,204.986 172.625,202.768C172.625,200.549 174.067,198.689 176,198.204Z" />
                </g>
              </g>
            </g>
          </svg>
        </div>
        Registration
      </div>
      {ticketsLeft <= 10 ? (
        ticketsLeft < 0 ? (
          <></>
        ) : (
          <div className="px-6 py-3 bg-white/20 mx-1 my-1 rounded-md flex flex-row items-center">
            <>
              <div className="w-10 h-10 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 60"
                  x="0px"
                  y="0px"
                  fill="#ffffff"
                >
                  <g data-name="Livello 2">
                    <g>
                      <rect class="cls-1" />
                      <path d="M24,11.5A13.5,13.5,0,1,1,10.5,25,13.52,13.52,0,0,1,24,11.5M24,10A15,15,0,1,0,39,25,15,15,0,0,0,24,10Z" />
                      <path d="M8.11,15.64a.73.73,0,0,1-.53-.22.74.74,0,0,1,0-1.06l5.89-5.89a.75.75,0,0,1,1.06,1.06L8.64,15.42A.74.74,0,0,1,8.11,15.64Z" />
                      <path d="M11.05,12.7a.79.79,0,0,1-.53-.22L9.09,11.05a.75.75,0,0,1,0-1.06.74.74,0,0,1,1.06,0l1.43,1.43a.74.74,0,0,1,0,1.06A.75.75,0,0,1,11.05,12.7Z" />
                      <path d="M39.89,15.64a.74.74,0,0,1-.53-.22L33.47,9.53a.75.75,0,0,1,1.06-1.06l5.89,5.89a.74.74,0,0,1,0,1.06A.73.73,0,0,1,39.89,15.64Z" />
                      <path d="M37,12.7a.75.75,0,0,1-.53-.22.74.74,0,0,1,0-1.06L37.85,10a.74.74,0,0,1,1.06,0,.75.75,0,0,1,0,1.06l-1.43,1.43A.79.79,0,0,1,37,12.7Z" />
                      <path d="M29.78,31.53a.74.74,0,0,1-.53-.22l-5.78-5.78a.75.75,0,0,1-.22-.53V16.72a.75.75,0,0,1,1.5,0v8l5.56,5.56a.74.74,0,0,1,0,1.06A.71.71,0,0,1,29.78,31.53Z" />
                    </g>
                  </g>
                </svg>
              </div>

              <div>
                <div className="text-md font-semibold">
                  Limited Spots Remaining
                </div>
                <div className="text-xs font-light">
                  Hurry up and register before the event fills up!
                </div>
              </div>
            </>
          </div>
        )
      ) : (
        <></>
      )}

      {/* Ticket Price */}
      {event.isFree ? (
        <div className="py-2 px-6">
          <p className="text-sm mt-2">
            Hello! To join the event, please register below.
          </p>
          {user ? (
            ticketsLeft <= 0 ? (
              <button className="w-full rounded-md bg-black/30 text-white/50 py-[8px] text-sm font-semibold mt-5 mb-2">
                Sold Out
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="w-full rounded-md bg-white text-black py-[8px] text-sm font-semibold mt-5 mb-2"
              >
                {isLoading
                  ? "Mint NFT"
                  : isSuccess === "success"
                  ? "Success Mint NFT"
                  : "Get Ticket"}
              </button>
            )
          ) : ticketsLeft <= 0 ? (
            <button className="w-full rounded-md bg-black/30 text-white/50 py-[8px] text-sm font-semibold mt-5 mb-2">
              Sold Out
            </button>
          ) : (
            <button
              onClick={popupLogin}
              className="w-full rounded-md bg-white text-black py-[8px] text-sm font-semibold mt-5 mb-2"
            >
              Get Ticket
            </button>
          )}
        </div>
      ) : (
        <div className="py-2 px-6">
          <h4 className="text-sm text-white/80">Ticket Price</h4>
          <h1 className="text-2xl font-semibold">${price}</h1>
          <p className="text-sm mt-2">
            The price of this event is ${price}. To join the event, please get
            your ticket below.
          </p>
          {user ? (
            ticketsLeft <= 0 ? (
              <button className="w-full rounded-md bg-black/30 text-white/50 py-[8px] text-sm font-semibold mt-5 mb-2">
                Sold Out
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="w-full rounded-md bg-white text-black py-[8px] text-sm font-semibold mt-5 mb-2"
              >
                {isLoading
                  ? "Mint NFT"
                  : isSuccess === "success"
                  ? "Success Mint NFT"
                  : "Get Ticket"}
              </button>
            )
          ) : ticketsLeft <= 0 ? (
            <button className="w-full rounded-md bg-black/30 text-white/50 py-[8px] text-sm font-semibold mt-5 mb-2">
              Sold Out
            </button>
          ) : (
            <button
              onClick={popupLogin}
              className="w-full rounded-md bg-white text-black py-[8px] text-sm font-semibold mt-5 mb-2"
            >
              Get Ticket
            </button>
          )}
        </div>
      )}
      {isLoading && (
        <DeployModal>
          <div className="mt-4 text-2xl text-center flex flex-col justify-center items-center">
            {isSuccess === "idle" || isSuccess === "minting" ? (
              <img
                className="h-52 w-auto mb-4 infinity-flip "
                src={FavIcon}
                alt="Favourse Logo"
              />
            ) : (
              <></>
            )}
            {isSuccess === "success" && (
              <div className="checkmark-container mb-4">
                <svg
                  className="checkmark"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 52 52"
                >
                  <circle
                    className="checkmark__circle"
                    cx="26"
                    cy="26"
                    r="25"
                    fill="none"
                  />
                  <path
                    className="checkmark__check"
                    fill="none"
                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                  />
                </svg>
              </div>
            )}

            {isSuccess === "error" && (
              <div className="checkmark-container mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  viewBox="0 0 333.33 416.66249999999997"
                  x="0px"
                  y="0px"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  className=""
                >
                  <defs>
                    <style type="text/css"></style>
                  </defs>
                  <g>
                    <path
                      class="fil0"
                      d="M79.81 3.33l173.7 0c2.69,0 5.11,1.11 6.85,2.89l66.83 66.83c1.87,1.87 2.8,4.32 2.8,6.77l0 173.7c0,2.69 -1.11,5.11 -2.89,6.85l-66.83 66.83c-1.87,1.87 -4.32,2.8 -6.77,2.8l-173.7 0c-2.69,0 -5.11,-1.11 -6.85,-2.89l-66.83 -66.83c-1.87,-1.87 -2.8,-4.32 -2.8,-6.77l-0 -173.7c0,-2.69 1.11,-5.11 2.89,-6.85l66.83 -66.83c1.87,-1.87 4.32,-2.8 6.77,-2.8zm7.11 91.44l7.85 -7.85c6.35,-6.35 14.7,-9.52 23.05,-9.52 8.35,0 16.7,3.17 23.05,9.52l25.8 25.79 25.8 -25.79c6.35,-6.35 14.7,-9.52 23.05,-9.52 8.35,0 16.7,3.17 23.05,9.52l7.85 7.85c6.35,6.35 9.52,14.7 9.52,23.05 0,8.35 -3.17,16.7 -9.52,23.05l-25.79 25.8 25.79 25.8c6.35,6.35 9.52,14.7 9.52,23.05 0,8.35 -3.17,16.7 -9.52,23.05l-7.85 7.85c-6.35,6.35 -14.7,9.52 -23.05,9.52 -8.35,0 -16.7,-3.17 -23.05,-9.52l-25.8 -25.79 -25.8 25.79c-6.35,6.35 -14.7,9.52 -23.05,9.52 -8.34,0 -16.7,-3.17 -23.05,-9.52l-7.85 -7.85c-6.35,-6.35 -9.52,-14.7 -9.52,-23.05 0,-8.35 3.17,-16.7 9.52,-23.05l25.79 -25.8 -25.79 -25.8c-6.35,-6.35 -9.52,-14.7 -9.52,-23.05 0,-8.35 3.17,-16.7 9.52,-23.05zm21.38 5.69l-7.85 7.85c-2.61,2.61 -3.91,6.06 -3.91,9.51 0,3.46 1.31,6.91 3.91,9.52l32.56 32.56c3.74,3.74 3.74,9.8 0,13.54l-32.56 32.56c-2.61,2.61 -3.91,6.06 -3.91,9.52 0,3.46 1.31,6.91 3.91,9.51l7.85 7.85c2.61,2.61 6.06,3.91 9.51,3.91 3.46,0 6.91,-1.31 9.52,-3.91l32.56 -32.56c3.74,-3.74 9.8,-3.74 13.54,0l32.56 32.56c2.61,2.61 6.06,3.91 9.52,3.91 3.46,0 6.91,-1.31 9.51,-3.91l7.85 -7.85c2.61,-2.61 3.91,-6.06 3.91,-9.51 0,-3.46 -1.31,-6.91 -3.91,-9.52l-32.56 -32.56c-3.74,-3.74 -3.74,-9.8 0,-13.54l32.56 -32.56c2.61,-2.61 3.91,-6.06 3.91,-9.52 0,-3.46 -1.31,-6.91 -3.91,-9.51l-7.85 -7.85c-2.61,-2.61 -6.06,-3.91 -9.51,-3.91 -3.46,0 -6.91,1.31 -9.52,3.91l-32.56 32.56c-3.74,3.74 -9.8,3.74 -13.54,0l-32.56 -32.56c-2.61,-2.61 -6.06,-3.91 -9.52,-3.91 -3.45,0 -6.91,1.31 -9.51,3.91zm141.24 -77.99l-165.77 0 -61.31 61.31 0 165.77 61.31 61.31 165.77 0 61.31 -61.31 0 -165.77 -61.31 -61.31z"
                    />
                  </g>
                </svg>
              </div>
            )}
            {isSuccess === "idle" && <h1>Start the Engine! 🚀</h1>}
            {isSuccess === "minting" && (
              <h1 className="text-black">Minting NFT Ticket</h1>
            )}
            {isSuccess === "success" && (
              <h1 className="text-black font-semibold">Successful! 🎉</h1>
            )}
            {isSuccess === "error" && (
              <h1 className="text-black font-semibold">Failed!</h1>
            )}
          </div>
        </DeployModal>
      )}
      {isLogin && (
        <DeployModal>
          <div className="mt-4  text-center flex flex-col text-black justify-center items-center">
            <h1 className="text-7xl font-semibold mb-1">Upps</h1>
            <h2 className="text-xl my-3">Please Login First!</h2>
            <a
              onClick={handleLogin}
              className="rounded-lg bg-violet-800 text-sm text-white px-3 py-1 cursor-pointer"
            >
              Login Now
            </a>
            {/* <a
              onClick={setIsLogin(false)}
              className="text-black/20 hover:text-black/70 transition-all cursor-pointer mt-7"
            >
              Close
            </a> */}
          </div>
        </DeployModal>
      )}
    </div>
  );
}
