// App.js
import React, { useState } from "react";
import "./App.css";
import ImageGenerator from "./ImageGenerator";
import defaultImage from "./assets/default-image.webp";

function App() {
  const [userInput, setUserInput] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateImage = async () => {
    console.log('clicked', userInput)

    // setLoading(true);
    if (!userInput) return 0;
    console.log('clicked', userInput)

    const resp = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.AI_API_KEY}`,
      },
      body: JSON.stringify({
        "prompt": userInput,
        "n": 1,
        "size": "512x512"
      })
    });
    console.log("here", resp)
  };

  return (
    <div className="App">
      <div className="container flex">
        <h1 className="animate-charcter">Image Generator App</h1>

        <div className="cover flex">
          <ImageGenerator src={image ? image : defaultImage} />
          <div className="flex input-section">
            <input
              type="text"
              placeholder="Enter text for the image"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button onClick={handleGenerateImage} disabled={loading}>
              Generate Image
            </button>
          </div>
        </div>

        {loading && <div className="loader">Loading...</div>}

      </div>
    </div >
  );
}

export default App;
