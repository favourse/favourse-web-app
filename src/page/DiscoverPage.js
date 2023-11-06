import React, { Component } from "react";
import HeaderSection from "../component/HeaderSection";
import { Helmet } from "react-helmet";
import axios from "axios";
import { API_URL } from "../utils";
import { EventItem } from "../component/event";
import Moment from "moment";

export default class DiscoverPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
    };
  }
  componentDidMount() {
    axios
      .get(API_URL + "events")
      .then((res) => {
        const events = res.data;
        this.setState({ events });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    const { events } = this.state;
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
          <title>Discover | Favourse</title>
        </Helmet>
        <HeaderSection />

        <div className="mt-4 flex flex-col items-center p-4">
          <h1 className="text-center text-3xl text-white md:text-4xl font-semibold">
            Discover
          </h1>
          <div className="w-full md:w-3/5 mt-3 p-4 md:p-10 rounded-sm grid grid-cols-1 md:grid-cols-1 gap-4 justify-center items-center">
            <ul>
              {events &&
                events.map((event, index) => {
                  // Check if the current event date is the same as the previous one
                  const showDate =
                    index === 0 ||
                    events[index - 1].start_date !== event.start_date;
                  const isLastIndex = index === events.length - 1;
                  const today = Moment().startOf("day");
                  const tomorrow = Moment().add(1, "days").startOf("day");

                  let displayDate = "";

                  if (Moment(event.start_date).isSame(today, "day")) {
                    displayDate = "Today";
                  } else if (Moment(event.start_date).isSame(tomorrow, "day")) {
                    displayDate = "Tomorrow";
                  } else {
                    displayDate = `${Moment(event.start_date).format(
                      "MMMM D"
                    )}, ${Moment(event.start_date).format("dddd")}`;
                  }

                  return (
                    <li className="relative flex justify-center gap-4 pb-5 ">
                      <div
                        className={`before:absolute  before:bottom-5 before:top-[20px] before:h-full before:w-[1px] ${
                          isLastIndex
                            ? "before:bg-gradient-to-t before:from-transparent before:via-transparent before:to-white/20"
                            : "before:bg-white/20"
                        }`}
                      >
                        {showDate && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 20"
                            fill="#ffffff"
                            className="w-3 h-3 absolute top-[10px] left-[-5.5px]"
                          >
                            <g data-name="Layer 2">
                              <g data-name="Layer 1">
                                <circle cx="8" cy="8" r="8" />
                              </g>
                            </g>
                          </svg>
                        )}
                      </div>
                      <div className="w-full">
                        {showDate && (
                          <div className="flex flex-row mb-2">
                            <h3 className="text-lg text-white font-semibold">
                              {displayDate}
                            </h3>
                          </div>
                        )}
                        <EventItem key={event.id} event={event} />
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
