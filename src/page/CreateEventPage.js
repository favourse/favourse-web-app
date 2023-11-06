import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
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
  // const [currentAccount, setCurrentAccount] = useState("");
  // const [userAddress, setUserAddress] = useState("");

  // const { ethereum } = window;
  // const provider = new ethers.providers.Web3Provider(ethereum);
  // const signer = provider.getSigner();
  // const detailsOn = async () => {
  //   // const addr = await signer.getAddress();
  // };
  // async function connectMetamask() {
  //   const res = await provider.send("eth_requestAccounts", []);
  //   userAddress(res);
  // }

  // async function myAddress() {
  //   const addr = await signer.getAddress();
  //   setUserAddress(addr.toString());
  // }

  // const checkIfWalletIsConnected = async () => {
  //   try {
  //     const { ethereum } = window;

  //     if (!ethereum) {
  //       console.log("Use Metamask!");
  //     } else {
  //       console.log("Ethereum object found", ethereum);
  //       detailsOn();
  //     }

  //     const accounts = await ethereum.request({ method: "eth_accounts" });

  //     if (accounts !== 0) {
  //       const account = accounts[0];
  //       console.log("Found an authorized account ", account);
  //       setCurrentAccount(account);
  //       detailsOn();
  //     } else {
  //       console.log("Could not find an authorized account");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const connectWallet = async () => {
  //   try {
  //     const { ethereum } = window;

  //     if (!ethereum) {
  //       alert("Use Metamask!");
  //     } else {
  //       const accounts = await ethereum.request({
  //         method: "eth_requestAccounts",
  //       });
  //       console.log("Account connected ", accounts[0]);

  //       setCurrentAccount(accounts[0]);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   checkIfWalletIsConnected();
  // }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

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

  return (
    <div className="bg-gradient-to-r from-violet-700 to-violet-900">
      <Helmet>
        <title>Create Event | Favourse</title>
      </Helmet>
      <HeaderSection />

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
    </div>
  );
};

export default CreateEventPage;
