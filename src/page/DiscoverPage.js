import React, { useState, useEffect } from "react";
import HeaderSection from "../component/HeaderSection";
import { Helmet } from "react-helmet";
import axios from "axios";
import { API_URL } from "../utils";
import { EventItem } from "../component/event";
import Moment from "moment";
import { initJuno, listDocs } from "@junobuild/core";

const DiscoverPage = () => {
  const [events, setEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [ready, setReady] = useState(false);

  const pinnedEvent = {
    principalId:
      "5ib3s-r5a77-exfkc-43egg-bcvjp-ovimv-xzffi-gjepj-ggama-akpk2-hqe",
    canisterId: "i6hws-ryaaa-aaaam-abz3a-cai",
    canisterName: "asia_blockchain_festival",
    agentUrl: "https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io",
    logoType: "image/jpeg",
    logoData:
      "https://lime-known-rabbit-717.mypinata.cloud/ipfs/QmYTehcvp5mphmsbdJFEYCiaTWKziM9XWFaSrRRw6LeVws?_gl=1*187rub8*_ga*MTUzNjI4NDg3MS4xNzAxMTYwOTQx*_ga_5RMPXG14TE*MTcwMTE2MDk0MS4xLjEuMTcwMTE2MTEwMi4zNC4wLjA.",
    name: "Asia Blockchan Festival",
    description:
      "The Asia Blockchain Festival 2024 is a premier gathering designed to bring together visionary entrepreneurs, developers, investors, and thought leaders at the forefront of the Web3 revolution. This summit aims to foster collaboration, knowledge sharing, and networking within the rapidly evolving landscape of decentralized technologies, blockchain, and cryptocurrencies.",
    symbol: "ABF",
    maxLimit: "300",
    location: "Bali",
    startDateTime: "2024-04-20T10:00",
    endDateData: "2024-04-22T17:00",
    isInPerson: true,
    isFree: false,
    price: 60,
  };

  useEffect(() => {
    (async () => {
      await initJuno({
        satelliteId: process.env.REACT_APP_SATELLITE_ID,
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
        console.log(eventList.items);
        // After fetching the events, filter out past events
        const filteredEvents = eventList.items.filter((event) => {
          // Compare event's endDateData with the current time
          return Moment().isBefore(Moment(event.data.endDateData));
        });

        const pastEvents = eventList.items.filter((event) => {
          // Compare event's endDateData with the current time
          return Moment().isAfter(Moment(event.data.endDateData));
        });

        if (filteredEvents) {
          setEvents(filteredEvents);
          setPastEvents(pastEvents);
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
        <div className="flex justify-end mt-10 gap-4 p-[2px] rounded-lg bg-white/20">
          <button
            className={`px-4 py-2 w-32 rounded-lg text-white ${
              activeTab === "upcoming" ? "bg-violet-900 font-semibold" : ""
            }`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming
          </button>
          <button
            className={`px-4 py-2 w-32 rounded-lg text-white ${
              activeTab === "past" ? "bg-violet-900 font-semibold" : ""
            }`}
            onClick={() => setActiveTab("past")}
          >
            Past
          </button>
        </div>
        <div className="w-full md:w-3/5  p-4 md:p-10 rounded-sm grid grid-cols-1 md:grid-cols-1 gap-4 justify-center items-center">
          <li className="relative flex justify-center gap-4 pb-5">
            <div
              className={`before:absolute  before:bottom-5 before:top-[20px] before:h-full before:w-[1px] before:bg-white/20"
              }`}
            >
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
            </div>
            <div className="w-full">
              <div className="flex flex-row mb-2">
                <h3 className="text-lg text-white font-semibold">
                  Pinned Event
                </h3>
              </div>

              <EventItem event={pinnedEvent} />
            </div>
          </li>
          {events ? (
            activeTab === "upcoming" ? (
              <ul>
                {events.length !== 0 ? (
                  events.map((event, index) => {
                    const showDate =
                      index === 0 ||
                      events[index - 1].startDateTime !==
                        event.data.startDateTime;
                    const isLastIndex = index === events.length - 1;
                    const today = Moment().startOf("day");
                    const tomorrow = Moment().add(1, "days").startOf("day");
                    let displayDate = "";
                    const eventStart = Moment(event.data.startDateTime).startOf(
                      "day"
                    );
                    const eventEnd = Moment(event.data.endDateTime).endOf(
                      "day"
                    );

                    if (eventStart.isBefore(today) && eventEnd.isAfter(today)) {
                      // The event is ongoing
                      displayDate = "Ongoing";
                    } else if (
                      Moment(event.data.startDateTime).isSame(today, "day")
                    ) {
                      displayDate = "Today";
                    } else if (
                      Moment(event.data.startDateTime).isSame(tomorrow, "day")
                    ) {
                      displayDate = "Tomorrow";
                    } else {
                      displayDate = `${Moment(event.data.startDateTime).format(
                        "MMMM D"
                      )}, ${Moment(event.data.startDateTime).format("dddd")}`;
                    }

                    return (
                      <li
                        className="relative flex justify-center gap-4 pb-5"
                        key={index}
                      >
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
                          <EventItem event={event.data} />
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <p className="text-white text-center">No Event</p>
                )}
              </ul>
            ) : (
              <ul>
                {pastEvents.length !== 0 ? (
                  pastEvents.map((event, index) => {
                    const showDate =
                      index === 0 ||
                      events[index - 1].startDateTime !==
                        event.data.startDateTime;
                    const isLastIndex = index === events.length - 1;
                    const today = Moment().startOf("day");
                    const tomorrow = Moment().add(1, "days").startOf("day");

                    let displayDate = "";

                    if (Moment(event.data.startDateTime).isSame(today, "day")) {
                      displayDate = "Today";
                    } else if (
                      Moment(event.data.startDateTime).isSame(tomorrow, "day")
                    ) {
                      displayDate = "Tomorrow";
                    } else {
                      displayDate = `${Moment(event.data.startDateTime).format(
                        "MMMM D"
                      )}, ${Moment(event.data.startDateTime).format("dddd")}`;
                    }

                    return (
                      <li
                        className="relative flex justify-center gap-4 pb-5"
                        key={index}
                      >
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
                          <EventItem event={event.data} />
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <p className="text-white text-center">No Event</p>
                )}
              </ul>
            )
          ) : (
            <p>Loading</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscoverPage;
