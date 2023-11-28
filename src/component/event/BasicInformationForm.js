import React, { useState, useRef } from "react";
import { initJuno, uploadFile } from "@junobuild/core";
import preloader from "../../assets/preloader.gif";

function BasicInformationForm({
  onNameChange,
  onDescriptionChange,
  eventBanner,
  logoType,
}) {
  initJuno({
    satelliteId: "4knjt-tiaaa-aaaal-adenq-cai",
  });
  const [imagePreview, setImagePreview] = useState(null);
  // let bannerEvent = "";

  const fileInputRef = useRef(null);

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file && file.type.substr(0, 5) === "image") {
  //     const reader = new FileReader();

  //     reader.onloadend = () => {
  //       setImagePreview(reader.result);
  //       // bannerEvent = file.name;
  //     };

  //     reader.readAsDataURL(file);
  //     eventBanner(file);
  //   } else {
  //     setImagePreview(null);
  //   }
  // };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setImagePreview(preloader);
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        // const dataURL = reader.result;
        // setImagePreview(reader.result);

        // const buffer = new Uint8Array(reader.result);
        // Generate a unique key using timestamp and random number
        const uniqueKey = `image-${Date.now()}-${Math.floor(
          Math.random() * 1000
        )}`;

        // Create a new File object with a new name
        const newFileName = uniqueKey + "." + file.name.split(".").pop();
        const newFile = new File([file], newFileName, {
          type: file.type,
        });
        try {
          const assetKey = await uploadFile({
            collection: "favourse100",
            key: uniqueKey, // Generate or define a unique key
            data: newFile,
          });
          console.log("Success upload", assetKey.downloadUrl);
          setImagePreview(reader.result);

          // Update any other state or formData with the assetKey if necessary
          eventBanner(assetKey.downloadUrl);
          logoType(file.type);
        } catch (error) {
          console.error("Error uploading image: ", error);
        }
      };

      // reader.readAsArrayBuffer(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  return (
    <div className="p-4  rounded-md flex text-left flex-col md:flex-col w-full border bg-white">
      <div className="w-full p-4">
        <h3 className="text-xl font-semibold mb-2 primary-color">
          Basic Information
        </h3>
        <p className="text-gray-600 text-sm md:text-base">
          All of these fields can also be adjusted later.
        </p>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="flex-1  p-4 rounded-md space-y-4 mr-0 md:mr-4 order-last md:order-1">
          <div
            onClick={handleButtonClick}
            className={`${
              imagePreview ? "" : "border"
            }  border-dashed rounded cursor-pointer border-gray-300 image-size flex items-center justify-center mb-4`}
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Selected Preview"
                style={{
                  maxHeight: "320px",
                  marginTop: "20px",
                }}
              />
            ) : (
              <p className="text-gray-500">No image selected</p>
            )}
          </div>

          <p className="text-xs text-gray-600 mb-4">
            This illustration will be used for the NFT tickets. Use 512 by 512
            pixels for best results.
          </p>

          <div className="flex justify-stretch ">
            <button
              type="file"
              onClick={handleButtonClick}
              className={`py-1 px-3 w-full button-tab  rounded `}
            >
              Select a file
            </button>

            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            {/* <button
              onClick={() => setSelectedTab("upload")}
              className={`py-1 px-3 w-1/2 ${
                selectedTab === "upload"
                  ? " active-tab"
                  : "text-gray-500 border-b-2 border-gray-300"
              }`}
            >
              Upload File
            </button>
            <button
              onClick={() => setSelectedTab("url")}
              className={`py-1 px-3 w-1/2 ${
                selectedTab === "url"
                  ? " active-tab"
                  : "text-black border-b-2 border-gray-300"
              }`}
            >
              <span className="hidden md:block">Insert Image URL</span>
              <span className="md:hidden">Image URL</span>
            </button>
          </div>
          <div className="flex justify-center h-10">
            {selectedTab === "url" && (
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
                placeholder="Insert Image URL"
              />
            )}
            {selectedTab === "upload" && (
              <button
                type="file"
                onClick={handleButtonClick}
                className={`py-1 px-3 w-full button-tab ${
                  selectedTab === "url" ? "" : ""
                } rounded `}
              >
                Select a file
              </button>
            )}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImageChange}
            /> */}
          </div>
        </div>

        <div className="flex-1  p-4 rounded-md space-y-4 mt-1 md:mt-0 order-1 md:order-last">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event name
            </label>
            <input
              type="text"
              onChange={(e) => onNameChange(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full"
              placeholder="Name"
            />
            <p className="text-xs text-gray-500 mb-2 mt-1">
              Enter the name of your event. It will appear on the NFT tickets.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              onChange={(e) => onDescriptionChange(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full"
              placeholder="Write description here."
              rows="8"
            ></textarea>
            <p className="text-xs text-gray-500 mb-2">
              Enter a description for your event.
            </p>
          </div>

          {/* <div className="text-xs text-gray-600">
            <p className="mb-1">
              You currently do not have any token to pay for gas to deploy on
              the ICP network.
            </p>
            <a
              href="https://www.coinbase.com/"
              className="text-blue-500 hover:underline"
            >
              Purchase some ICP using Coinbase
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default BasicInformationForm;
