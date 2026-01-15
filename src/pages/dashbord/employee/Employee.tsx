import { FileText, PieChart, Wallet, LayoutGrid, MessageSquare, ClipboardList } from "lucide-react"
import { useState } from "react"
import AppSidebar from "../../../components/Appside"
import MyHolidays from "../../../components/MyHolidays"
import DashbordEmployee from "../../../components/DashbordEmployee"
import MyPayEmployee from "../../../components/MyPayEmployee"
import MyDocumentsEmployee from "../../../components/MyDocumentsEmployee"
import Profile from "../../../components/Profile"
import MySurveys from "../../../components/MySurveys"
import MyTasks from "../../../components/MyTasks"

const employeeMenuItems = [
    { title: "Tableau de bord", url: "/dashbord/employee", icon: LayoutGrid },
    { title: "Mes Tâches", url: "/my-tasks", icon: ClipboardList },
    { title: "Mes Congés", url: "/my-leave", icon: PieChart },
    { title: "Ma Paie", url: "/my-payroll", icon: Wallet },
    { title: "Sondages", url: "/my-surveys", icon: MessageSquare },
    { title: "Mes Documents", url: "/my-documents", icon: FileText },
];

const Employee = () => {
    // Étate simple pour la navigation (requis pour le composant AppSidebar)
    const [currentLink, setCurrentLink] = useState("/dashbord/employee");

    const Nav = () => {
        if (currentLink === "/dashbord/employee") {
            return <DashbordEmployee setCurrentLink={setCurrentLink} />
        }

        if (currentLink === "/my-leave") {
            return <MyHolidays />
        }

        if (currentLink === "/my-payroll") {
            return <MyPayEmployee />
        }

        if (currentLink === "/my-surveys") {
            return <MySurveys />
        }

        if (currentLink === "/my-documents") {
            return <MyDocumentsEmployee />
        }

        if (currentLink === "/my-tasks") {
            return <MyTasks />
        }

        if (currentLink === "/profile") {
            return <Profile />
        }


    }

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content flex flex-col">
                {/* Mobile Navbar */}
                <div className="lg:hidden flex items-center p-4 bg-white border-b border-gray-100 sticky top-0 z-50">
                    <label htmlFor="my-drawer" className="btn btn-ghost drawer-button">
                        <LayoutGrid className="w-6 h-6 text-violet-600" />
                    </label>
                    <span className="ml-2 font-bold text-gray-900">Chronos</span>
                </div>

                {/* Main Content Area */}
                <main className="flex-1 min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 transition-all duration-300">
                    {Nav()}
                </main>
            </div>

            <div className="drawer-side z-50">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <AppSidebar setLinknav={setCurrentLink} items={employeeMenuItems} />
            </div>
        </div>
    )
}

export default Employee
