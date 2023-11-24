import React, { useState } from "react";
import VideoCameraIcon from "../../assets/video-camera-icon.svg";

const LocationDateTimeForm = ({
  startDateData,
  startTimeData,
  endDateData,
  endTimeData,
  isToggled,
  inPersonData,
  locationData,
}) => {
  // const [timezone, setTimezone] = useState("Asia/Makassar");
  // eslint-disable-next-line no-unused-vars
  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <div className="p-4 rounded-md flex text-left flex-col md:flex-col w-full border bg-white">
      <div className="w-full p-4">
        <h3 className="text-xl font-semibold mb-2 primary-color">
          Location, Date and Time
        </h3>
        <p className="text-gray-600  text-sm md:text-base">
          This information will be public and included on each of the NFT
          tickets. Again, it can be adjusted later.
        </p>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="flex-1  pl-4 rounded-md space-y-4 mr-0 md:mr-1 order-last md:order-1">
          {isToggled ? (
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.46556221177!2d106.82115931476957!3d-6.200398995506088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f379f0d4655b%3A0x499c224c6d74af2b!2sCentral%20Jakarta%2C%20Jakarta%2C%20Indonesia!5e0!3m2!1sen!2sus!4v1631740914470!5m2!1sen!2sus"
              width="100%"
              height="350"
              title="Event Title"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <img
                src={VideoCameraIcon}
                alt="Favourse Virtual Event"
                width="150px"
              />
            </div>
          )}
        </div>

        <div className="flex-1  p-4 rounded-md space-y-4 mt-1 md:mt-0 order-1 md:order-last">
          <div className="grid grid-flow-row md:grid-flow-col justify-stretch">
            <div className="mr-0 mb-2 md:mr-2 md:mb-0">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start date
              </label>
              <input
                type="date"
                min={today}
                required
                // onChange={(e) => startDateData(e.target.value)}
                onChange={(e) => {
                  startDateData(e.target.value);
                  setStartDate(e.target.value); // Update the start date state
                  setEndDate(""); // Reset end date when start date changes
                }}
                className="border border-gray-300 p-2 rounded-lg w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start time
              </label>
              <input
                type="time"
                required
                // eslint-disable-next-line no-unused-vars
                onChange={(e) => startTimeData(e.target.value)}
                className="border border-gray-300 p-2 rounded-lg w-full"
              />
            </div>
          </div>
          <div className="grid grid-flow-row md:grid-flow-col justify-stretch">
            <div className="mr-0 mb-2 md:mr-2 md:mb-0">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End date
              </label>
              <input
                type="date"
                required
                min={startDate}
                value={endDate}
                // eslint-disable-next-line no-unused-vars
                // onChange={(e) => endDateData(e.target.value)}
                onChange={(e) => {
                  endDateData(e.target.value);
                  setEndDate(e.target.value); // Update the end date state
                }}
                className="border border-gray-300 p-2 rounded-lg w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End time
              </label>
              <input
                type="time"
                required
                // eslint-disable-next-line no-unused-vars
                onChange={(e) => endTimeData(e.target.value)}
                className="border border-gray-300 p-2 rounded-lg w-full"
              />
            </div>
          </div>
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Timezone
            </label>
            <select
              onChange={(e) => setTimezone(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full"
            >
              <option value="Asia/Makassar">Asia/Makassar</option>
            </select>
          </div> */}
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-gray-700">Location</h2>
              <div className="flex items-end">
                <span className="mr-2">In person</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={isToggled}
                    // onClick={() => inPersonData(!isToggled)}
                    // eslint-disable-next-line no-unused-vars
                    onChange={(e) => inPersonData(!isToggled)}
                    className="hidden "
                  />
                  <span
                    className="w-9 h-5 bg-gray-300
                       rounded-full relative block"
                  >
                    <span
                      className={`block w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5 transform transition-transform ${
                        isToggled ? "translate-x-full" : ""
                      }`}
                    ></span>
                  </span>
                </label>
              </div>
            </div>
            <input
              type="text"
              // eslint-disable-next-line no-unused-vars
              onChange={(e) => locationData(e.target.value)}
              placeholder={
                isToggled ? "Enter event location" : "Enter virtual event link"
              }
              className="mt-1 p-2 w-full border rounded-lg mb-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDateTimeForm;
