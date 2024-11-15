import { useEffect, useCallback } from "react";
import { DashboardHeader } from "../../components/DashboardHeader";
import { PresentationCard } from "../../components/PresentationCard";

import axios from "axios";
import { useError } from "../../contexts/UseError";

export default function Dashboard({ token, store, setStore, setTokenFn }) {
  const { showError } = useError();

  // Gets all presentations from the backend and sets in in our state variable
  const fetchPresentations = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5005/store', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setStore(response.data.store || { presentations: [] });
      } else {
        showError("Failed to get store");
      }
    } catch {
      showError("Failed to get store");
    }
  }, [token, setStore]);

  useEffect(() => {
    fetchPresentations();
  }, [fetchPresentations]);

  const refreshPresentations = () => {
    fetchPresentations();
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <DashboardHeader token={token} onPresentationsUpdated={refreshPresentations} store={store} setStore={setStore} setToken= {setTokenFn} />
        <div className="bg-[#f0f1f2] h-full p-4">
          {store.presentations && store.presentations.length > 0 ? (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {[...store.presentations].reverse().map((presentation) => (
                <PresentationCard
                  key={presentation.presentationId}
                  title={presentation.title}
                  description={presentation.description}
                  numSlides={presentation.slides.length}
                  presentationId={presentation.presentationId}
                  thumbnail={presentation.thumbnail}
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full w-full">
              <p className="text-center text-gray-500 text-lg">No presentations yet!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );  
}