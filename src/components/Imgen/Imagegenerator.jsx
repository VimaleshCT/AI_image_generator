import React, { useState, useRef } from "react";
import "./Imagegenerator.css";
import img from "../Assets/im2.svg";

const Imagegenerator = () => {
  const [image_url, setImage_url] = useState("/");
  let inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const API_KEY = "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";
  const imagegenerator = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }
    setLoading(true);
    try {
      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
            "User-Agent": "Chrome",
          },
          body: JSON.stringify({
            prompt: `${inputRef.current.value}`,
            n: 1,
            size: "512x512",
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log("Data:", data);
      if (data.data && data.data.length > 0 && data.data[0].url) {
        setImage_url(data.data[0].url);
        console.log("Data array:", data.data);
      } else {
        throw new Error("Invalid data format");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error, e.g., display an error message to the user
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-image-genertor">
      <div className="header">
        AI Image <span>Generator</span>
      </div>
      <div className="img-loading">
        <div className="image">
          <img src={img === "/" ? img : image_url} alt="" />

          <div className="loading">
            <div className={loading ? "loading-bar-full" : "loading-bar"}>
              <div className={loading ? "loading-text" : "display-none"}>
                Loading...
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="search-box">
        <input
          type="text"
          ref={inputRef}
          className="search-input"
          placeholder="Describe image you need"
        />
        <div
          className="generate-btn"
          onClick={() => {
            imagegenerator();
          }}
        >
          Generate
        </div>
      </div>
    </div>
  );
};

export default Imagegenerator;
