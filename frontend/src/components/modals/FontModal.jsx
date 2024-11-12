import { useEffect, useState } from "react";

export default function FontModal({ isOpen, closeFontModal, displaySlide, updateSlideFont }) {
  if (!isOpen) return null;

  const [fontFamily, setFontFamily] = useState(displaySlide.fontFamily);
  
  useEffect(() => {
    setFontFamily(displaySlide.fontFamily);
  }, [displaySlide])


  const handleSubmitText = async (e) => {
    e.preventDefault();
    updateSlideFont(fontFamily, displaySlide);
    closeFontModal();
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 w-screen">
      <form onSubmit={handleSubmitText} className="bg-white rounded-lg p-6 w-1/3">
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

