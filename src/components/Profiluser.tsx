
import { ChevronDown } from "lucide-react";
import logout from "../controllers/logout";
import EmployeeStore from "../Store/EmployeeStore";
const Profiluser = ({ setLinknav }: { setLinknav: React.Dispatch<React.SetStateAction<string>> }) => {
    const { Employee } = EmployeeStore()
    return (
        <>
            {/* Profil utilisateur */}
            <div className="dropdown dropdown-top dropdown-end mb-5 ">
                <label
                    tabIndex={0}
                    className="btn

                    m-1 flex items-center gap-3 pl-2 pr-3 py-1.5 rounded-xl"
                >
                    <div className="relative ">
                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-md">
                            <span className="text-white font-bold">M</span>
                        </div>
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                    </div>

                    <div className="flex flex-col items-start">
                        <span className="text-sm text-center font-semibold text-gray-900">
                            {Employee?.fullname}
                        </span>
                        <span className="text-[10px] text-gray-500"> {Employee?.post}</span>
                    </div>

                    <ChevronDown className="w-4 h-4 text-gray-400" />
                </label>

                <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100  rounded-box z-1 w-52 p-2 shadow"
                >
                    <li>
                        <button
                            onClick={() => {
                                setLinknav("/profile")
                            }}>
                            Profil
                        </button>
                    </li>
                    <li className="text-error">
                        <label htmlFor="my_modal_6" >Déconnexion</label>

                    </li>
                </ul>
            </div>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box bg-violet-2 max-w-60">

                    <h3 className="text-lg font-bold text-center">
                        Êtes-vous sûr de vouloir <br />
                        vous déconnecter ?
                    </h3>

                    <div className="modal-action mt-10  justify-center">
                        <button className="btn bg-red-400 text-white " onClick={() => {
                            logout()
                        }}>
                            Deconnexion
                        </button>
                        <label htmlFor="my_modal_6" className="btn bg-blue-100 text-black">Anuller!</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profiluser
