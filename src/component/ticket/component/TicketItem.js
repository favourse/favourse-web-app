import React from "react";

const TicketItem = ({ data }) => {
  // Use destructuring to extract key_val_data from data
  const { key_val_data } = data;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white text-black m-4 p-4">
      <h2 className="font-bold text-xl mb-2">{key_val_data.description}</h2>
      <div className="px-6 py-4">
        {key_val_data &&
          Object.entries(key_val_data).map(([key, val], index) => {
            if (key !== "description") {
              // Avoid duplicating the description
              // Check for TextContent or similar property in val
              const detailValue = val?.TextContent || val || "N/A";
              return (
                <div key={index} className="mb-2">
                  <strong className="font-bold capitalize">{key}:</strong>{" "}
                  {detailValue}
                </div>
              );
            }
            return null;
          })}
      </div>
    </div>
  );
};

export default TicketItem;
