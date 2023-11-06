import React, { useState } from "react";

const ContactHostPopup = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    // Send the message to the host here
    // ...

    // Clear the message and close the popup
    setMessage("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-zinc-900  rounded-lg shadow-xl w-4/5 md:w-2/3">
        <div className="bg-zinc-800 rounded-t-lg border-b-[1px] border-zinc-600 px-6 py-3 flex flex-row items-center justify-between">
          <h2 className="text-lg font-bold">Contact the Host</h2>
          <div
            onClick={onClose}
            className="rounded-full w-5 hover:cursor-pointer hover:bg-white/70 hover:text-black font-semibold duration-300 ease-in-out text-xs h-5 flex items-center justify-center text-white bg-white/20"
          >
            <h1>X</h1>
          </div>
        </div>
        <div className="px-6 py-3">
          <p className="mb-4 text-sm">
            We will tell the host that the message comes from you (Yuli Eko
            Prasetyo).
          </p>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What's your question for the host?"
            className="w-full p-2 border bg-zinc-950 border-zinc-600 rounded-md mb-4 text-white text-sm"
            rows="4"
          />

          <p className="mb-4 text-sm">
            The host will send replies to yulieko@favourse.com.
          </p>

          <div className="flex justify-start space-x-4">
            <button
              onClick={handleSendMessage}
              className="px-4 py-1 bg-white font-semibold rounded-md text-sm text-black flex flex-row items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 30"
                className="w-5 h-5 mt-1"
                x="0px"
                y="0px"
              >
                <g data-name="Layer 2">
                  <path d="M11.51465,19.94678l4.5664,1.82666a2.75056,2.75056,0,0,0,3.73438-2.10108L22.28027,4.88525a2.75058,2.75058,0,0,0-3.165-3.16455L4.32813,4.18506A2.74973,2.74973,0,0,0,2.22656,7.91943l1.82715,4.56543A2.73707,2.73707,0,0,0,6.99609,14.187l2.957-.42236a.24159.24159,0,0,1,.21191.07031.2481.2481,0,0,1,.07129.2124l-.42285,2.957A2.74187,2.74187,0,0,0,11.51465,19.94678ZM9.99316,12.26123a1.85777,1.85777,0,0,0-.25293.01807l-2.957.42236a1.249,1.249,0,0,1-1.33691-.77344L3.61914,7.36182a1.25023,1.25023,0,0,1,.95508-1.69727L19.36133,3.2002a1.24944,1.24944,0,0,1,1.43847,1.438L18.335,19.42529a1.24931,1.24931,0,0,1-1.69726.95557L12.07129,18.5542a1.24728,1.24728,0,0,1-.77344-1.3374l.42285-2.958a1.75039,1.75039,0,0,0-1.72754-1.99756Z" />
                  <path d="M12.39941,12.35107a.74676.74676,0,0,0,.53028-.21972l2.12109-2.1211a.74992.74992,0,0,0-1.06055-1.06054L11.86914,11.0708a.75.75,0,0,0,.53027,1.28027Z" />
                </g>
              </svg>
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactHostPopup;
