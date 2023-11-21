import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import * as AuthService from "../auth/AuthService";

import axios from "axios";

import {
  BasicInformationForm,
  LocationDateTimeForm,
  TicketCapacityForm,
} from "../component/event";
import HeaderSection from "../component/HeaderSection";
import { API_URL, validateFormData } from "../utils";

// const ethers = require("ethers");
const CreateEventPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isInPerson: true,
    location: "",
    event_banner: "",
    capacity: 0,
    isFree: false,
    ticket_price: 0,
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [field]: value,
      };

      if (field === "isFree" && value) {
        updatedData.ticket_price = "0"; // set to string "0"
      }

      // If start_date or start_time changes, combine them
      if (field === "start_date" || field === "start_time") {
        const combinedStartDate = updatedData.start_date || "";
        const combinedStartTime = updatedData.start_time || "";

        // Only set combined datetime if both date and time are present
        if (combinedStartDate && combinedStartTime) {
          updatedData.start_datetime = `${combinedStartDate}T${combinedStartTime}`;
        }
      }

      // If end_date or end_time changes, combine them
      if (field === "end_date" || field === "end_time") {
        const combinedEndDate = updatedData.end_date || "";
        const combinedEndTime = updatedData.end_time || "";

        // Only set combined datetime if both date and time are present
        if (combinedEndDate && combinedEndTime) {
          updatedData.end_datetime = `${combinedEndDate}T${combinedEndTime}`;
        }
      }

      return updatedData;
    });
    // Clear error for the specific field
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "as",
    }));
  };

  const handleSubmit = () => {
    console.log(formData);
    setIsLoading(true);

    // Validate the form data
    const errors = validateFormData(formData);

    // Check if there are any validation errors
    if (Object.keys(errors).length > 0) {
      console.log("Validation errors:", errors);
      setIsLoading(false); // Reset the loading state
      return; // Exit the function early since validation failed
    }
    axios
      .post(API_URL + "events", formData)
      // .post(API_URL + "events", formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // })
      .then((res) => {
        setTimeout(() => {
          navigate("/discover"); // Redirect to the new page after 2 seconds
        }, 3000);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
    // Submit formData to an API or do other processing...
  };

  useEffect(() => {
    const checkIfAuthenticated = async () => {
      const isAuthenticated = await AuthService.isAuthenticated();
      if (isAuthenticated) {
        const principalId = await AuthService.getPrincipalId();
        setUser({ principalId });
      }
    };

    checkIfAuthenticated();
  }, []);

  const handleLogin = async () => {
    console.log("clicked");
    await AuthService.login(() => {
      // Perform actions after successful login
      window.location.reload(); // or use React Router to redirect
    });
  };

  return (
    <div className="h-fit min-h-screen pb-52 bg-gradient-to-r from-violet-900 via-violet-950 to-black">
      <Helmet>
        <title>Create Event | Favourse</title>
      </Helmet>
      <HeaderSection />
      {user ? (
        <div className="p-4 md:p-8 lg:w-2/3 mx-auto">
          <div className="mb-6">
            <h2 className="text-3xl text-white md:text-4xl font-semibold text-center">
              Create Event
            </h2>
          </div>
          <div className="space-y-6">
            {/* Basic Information */}
            <BasicInformationForm
              onNameChange={(value) => handleInputChange("name", value)}
              eventBanner={(value) => handleInputChange("event_banner", value)}
              onDescriptionChange={(value) =>
                handleInputChange("description", value)
              }
            />

            {/* Location, Date and Time */}
            <LocationDateTimeForm
              startDateData={(value) => handleInputChange("start_date", value)}
              startTimeData={(value) => handleInputChange("start_time", value)}
              endDateData={(value) => handleInputChange("end_date", value)}
              endTimeData={(value) => handleInputChange("end_time", value)}
              isToggled={formData.isInPerson}
              inPersonData={(value) => handleInputChange("isInPerson", value)}
              locationData={(value) => handleInputChange("location", value)}
            />

            {/* Price and Capacity */}
            <TicketCapacityForm
              freeToggle={formData.isFree}
              errorData={formErrors.name}
              capacityData={(value) => handleInputChange("capacity", value)}
              isFreeData={(value) => handleInputChange("isFree", value)}
              priceData={(value) => handleInputChange("ticket_price", value)}
            />

            {/* Create Event Button */}
            <div className="mt-6">
              <button
                onClick={handleSubmit}
                className="w-full bg-primary-color text-lg text-white py-2 px-4 rounded-full"
              >
                {isLoading ? "Loading..." : "Create your event"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 md:p-52 md:pt-52 pt-52">
          <h1 className="text-7xl text-center text-white md:text-9xl font-bold">
            Upps..
          </h1>
          <p></p>
          <p className="text-center text-md mt-3 font-thin md:text-2xl text-white">
            Please{" "}
            <span
              className="font-normal hover:underline cursor-pointer"
              onClick={handleLogin}
            >
              log in
            </span>{" "}
            to access this feature.
          </p>
        </div>
      )}
    </div>
  );
};

export default CreateEventPage;
