import { useState, useEffect } from "react";
import ColourInput from "../ColourInput";

export default function BackgroundModal({ isOpen, closeBackgroundModal, updateBackground, displaySlide }) {
  const [backgroundType, setBackgroundType] = useState("solid");
  const [colour, setColour] = useState("#ffffff");
  const [secondColour, setSecondColour] = useState("#000000");
  const [gradientDirection, setGradientDirection] = useState("to right");
  const [imageUrl, setImageUrl] = useState("");
  const [defaultBackground, setDefaultBackground] = useState(false);

  useEffect(() => {
    if (displaySlide) {
      const { type, firstColour, secondColour, gradientDirection, src } = displaySlide.backgroundStyle;
      setBackgroundType(type || "solid");
      setColour(firstColour || "#ffffff");
      setSecondColour(secondColour || "#000000");
      setGradientDirection(gradientDirection || "to right");
      setImageUrl(src || "");
    }
  }, [displaySlide]);

  if (!isOpen) return null;

  const handleSubmitBackground = (e) => {
    e.preventDefault();

    const backgroundSettings = {
      type: backgroundType,
      firstColour: backgroundType === "solid" ? colour : (backgroundType === "gradient" ? colour : null),
      secondColour: backgroundType === "gradient" ? secondColour : null,
      gradientDirection: backgroundType === "gradient" ? gradientDirection : null,
      src: backgroundType === "image" ? imageUrl : null,
    };

    updateBackground(backgroundSettings, defaultBackground);
    closeBackgroundModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 w-screen">
      <form 
        onSubmit={handleSubmitBackground}
        className="bg-white rounded-lg p-6 max-w-md sm:w-2/3 lg:w-1/3"
        aria-modal="true" 
        aria-label="Background Selection Modal"
      >
        <h2 className="text-xl font-bold mb-4">Background Settings</h2>

        <label className="block text-lg font-medium mb-2">Background Type:</label>
        <select
          value={backgroundType}
          onChange={(e) => setBackgroundType(e.target.value)}
          className="border p-2 w-full mb-4"
        >
          <option value="solid">Solid Color</option>
          <option value="gradient">Gradient</option>
          <option value="image">Image</option>
        </select>

        {backgroundType === "solid" && (
          <div className="mb-4">
            <ColourInput colour={colour} setColour={setColour} text="Color:" />
          </div>
        )}

        {/* Gradient Picker */}
        {backgroundType === "gradient" && (
          <>
            <ColourInput colour={colour} setColour={setColour} text="First Color:" />
            <ColourInput colour={secondColour} setColour={setSecondColour} text="Second Color:" />
            <label className="block text-lg font-medium mb-2">Gradient Direction:</label>
            <select
              value={gradientDirection}
              onChange={(e) => setGradientDirection(e.target.value)}
              className="border p-2 w-full mb-4"
            >
              <option value="to right">Left to Right</option>
              <option value="to bottom">Top to Bottom</option>
              <option value="to top right">Diagonal (Top Left to Bottom Right)</option>
            </select>
          </>
        )}

        {/* Image URL Input */}
        {backgroundType === "image" && (
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Image URL:</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL"
              className="border p-2 w-full"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Make Default Background?</label>
          <input
            type="checkbox"
            checked={defaultBackground}
            onChange={(e) => setDefaultBackground(e.target.checked)}
            className="border p-2 w-8 transform scale-150"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded mr-2"
          >
            Apply
          </button>
          <button
            type="button"
            onClick={closeBackgroundModal}
            className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

