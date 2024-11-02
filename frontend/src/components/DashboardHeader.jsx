import { useState } from 'react';

export function DashboardHeader() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [presentationName, setPresentationName] = useState("");

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleCreatePresentation = () => {
        console.log("Creating presentation:", presentationName);
        setPresentationName("");
        toggleModal();
    };

    return (
        <header className="flex justify-end bg-[#2f2f33] border-black h-20 p-5">
            <button 
                onClick={toggleModal} 
                className="bg-transparent hover:bg-zinc-700 text-white font-semibold hover:text-white py-2 px-4 rounded"
            >
                New Presentation
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-1/3">
                        <h2 className="text-xl font-bold mb-4">Create New Presentation</h2>
                        <input 
                            type="text" 
                            value={presentationName}
                            onChange={(e) => setPresentationName(e.target.value)}
                            placeholder="Enter Presentation Name"
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                        />
                        <div className="flex justify-end">
                            <button 
                                onClick={handleCreatePresentation}
                                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded mr-2"
                            >
                                Create
                            </button>
                            <button 
                                onClick={toggleModal}
                                className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
