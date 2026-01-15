import { useEffect, useState } from "react"
import { LayoutGrid } from "lucide-react"
import AddNewEmployee from "../../../components/AddNewEmployee"
import AppSidebar from "../../../components/Appside"
import Attendance from "../../../components/Attendance"
import Dashboard from "../../../components/Dashboard"
import Employees from "../../../components/Employees"
import LeaveManagement from "../../../components/LeaveManagement"
import Payroll from "../../../components/Payroll"
import Profile from "../../../components/Profile"
import AdminSurveys from "../../../components/AdminSurveys"
import AdminTasks from "../../../components/AdminTasks"
import TaskCalendar from "../../../components/TaskCalendar"
import AdvancedStats from "../../../components/AdvancedStats"
const Admin = () => {

    const [linknav, setLinknav] = useState("")
    const Nav = (linknav: string) => {


        if (linknav === "/" || !linknav) {
            return <Dashboard />;
        }

        if (linknav === "/employees") {
            return <Employees />;
        }

        if (linknav === "/attendance") {
            return <Attendance />;
        }

        if (linknav === "/leave") {
            return <LeaveManagement />;
        }


        if (linknav === "/payroll") {
            return <Payroll />;
        }


        if (linknav === "/new-employees") {
            return <AddNewEmployee />;
        }


        if (linknav === "/profile") {
            return <Profile />
        }

        if (linknav === "/surveys") {
            return <AdminSurveys />
        }

        if (linknav === "/tasks") {
            return <AdminTasks />
        }

        if (linknav === "/task-calendar") {
            return <TaskCalendar />
        }

        if (linknav === "/advanced-stats") {
            return <AdvancedStats />
        }

        // Le "default" du switch devient le retour final
        return <Dashboard />;

    }

    useEffect(() => {
        console.log("linknav", linknav)
    }, [linknav])

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content flex flex-col">
                {/* Mobile Navbar */}
                <div className="lg:hidden flex items-center p-4 bg-white border-b border-gray-100 sticky top-0 z-50">
                    <label htmlFor="my-drawer" className="btn btn-ghost drawer-button">
                        <LayoutGrid className="w-6 h-6 text-violet-600" />
                    </label>
                    <span className="ml-2 font-bold text-gray-900">Chronos Admin</span>
                </div>

                {/* Main Content Area */}
                <main className="flex-1 min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 transition-all duration-300">
                    {Nav(linknav)}
                </main>
            </div>

            <div className="drawer-side z-50">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <AppSidebar setLinknav={setLinknav} />
            </div>
        </div>
    )
}
export default Admin
