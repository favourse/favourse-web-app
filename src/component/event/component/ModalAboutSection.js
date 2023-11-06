import React from "react";

export default function ModalAboutSection({ event }) {
  return (
    <div className="w-full h-fit bg-zinc-800 rounded-md">
      <div className="border-b-[1px] border-white/10 py-2 px-6 flex flex-row items-center  font-semibold text-lg">
        <div className="w-4 mt-[5px] mr-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            viewBox="0 0 100 125"
            fill="#ffffff"
            x="0px"
            y="0px"
          >
            <title>30</title>
            <path d="M60.47778,27.83966A4.66467,4.66467,0,1,1,55.813,23.175,4.66473,4.66473,0,0,1,60.47778,27.83966Zm-10.542,37.7298,6.438-24.028c1.19141-4.44537-5.63477-6.28064-10.04895-4.147a17.1497,17.1497,0,0,0-6.80261,5.93622c2.77417-1.21777,8.96753-3.97357,6.71533,4.43127l-6.438,24.02741c-1.19141,4.44537,5.63477,6.28064,10.04895,4.147a17.14963,17.14963,0,0,0,6.80261-5.93567C53.877,71.21851,47.68359,73.9743,49.93579,65.56946ZM95,14.40771V85.59229A9.41786,9.41786,0,0,1,85.59277,95H14.40723A9.41786,9.41786,0,0,1,5,85.59229V14.40771A9.41786,9.41786,0,0,1,14.40723,5H85.59277A9.41786,9.41786,0,0,1,95,14.40771Zm-5,0A4.41292,4.41292,0,0,0,85.59277,10H14.40723A4.41292,4.41292,0,0,0,10,14.40771V85.59229A4.41292,4.41292,0,0,0,14.40723,90H85.59277A4.41292,4.41292,0,0,0,90,85.59229Z" />
          </svg>
        </div>
        About Event
      </div>
      <div className="px-6 py-3 mx-1 my-1 rounded-md ">
        <p className="text-sm">{event.description}</p>
      </div>
    </div>
  );
}
