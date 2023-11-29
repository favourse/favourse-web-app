import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SlideInModal from "../other/SlideInModal";
import EventTitle from "./component/EventTitle";
import TopContentModal from "./component/TopContentModal";
import ModalRegistrationSection from "./component/ModalRegistrationSection";
import ModalAboutSection from "./component/ModalAboutSection";
import ModalHostSection from "./component/ModalHostSection";
import { initJuno } from "@junobuild/core";

const defaultImage =
  "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";

const EventItem = ({ event }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); // if you're using react-router

  // This function handles the click event on an event item
  const handleEventClick = () => {
    // 768px is a common breakpoint for desktop vs mobile
    if (event.agentUrl === "https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io") {
      // For Desktop, open the modal
      setIsModalOpen(true);
    } else if (window.innerWidth > 768) {
      setIsModalOpen(true);
    } else {
      // For Mobile, redirect to the event details page
      navigate(`/${event.canisterId}`);
    }
  };

  useEffect(() => {
    (async () => {
      await initJuno({
        satelliteId: process.env.REACT_APP_SATELLITE_ID,
      });
    })();
  }, []);
  return (
    <div
      onClick={handleEventClick}
      className="w-full rounded-md bg-violet-900 flex flex-warp md:flex-row flex-col cursor-pointer"
    >
      <div className="md:w-5/6 w-full ">
        <img
          src={event.logoData}
          alt={event.name + " Event Image"}
          typeof="image/jpeg"
          className="md:rounded-l-md rounded-t-md  object-fill text-white text-xs"
          onError={(e) => (e.target.src = defaultImage)}
        />
      </div>
      <div className="p-7 w-full text-white">
        {/* Event Item */}
        <h2 className="text-2xl leading-6 font-semibold mb-4">{event.name}</h2>
        {/* Date Content */}
        <EventTitle event={event} />

        <SlideInModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <TopContentModal event={event} />
          <div className="py-2"></div>
          <ModalRegistrationSection event={event} />
          <div className="py-2"></div>
          <ModalAboutSection event={event} />
          <div className="py-2"></div>
          <ModalHostSection />
        </SlideInModal>
      </div>
    </div>
  );
};

export default EventItem;
