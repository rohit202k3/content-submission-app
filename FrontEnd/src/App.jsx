import React, { useState } from "react";
import "./App.css";

function App() {
  const [heading, setHeading] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [bgImage, setBgImage] = useState("");
  const [textColor, setTextColor] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const validate = () => {
    let err = {};

    if (!heading) err.heading = "Heading required";
    if (!paragraph) err.paragraph = "Paragraph required";
    if (!bgImage) err.bgImage = "Image URL required";

    const hexRegex = /^#([0-9A-F]{3}){1,2}$/i;
    if (!textColor) {
      err.textColor = "Color required";
    } else if (!hexRegex.test(textColor)) {
      err.textColor = "Invalid HEX color";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!validate()) return;

    try {
      const res = await fetch("http://localhost:5000/api/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          heading,
          paragraph,
          bgImage,
          textColor,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error);
      } else {
        setMessage("✅ Success! Data submitted");
      }
    } catch (err) {
      setMessage("❌ Server error");
    }
  };

  return (
    <div className="container">

      {/* LEFT SIDE */}
      <div className="left">
        <h2>✨ FORM</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Heading"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
          <p className="error">{errors.heading}</p>

          <textarea
            placeholder="Paragraph"
            value={paragraph}
            onChange={(e) => setParagraph(e.target.value)}
          />
          <p className="error">{errors.paragraph}</p>

          <input
            type="text"
            placeholder="Background Image URL"
            value={bgImage}
            onChange={(e) => setBgImage(e.target.value)}
          />
          <p className="error">{errors.bgImage}</p>

          <input
            type="text"
            placeholder="#000000"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
          />
          <p className="error">{errors.textColor}</p>

          <button type="submit">Submit</button>
        </form>

        {message && <p className="message">{message}</p>}
      </div>

      {/* RIGHT SIDE PREVIEW */}
      <div
        className="right"
        style={{
          backgroundImage: `url(${bgImage || "https://via.placeholder.com/800"})`,
          color: textColor || "#fff",
        }}
      >
        <div className="overlay">
          <h1>{heading || "Your Heading"}</h1>
          <p>{paragraph || "Your paragraph will appear here..."}</p>
        </div>
      </div>

    </div>
  );
}

export default App;
