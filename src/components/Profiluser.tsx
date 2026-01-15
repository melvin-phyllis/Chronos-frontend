import { ChevronDown, LogOut, User } from "lucide-react";
import React from 'react';
import EmployeeStore from "../Store/EmployeeStore";

const Profiluser = ({ setLinknav }: { setLinknav: React.Dispatch<React.SetStateAction<string>> }) => {
    const { Employee } = EmployeeStore()

    return (
        <div className="w-full px-2 mb-2">
            <div className="dropdown dropdown-top dropdown-end w-full">
                <div
                    tabIndex={0}
                    role="button"
                    className="flex items-center gap-3 p-3 w-full rounded-xl hover:bg-violet-50 cursor-pointer transition-all border border-transparent hover:border-violet-100 group"
                >
                    <div className="relative shrink-0">
                        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/20 text-white font-bold group-hover:scale-105 transition-transform">
                            {Employee?.fullname ? Employee.fullname.charAt(0).toUpperCase() : "U"}
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                    </div>

                    <div className="flex flex-col items-start overflow-hidden flex-1">
                        <span className="text-sm font-bold text-gray-900 truncate w-full">
                            {Employee?.fullname || "Utilisateur"}
                        </span>
                        <span className="text-xs text-gray-500 truncate w-full font-medium">
                            {Employee?.post || "Employé"}
                        </span>
                    </div>

                    <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-violet-500 transition-colors" />
                </div>

                <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow-xl bg-white rounded-2xl w-60 z-50 mb-2 border border-gray-100"
                >
                    <li className="mb-1">
                        <button
                            onClick={() => setLinknav("/profile")}
                            className="flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-violet-50 text-gray-700 hover:text-violet-700 font-medium transition-colors"
                        >
                            <User className="w-4 h-4" />
                            Mon Profil
                        </button>
                    </li>
                    <div className="h-px bg-gray-100 my-1 mx-2"></div>
                    <li>

                        <label htmlFor="my_modal_6"
                            className="flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-rose-50 text-rose-600 hover:text-rose-700 font-medium transition-colors">
                            <LogOut className="w-4 h-4" />
                            Déconnexion
                        </label>

                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Profiluser
