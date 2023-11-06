import React, { useState } from "react";
import SlideInModal from "../other/SlideInModal";
import EventTitle from "./component/EventTitle";
import TopContentModal from "./component/TopContentModal";
import ModalRegistrationSection from "./component/ModalRegistrationSection";
import ModalAboutSection from "./component/ModalAboutSection";
import ModalHostSection from "./component/ModalHostSection";

const EventItem = ({ event }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div
      onClick={() => setIsModalOpen(true)}
      className="w-full rounded-md bg-violet-900 flex flex-warp md:flex-row flex-col cursor-pointer"
    >
      <div className="md:w-5/6 w-full ">
        <img
          src={event.event_banner}
          alt={event.name + " Event Banner"}
          className="md:rounded-l-md rounded-t-md h-full object-fill text-white text-xs"
        />
      </div>
      <div className="px-4 py-3 w-full text-white">
        {/* Event Item */}
        <h2 className="text-xl leading-6 font-semibold mb-2">{event.name}</h2>
        {/* Date Content */}
        <EventTitle event={event} />

        {/* Your modal content goes here */}
        {/* Modal Section */}
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
