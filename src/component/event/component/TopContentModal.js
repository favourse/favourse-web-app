import React from "react";
import Moment from "moment";

export default function TopContentModal({ event }) {
  return (
    <div className="w-full h-fit p-2 bg-zinc-800 rounded-md">
      <img
        src={event.event_banner}
        alt={event.id + " Event Banner"}
        className="rounded-md"
      />

      {/* Title and event datetime */}
      <div className="py-3 px-4">
        <h2 className="text-xl leading-6 font-bold mb-4">{event.name}</h2>

        {/* Date and Time */}
        <div className="flex flex-row w-full justify-center">
          {/* Calender Icon */}
          <div className="w-11 h-fit mr-3  border border-gray-300	 text-black  rounded-md">
            <div
              className="bg-white text-[8px]  text-black/80  font-semibold text-center rounded-t-sm "
              style={{ padding: "2px 10px" }}
            >
              {Moment(event.start_date).format("MMM").toUpperCase()}
            </div>
            <div className="text-center text-sm px-2 text-white">
              {Moment(event.start_date).format("DD")}
            </div>
          </div>

          {/* Date and Time Content */}
          <div className="w-full h-10">
            {/* Date Content */}
            {event.start_date === event.end_date ? (
              <div>
                <h3 className="font-semibold text-sm">
                  {Moment(event.start_date).format("dddd, MMMM DD")}
                </h3>
                <h3 className="text-white/70 text-xs">
                  {Moment(event.start_datetime).format("hh:mm A")} to{" "}
                  {Moment(event.end_datetime).format("hh:mm A")}
                </h3>
              </div>
            ) : (
              <div>
                <h3 className="font-semibold text-sm">
                  {Moment(event.start_date).format("dddd, MMM DD")} -{" "}
                  {Moment(event.end_date).format("MMM DD")}
                </h3>
                <h3 className="text-white/70 text-xs">
                  {Moment(event.start_datetime).format("hh:mm A")} to{" "}
                  {Moment(event.end_datetime).format("hh:mm A")}
                </h3>
              </div>
            )}

            {/* Time Content */}
          </div>
        </div>

        {/* Location */}
        <div className="py-2"></div>
        <div className="flex flex-row w-full justify-center ">
          {/* Calender Icon */}
          <div className="w-11 h-fit mr-3 p-2  border border-gray-300	flex justify-center items-center text-black  rounded-md">
            {event.isInPerson ? (
              <svg
                fill="#ffffff"
                width="18px"
                version="1.1"
                id="Layer_1"
                viewBox="0 0 368.666 368.666"
              >
                <g id="XMLID_2_">
                  <g>
                    <g>
                      <path
                        d="M184.333,0C102.01,0,35.036,66.974,35.036,149.297c0,33.969,11.132,65.96,32.193,92.515
				c27.27,34.383,106.572,116.021,109.934,119.479l7.169,7.375l7.17-7.374c3.364-3.46,82.69-85.116,109.964-119.51
				c21.042-26.534,32.164-58.514,32.164-92.485C333.63,66.974,266.656,0,184.333,0z M285.795,229.355
				c-21.956,27.687-80.92,89.278-101.462,110.581c-20.54-21.302-79.483-82.875-101.434-110.552
				c-18.228-22.984-27.863-50.677-27.863-80.087C55.036,78.002,113.038,20,184.333,20c71.294,0,129.297,58.002,129.296,129.297
				C313.629,178.709,304.004,206.393,285.795,229.355z"
                      />
                      <path
                        d="M184.333,59.265c-48.73,0-88.374,39.644-88.374,88.374c0,48.73,39.645,88.374,88.374,88.374s88.374-39.645,88.374-88.374
				S233.063,59.265,184.333,59.265z M184.333,216.013c-37.702,0-68.374-30.673-68.374-68.374c0-37.702,30.673-68.374,68.374-68.374
				s68.373,30.673,68.374,68.374C252.707,185.341,222.035,216.013,184.333,216.013z"
                      />
                    </g>
                  </g>
                </g>
              </svg>
            ) : (
              <svg
                width="20px"
                fill="#ffffff"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    fill-rule="nonzero"
                    d="M16 4a1 1 0 0 1 1 1v4.2l5.213-3.65a.5.5 0 0 1 .787.41v12.08a.5.5 0 0 1-.787.41L17 14.8V19a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h14zm-1 2H3v12h12V6zM7.4 8.829a.4.4 0 0 1 .215.062l4.355 2.772a.4.4 0 0 1 0 .674L7.615 15.11A.4.4 0 0 1 7 14.77V9.23c0-.221.18-.4.4-.4zM21 8.84l-4 2.8v.718l4 2.8V8.84z"
                  />
                </g>
              </svg>
            )}
          </div>

          {/* Location */}
          <div className="w-full h-10">
            {event.isInPerson ? (
              <div>
                <h3 className="font-semibold text-sm">In Person Event</h3>
                <h3 className="text-white/70 text-xs">{event.location}</h3>
              </div>
            ) : (
              <div>
                <a href={event.location} target="_BLANK">
                  <h3 className="font-semibold text-md flex flex-row">
                    Virtual Event
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10px"
                      viewBox="0 0 32 40"
                      version="1.1"
                      className="ml-2"
                      x="0px"
                      y="0px"
                    >
                      <g
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <g
                          transform="translate(-6.000000, -8.000000)"
                          fill="#ffffff"
                        >
                          <g transform="translate(23.000000, 23.000000) rotate(-135.000000) translate(-23.000000, -23.000000) ">
                            <g transform="translate(2.000000, 2.000000)">
                              <rect x="19" y="0" width="4" height="40" />
                            </g>
                            <g transform="translate(23.000000, 23.707107) rotate(45.000000) translate(-23.000000, -23.707107) translate(7.500000, 8.207107)">
                              <rect
                                x="6.03961325e-14"
                                y="26"
                                width="30"
                                height="4"
                              />
                              <rect
                                x="26"
                                y="6.39488462e-14"
                                width="4"
                                height="30"
                              />
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </h3>
                  <h3 className="text-white/70 text-xs">Join Now</h3>
                </a>
              </div>
            )}

            {/* Time Content */}
          </div>
        </div>
      </div>
    </div>
  );
}
