import React, { useState } from "react";
import { ComputerVisionClient } from "@azure/cognitiveservices-computervision";
import { ApiKeyCredentials } from "@azure/ms-rest-js";

import "./App.css";

function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [imageCaption, setImageCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = "28b2eba1113046af9d53a44f9ae99d6c";
  const endpoint =
    "https://computer-vision-instanse-ppu.cognitiveservices.azure.com/";

  const credentials = new ApiKeyCredentials({
    inHeader: { "Ocp-Apim-Subscription-Key": apiKey },
  });
  const client = new ComputerVisionClient(credentials, endpoint);

  const handleImageSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await client.describeImage(imageUrl, { language: "en" });
      setImageCaption(response.captions[0].text);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <div className="container">
      <div className="App">
        <h1>Cognitive Services Computer Vision</h1>

        <form onSubmit={handleImageSubmit}>
          <input
            type="text"
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            placeholder="Enter image URL"
          />
          <button type="submit">Analyze</button>
        </form>
        <div className="image-container">
          {imageUrl && <img src={imageUrl} alt="Analyzed image" />}
        </div>
        {isLoading && <p>Loading...</p>}
        {imageCaption && <p className="caption">{imageCaption}</p>}
      </div>
    </div>
  );
}

export default App;
