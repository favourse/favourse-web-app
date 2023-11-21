import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import * as AuthService from "../auth/AuthService";
import { initJuno, setDoc } from "@junobuild/core";
import FavIcon from "../assets/fav-icon.png";

import axios from "axios";

import {
  BasicInformationForm,
  LocationDateTimeForm,
  TicketCapacityForm,
} from "../component/event";
import HeaderSection from "../component/HeaderSection";
import DeployModal from "../component/event/component/DeployModal";
// import { API_URL, validateFormData } from "../utils";

// const ethers = require("ethers");
const CreateEventPage = () => {
  initJuno({
    satelliteId: "4knjt-tiaaa-aaaal-adenq-cai",
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkIfAuthenticated = async () => {
      const isAuthenticated = await AuthService.isAuthenticated();
      if (isAuthenticated) {
        const principalUserId = await AuthService.getPrincipalId();

        setUser({ principalUserId });
        setFormData((prevFormData) => ({
          ...prevFormData,
          principalId: principalUserId,
        }));
      }
    };

    checkIfAuthenticated();
  }, []);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSucces] = useState("idle");
  const [formErrors, setFormErrors] = useState({});
  // const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    principalId: "",
    name: "",
    description: "",
    isInPerson: true,
    location: "",
    event_banner: "",
    logoData: "",
    logoType: "",
    maxLimit: 0,
    isFree: false,
    price: 0,
    startDateTime: "",
    endDateTime: "",
  });
  // const [deploymentResult, setDeploymentResult] = useState("");

  const handleInputChange = (field, value) => {
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [field]: value,
      };

      if (field === "isFree" && value) {
        updatedData.price = "0"; // set to string "0"
      }

      // If start_date or start_time changes, combine them
      if (field === "start_date" || field === "start_time") {
        const combinedStartDate = updatedData.start_date || "";
        const combinedStartTime = updatedData.start_time || "";

        // Only set combined datetime if both date and time are present
        if (combinedStartDate && combinedStartTime) {
          updatedData.startDateTime = `${combinedStartDate}T${combinedStartTime}`;
        }
      }

      // If end_date or end_time changes, combine them
      if (field === "end_date" || field === "end_time") {
        const combinedEndDate = updatedData.end_date || "";
        const combinedEndTime = updatedData.end_time || "";

        // Only set combined datetime if both date and time are present
        if (combinedEndDate && combinedEndTime) {
          updatedData.endDateTime = `${combinedEndDate}T${combinedEndTime}`;
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

  // const handleSubmit = () => {
  //   console.log(formData);
  //   setIsLoading(true);

  //   // Validate the form data
  //   const errors = validateFormData(formData);

  //   // Check if there are any validation errors
  //   if (Object.keys(errors).length > 0) {
  //     console.log("Validation errors:", errors);
  //     setIsLoading(false); // Reset the loading state
  //     return; // Exit the function early since validation failed
  //   }
  //   axios
  //     .post(API_URL + "events", formData)
  //     // .post(API_URL + "events", formData, {
  //     //   headers: {
  //     //     "Content-Type": "multipart/form-data",
  //     //   },
  //     // })
  //     .then((res) => {
  //       setTimeout(() => {
  //         navigate("/discover"); // Redirect to the new page after 2 seconds
  //       }, 3000);
  //     })
  //     .catch((error) => {
  //       setIsLoading(false);
  //       console.log(error);
  //     });
  //   // Submit formData to an API or do other processing...
  // };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsSucces("deploying");
    }, 1000);
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3040/deploy",
        formData
      );
      const dataToStore = {
        principalId: response.data.principalId,
        canisterId: response.data.canisterId, // Make sure these fields are returned from the backend
        canisterName: response.data.canisterName,
        logoType: response.data.logoType,
        logoData: response.data.logoData,
        name: formData.name,
        symbol: response.data.symbol,
        maxLimit: formData.maxLimit,
        location: formData.location,
        startDateTime: formData.startDateTime,
        endDateData: formData.endDateTime,
        isInPerson: formData.isInPerson,
        isFree: formData.isFree,
        price: formData.price,
      };

      // Use setDoc from Juno SDK to store the data
      await setDoc({
        collection: "favourse99",
        doc: {
          key: response.data.canisterId, // This should be a unique identifier for your document
          data: dataToStore,
        },
      });
      // setDeploymentResult(response.data);
      setIsSucces("success");
      setTimeout(() => {
        // navigate(`/${response.data.canisterId}`); // Redirect to the new page after 2 seconds
        navigate("/discover"); // Redirect to the new page after 2 seconds
      }, 2000);
    } catch (error) {
      // setDeploymentResult(error.message);
      console.log(error.message);
    }
  };

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
              eventBanner={(value) => handleInputChange("logoData", value)}
              logoType={(value) => handleInputChange("logoType", value)}
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
              capacityData={(value) => handleInputChange("maxLimit", value)}
              isFreeData={(value) => handleInputChange("isFree", value)}
              priceData={(value) => handleInputChange("price", value)}
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
      {isLoading && (
        <DeployModal>
          <div className="mt-4 text-2xl text-center flex flex-col justify-center items-center">
            {isSuccess === "success" ? (
              <div className="checkmark-container mb-4">
                <svg
                  className="checkmark"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 52 52"
                >
                  <circle
                    className="checkmark__circle"
                    cx="26"
                    cy="26"
                    r="25"
                    fill="none"
                  />
                  <path
                    className="checkmark__check"
                    fill="none"
                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                  />
                </svg>
              </div>
            ) : (
              <img
                className="h-52 w-auto mb-4 infinity-flip "
                src={FavIcon}
                alt="Favourse Logo"
              />
            )}
            {isSuccess === "idle" && <h1>Start the Engine! 🚀</h1>}
            {isSuccess === "deploying" && (
              <h1 className="text-black">Deploying... Please wait 🛠️ 🔄</h1>
            )}
            {isSuccess === "success" && (
              <h1 className="text-black font-semibold">
                Deployment Successful! 🎉
              </h1>
            )}
          </div>
        </DeployModal>
      )}
    </div>
  );
};

export default CreateEventPage;
