import React, { useState } from "react";
import axios from "axios";
import { initJuno, setDoc } from "@junobuild/core";

function DeployCanisterForm() {
  initJuno({
    satelliteId: "4knjt-tiaaa-aaaal-adenq-cai",
  });
  const [formData, setFormData] = useState({
    principalId: "",
    logoType: "",
    logoData: "",
    name: "",
    symbol: "",
    maxLimit: 0,
  });
  const [deploymentResult, setDeploymentResult] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3040/deploy",
        formData
      );
      const dataToStore = {
        principalId: response.data.principalId,
        logoType: response.data.logoType,
        logoData: response.data.logoData,
        name: response.data.name,
        symbol: response.data.symbol,
        maxLimit: response.data.maxLimit,
        canisterId: response.data.canisterId, // Make sure these fields are returned from the backend
        canisterName: response.data.canisterName,
      };

      // Use setDoc from Juno SDK to store the data
      await setDoc({
        collection: "favourse99",
        doc: {
          key: response.data.canisterId, // This should be a unique identifier for your document
          data: dataToStore,
        },
      });

      setDeploymentResult(response.data);
    } catch (error) {
      setDeploymentResult(error.message);
    }
  };

  return (
    <div>
      <h2>Deploy Canister</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Principal ID: </label>
          <input
            type="text"
            name="principalId"
            value={formData.principalId}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Logo Type: </label>
          <input
            type="text"
            name="logoType"
            value={formData.logoType}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Logo Data: </label>
          <input
            type="text"
            name="logoData"
            value={formData.logoData}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Symbol: </label>
          <input
            type="text"
            name="symbol"
            value={formData.symbol}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Max Limit: </label>
          <input
            type="number"
            name="maxLimit"
            value={formData.maxLimit}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Deploy</button>
      </form>
      {deploymentResult && (
        <div>
          <h3>Deployment Result:</h3>
          <pre>{JSON.stringify(deploymentResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default DeployCanisterForm;
