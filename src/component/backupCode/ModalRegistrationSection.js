import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { numberWithCommas } from "../../../utils/utils";
import { API_URL } from "../../../utils";
import axios from "axios";

export default function ModalRegistrationSection({ event }) {
  const price = event?.price ? numberWithCommas(event.price) : "0";
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [isSuccess, setIsSucces] = useState("idle");

  const handleSubmit = async (e) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsSucces("deploying");
    }, 1000);
    e.preventDefault();
    try {
      const mintData = {
        principalId: event.principalId,
        canisterName: event.canisterName,
        logoData: event.logoData,
        name: event.name,
        symbol: event.symbol,
        maxLimit: event.maxLimit,
        location: event.location,
        startDateTime: event.startDateTime,
        endDateData: event.endDateTime,
        isInPerson: event.isInPerson,
        isFree: event.isFree,
        price: event.price,
      };
      const response = await axios.post(API_URL + "/mint-nft", mintData);

      setIsSucces("success");
      setTimeout(() => {
        navigate(`/${response.data.canisterId}`); // Redirect to the new page after 2 seconds
      }, 2000);
    } catch (error) {
      // setDeploymentResult(error.message);
      console.log(error.message);
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
      <div className="px-6 py-3 bg-white/20 mx-1 my-1 rounded-md flex flex-row items-center">
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
          <div className="text-md font-semibold">Limited Spots Remaining</div>
          <div className="text-xs font-light">
            Hurry up and register before the event fills up!
          </div>
        </div>
      </div>

      {/* Ticket Price */}
      {event.isFree ? (
        <div className="py-2 px-6">
          <p className="text-sm mt-2">
            Hello! To join the event, please register below.
          </p>
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
        </div>
      ) : (
        <div className="py-2 px-6">
          <h4 className="text-sm text-white/80">Ticket Price</h4>
          <h1 className="text-2xl font-semibold">${price}</h1>
          <p className="text-sm mt-2">
            The price of this event is ${price}. To join the event, please get
            your ticket below.
          </p>
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
        </div>
      )}
    </div>
  );
}
