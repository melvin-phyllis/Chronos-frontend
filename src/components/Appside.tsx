
import {
    Calendar,
    CreditCard,
    FileX,
    TrendingUp,
    UserCheck,
    Users,
    MessageSquare,
    ClipboardList,
    CalendarDays,
    BarChart3,
} from "lucide-react";

import { useLocation } from "react-router-dom";
import Profiluser from "./Profiluser";


const menuItems = [
    { title: "Performance", url: "/performance", icon: TrendingUp },
    { title: "Employés", url: "/employees", icon: Users },
    { title: "Nouveau employé", url: "/new-employees", icon: Calendar },
    { title: "Présences", url: "/attendance", icon: UserCheck },
    { title: "Tâches", url: "/tasks", icon: ClipboardList },
    { title: "Calendrier Tâches", url: "/task-calendar", icon: CalendarDays },
    { title: "Sondages", url: "/surveys", icon: MessageSquare },
    { title: "Gestion des congés", url: "/leave", icon: FileX },
    { title: "Paie", url: "/payroll", icon: CreditCard },
    { title: "Statistiques", url: "/advanced-stats", icon: BarChart3 },
];

const AppSidebar = ({ setLinknav, items = menuItems }: { setLinknav: React.Dispatch<React.SetStateAction<string>>, items?: { title: string, url: string, icon: any }[] }) => {
    const location = useLocation();

    return (
        <aside className="w-64 min-h-full bg-sidebar border-r border-sidebar-border flex flex-col bg-white">
            <div className="flex justify-center items-center py-4">
                <img src="/téléchargement (1).png" alt="" className="w-40" />
            </div>
            <nav className="flex-1 px-3 py-2">
                <ul className="space-y-1">
                    {items.map((item) => {
                        const isActive = location.pathname === item.url;
                        const Icon = item.icon;

                        return (
                            <li key={item.title}>
                                <button
                                    onClick={() => {
                                        setLinknav(item.url);
                                        // Auto-close drawer on mobile
                                        const drawerToggle = document.getElementById('my-drawer') as HTMLInputElement;
                                        if (drawerToggle) drawerToggle.checked = false;
                                    }}
                                    className={`w-full group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 border-none
                                        ${isActive
                                            ? "bg-violet-600 text-white shadow-lg shadow-violet-200"
                                            : "text-gray-500 hover:bg-violet-50 hover:text-violet-600"}
                                    `}
                                >
                                    <Icon className={`w-5 h-5 transition-colors ${isActive ? "text-white" : "text-gray-400 group-hover:text-violet-600"}`} strokeWidth={2} />
                                    <span className="flex-1 text-left">{item.title}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            <div className="p-4 border-t border-gray-50">
                <Profiluser setLinknav={setLinknav} />
            </div>
        </aside>
    );
};

export default AppSidebar;
