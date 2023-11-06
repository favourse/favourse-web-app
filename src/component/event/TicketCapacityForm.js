import React from "react";

const TicketCapacityForm = ({
  capacityData,
  freeToggle,
  isFreeData,
  priceData,
  errorData,
}) => {
  return (
    <div className="border p-4 rounded-md bg-white">
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 primary-color">
          Price and Capacity
        </h3>
        <p className="text-gray-600 text-sm md:text-base">
          These settings can also be changed, but only by sending on-chain
          transactions.
        </p>
      </div>
      <div className="p-4">
        <div className="flex flex-col md:flex-row">
          <div className=" w-full mr-0 md:mr-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Capacity and Price
              <span className="text-black">{errorData}</span>
            </label>
            <input
              type="number"
              required
              onChange={(e) => capacityData(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full"
              placeholder="Enter the capacity of your event."
            />
            <p className="text-xs text-gray-600 mt-2">
              This is the maximum number of tickets for your event.
            </p>
          </div>
          <div className=" w-full ml-0 mt-2 md:mt-0 md:ml-1">
            <label className="block switch text-sm text-right font-medium text-gray-700 mb-1">
              <div className="flex items-end justify-start md:justify-end">
                <span className="text-sm font-medium text-gray-700 mr-4">
                  Free
                </span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={freeToggle}
                    onChange={(e) => isFreeData(!freeToggle)}
                    className="hidden "
                  />
                  <span
                    className="w-9 h-5 bg-gray-300
                       rounded-full relative block"
                  >
                    <span
                      className={`block w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5 transform transition-transform ${
                        freeToggle ? "translate-x-full" : ""
                      }`}
                    ></span>
                  </span>
                </label>
              </div>
            </label>
            <input
              type="number"
              disabled={freeToggle}
              onChange={(e) => priceData(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full"
              placeholder="Enter the price of the event."
            />
            <p className="text-xs text-gray-600 mt-2"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCapacityForm;
