import React, { useEffect, useRef } from "react";

function SlideInModal({ isOpen, onClose, children }) {
  const modalRef = useRef();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scroll
    } else {
      document.body.style.overflow = "auto"; // Enable scroll
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup: Enable scroll when component unmounts or if modal state changes
    };
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      e.stopPropagation();
      onClose();
    }
  };

  return (
    <>
      <div
        onClick={handleOverlayClick}
        className={`fixed cursor-default inset-0 z-40 bg-black transition-opacity ${
          isOpen ? "opacity-70" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      <div
        ref={modalRef}
        className={`fixed z-50 p-5 md:p-3  top-0 right-0 w-full md:w-5/12 h-full  duration-500 transition-transform transform ${
          isOpen ? "translate-x-0" : " translate-x-full"
        }`}
      >
        <div className="h-full p-5 cursor-default overflow-scroll bg-zinc-900 rounded-md">
          <div className="mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              data-name="Layer 1"
              viewBox="0 0 100 125"
              fill="#ffffff"
              className="w-5 h-5 cursor-pointer"
              x="0px"
              y="0px"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            >
              <path d="M4.56,13.12h0Z" />
              <path d="M0,13,37,50,0,86.94q11.51-.07,23-.07L59.9,50,23.14,13.23q-9.29,0-18.58-.11h0C5,13.12,2.72,13.07,0,13Z" />
              <path d="M40.34,13.25,77.09,50,40.18,86.89q7.44,0,14.88.11c-1.1,0,3.86-.09,8,0l37-37L63.16,13.15C55.55,13.22,48,13.24,40.34,13.25Z" />
            </svg>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}

export default SlideInModal;
