import { useEffect } from "react";
import { DashboardHeader } from "../../components/DashboardHeader";
import { PresentationCard } from "../../components/PresentationCard";
import axios from "axios";

export default function Dashboard({ token, setToken }) {

  useEffect(() => {
    const getPresentations = async () => {
      try {
        const response = await axios.get('http://localhost:5005/store', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          console.log("this is from get response: ", response.data);
        } else {
          console.log("Error: ", response.data);
        }
      } catch (error) {
        console.error("An error occurred:", error.response ? error.response.data : error.message);
      }
    };

    getPresentations();

  }, [token]); 

  return (
    <>
      <div className="flex flex-col h-screen">
        <DashboardHeader token={token}/>
        <div className="bg-[#f0f1f2] h-full">
          <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(100px,1fr))]">
            <PresentationCard />
          </div>
        </div>
      </div>
    </>
  )
}