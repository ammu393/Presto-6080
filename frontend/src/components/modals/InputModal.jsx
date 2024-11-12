import { useState } from 'react';

export default function InputModal({ 
  title, 
  placeholder, 
  submitText, 
  isOpen, 
  onClose, 
  onSubmit 
}) {
  const [inputValue, setInputValue] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputValue);
    setInputValue("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4" aria-label="Input modal">
      <div className="bg-white rounded-lg p-6 w-full max-w-md sm:w-2/3 lg:w-1/3">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <form onSubmit={handleFormSubmit}>
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholder}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <div className="flex justify-end space-x-2">
            <button 
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
            >
              {submitText}
            </button>
            <button 
              type="button"
              onClick={() => {
                onClose();
                setInputValue("");
              }}
              className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
