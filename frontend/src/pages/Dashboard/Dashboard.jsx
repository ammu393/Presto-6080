import { DashboardHeader } from "../../components/DashboardHeader";

export default function Dashboard() {
    return (
        <>
            <div className="flex flex-col h-screen">
                <DashboardHeader />
                <div className="bg-red"></div>
            </div>
        </>
    )
}