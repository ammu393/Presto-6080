import { useEffect, useState } from "react";
import { DashboardHeader } from "../../components/DashboardHeader";
import { PresentationCard } from "../../components/PresentationCard";
import axios from "axios";

export default function Dashboard({ token, setToken }) {
  const [store, setStore] = useState({ presentations: [] });

  const fetchPresentations = async () => {
    try {
      const response = await axios.get('http://localhost:5005/store', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log(response);
        setStore(response.data.store || { presentations: [] });
      } else {
        console.log("Error: ", response.data);
      }
    } catch (error) {
      console.error("An error occurred:", error.response ? error.response.data : error.message);
    }
  };

  // UseEffect to fetch presentations on component mount and token change
  useEffect(() => {
    fetchPresentations();
  }, [token]);

  // Function to refresh presentations when a new one is created
  const refreshPresentations = () => {
    fetchPresentations();
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <DashboardHeader token={token} onPresentationsUpdated={refreshPresentations} store={store} setStore={setStore} />
        <div className="bg-[#f0f1f2] h-full p-4">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {store.presentations.map((presentation) => (
              <PresentationCard
                key={presentation.presentationId}
                title={presentation.title}
                presentationId={presentation.presentationId}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}