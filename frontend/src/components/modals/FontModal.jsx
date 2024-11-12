import { useEffect, useState } from "react";

export default function FontModal({ isOpen, closeFontModal, displaySlide, updateSlideFont }) {
  const [fontFamily, setFontFamily] = useState("");
  
  useEffect(() => {
    if (displaySlide) {
      setFontFamily(displaySlide.fontFamily);
    }
  }, [displaySlide])

  if (!isOpen) return null;

  const handleSubmitText = async (e) => {
    e.preventDefault();
    updateSlideFont(fontFamily, displaySlide);
    closeFontModal();
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 w-screen">
      <form 
        onSubmit={handleSubmitText}
        className="bg-white rounded-lg p-6 max-w-md sm:w-2/3 lg:w-1/3"
        aria-label="Font adjustment modal"
        aria-modal="true"
      >
        <h2 className="text-xl font-bold mb-4">Set Slide Font</h2>

        <label className="block text-lg font-medium mb-2">Font Family:</label>
        <select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          className="border p-2 w-full mb-4"
        >
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
        </select>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded mr-2"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={closeFontModal}
            className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

