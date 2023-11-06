import React, { useState } from "react";
import ContactHostPopup from "../../other/ContactHostPopup";

export default function ModalHostSection() {
  // State to manage the visibility of the popup
  const [isPopupOpen, setPopupOpen] = useState(false);

  // Method to open the popup
  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  // Method to close the popup
  const handleClosePopup = () => {
    setPopupOpen(false);
  };
  return (
    <div className="w-full h-fit bg-zinc-800 rounded-md">
      <div className="border-b-[1px] border-white/10 py-2 px-6 flex flex-row items-center  font-semibold text-lg">
        <div className="w-5 mt-[6px] mr-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 30"
            version="1.1"
            x="0px"
            y="0px"
          >
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <path
                d="M9,5 C11.209139,5 13,6.790861 13,9 C13,10.0241883 12.6150756,10.9584727 11.9820025,11.6660775 C14.356491,12.7846468 16,15.2003923 16,18 C16,18.5522847 15.5522847,19 15,19 C14.4477153,19 14,18.5522847 14,18 C14,15.2385763 11.7614237,13 9,13 C6.23857625,13 4,15.2385763 4,18 C4,18.5522847 3.55228475,19 3,19 C2.44771525,19 2,18.5522847 2,18 C2,15.2003923 3.64350901,12.7846468 6.01833787,11.6649525 C5.38492438,10.9584727 5,10.0241883 5,9 C5,6.790861 6.790861,5 9,5 Z M15,5 C17.209139,5 19,6.790861 19,9 C19,9.92419989 18.6839063,10.798158 18.1261838,11.4958418 L17.981,11.665 L17.9944866,11.6712758 C18.7201069,12.0151331 19.381582,12.482087 19.9497475,13.0502525 C21.2533811,14.3538862 22,16.1190915 22,18 C22,18.5522847 21.5522847,19 21,19 C20.4477153,19 20,18.5522847 20,18 C20,16.6549766 19.467813,15.3967452 18.5355339,14.4644661 C18.0710447,13.9999769 17.5198434,13.6303651 16.91359,13.3789747 C16.6122371,13.254015 16.2987694,13.1588566 15.9767518,13.0951623 C15.8167908,13.0635223 15.6548657,13.0396743 15.4913606,13.0237653 C15.2720596,13.0024274 15.0762253,12.9117758 14.9234345,12.7756077 C14.714193,12.626597 14.5611413,12.3977728 14.5151215,12.1241875 C14.4300524,11.6184565 14.7406318,11.1376047 15.2214983,10.9981415 L15.3353878,10.9721619 C15.4475688,10.9532919 15.557311,10.9249438 15.6637879,10.8875001 C15.8900641,10.8079276 16.1001442,10.6877444 16.2842758,10.5332704 C16.7355251,10.1547026 17,9.59999783 17,9 C17,7.8954305 16.1045695,7 15,7 C14.8682985,7 14.7387765,7.01259428 14.6123894,7.03734087 C14.548043,7.04993989 14.4845496,7.06568205 14.4220667,7.08449509 C13.8932329,7.24372209 13.3354494,6.94409656 13.1762224,6.41526274 C13.0169954,5.88642892 13.3166209,5.32864542 13.8454547,5.16941843 C13.9711328,5.13157792 14.0988055,5.0999235 14.2280869,5.07461022 C14.4809059,5.02510828 14.7391242,5 15,5 Z M9,7 C7.8954305,7 7,7.8954305 7,9 C7,10.1045695 7.8954305,11 9,11 C10.1045695,11 11,10.1045695 11,9 C11,7.8954305 10.1045695,7 9,7 Z"
                fill="#ffffff"
              />
            </g>
          </svg>
        </div>
        Hosts
      </div>
      <div className="px-6 py-3 mx-1 my-1 rounded-md">
        <div className=" flex flex-row  items-center mb-4">
          <img
            className="w-5 h-5 mr-2 mt-[3px]"
            src="https://www.favourse.com/wp-content/uploads/2022/02/cropped-favourse_logo_horizontal_color-1-2-192x192.png"
          />
          <h3 className="font-semibold">Favourse</h3>
        </div>
        <button
          onClick={handleOpenPopup}
          className="w-full rounded-md py-[7px] bg-white/20 hover:bg-white/50 duration-500 ease-in-out text-white hover:text-black font-semibold"
        >
          Contact
        </button>
        {/* The popup component */}
      </div>
      <ContactHostPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
    </div>
  );
}
