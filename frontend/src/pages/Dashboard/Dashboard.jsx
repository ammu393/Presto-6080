import { DashboardHeader } from "../../components/DashboardHeader";
import { PresentationCard } from "../../components/PresentationCard";

export default function Dashboard() {
    return (
        <>
            <div className="flex flex-col h-screen">
                <DashboardHeader />
                <div className="bg-[#f0f1f2] h-full">
                    <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(100px,1fr))]">
                        <PresentationCard />
                    </div>
                </div>
            </div>
        </>
    )
}