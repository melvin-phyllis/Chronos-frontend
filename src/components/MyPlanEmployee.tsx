import { Calendar, CheckCircle, Ellipsis, MoreHorizontal, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import getAlltaskEmployee from "../controllers/getAlltaskEmployee"
import EmployeeStore from "../Store/EmployeeStore"
import CreatenoteEmployee from "./CreatenoteEmployee"
import UpdatenoteEmployee from "./UpdatenoteEmployee"
import type { formAddTAskType } from "../types"
import deleteTask from "../controllers/deletetask"

const MyPlanEmployee = () => {

    const { setTasks, Tasks, Employee } = EmployeeStore()

    const [status, setStatus] = useState<string>("progress")

    const [updateTask, setUpdateTask] = useState<formAddTAskType>()

    const search = (index: string) => {
        let total = 0
        Tasks.forEach(item => {
            if (item?.status == index) {
                total++
            }
        })
        return total
    }


    useEffect(() => {

        getAlltaskEmployee(setTasks, Employee)


    }, [])
    return (
        <div className="space-y-6 animate-in fade-in duration-500 select-none">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Mon Planning & Tâches</h1>
                    <p className="text-sm text-gray-500 mt-1">Suivez vos tâches assignées et votre emploi du temps</p>
                </div>
                <div className="flex gap-2">
                    <label htmlFor="my_modal_note" className="btn flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-xl shadow-sm shadow-violet-200 transition-colors  border-none h-auto min-h-0 normal-case">
                        <Plus className="w-4 h-4" />
                        <span className="hidden sm:inline">Ajouter note</span>
                    </label>
                </div>
            </div>

            {/* Kanban Board */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">

                {/* Column: To Do */}
                <button className="btn space-y-4  btn-soft btn-primary" onClick={() => setStatus("progress")}>
                    <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                            <h3 className="font-semibold ">À Faire</h3>
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">{search("progress")} </span>
                        </div>
                        <MoreHorizontal className="w-4 h-4 text-gray-400 " />
                    </div>
                </button>

                {/* Column: In Progress */}
                <button className="btn space-y-4" onClick={() => setStatus("todo")}>
                    <div className="flex items-center justify-between pb-2 border-b border-violet-200">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-violet-500"></div>
                            <h3 className="font-semibold text-gray-700">En Cours</h3>
                            <span className="px-2 py-0.5 bg-violet-50 text-violet-600 text-xs rounded-full font-medium">{search("todo")}</span>
                        </div>
                        <MoreHorizontal className="w-4 h-4 text-gray-400 " />
                    </div>

                </button>

                {/* Column: Done */}
                <button className="btn space-y-4 btn-soft btn-success" onClick={() => setStatus("done")}>
                    <div className="flex items-center justify-between pb-2 border-b border-emerald-200">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                            <h3 className="font-semibold ">Terminé</h3>
                            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-xs rounded-full font-medium">{search("done")}</span>
                        </div>
                        <MoreHorizontal className="w-4 h-4 text-gray-400 " />
                    </div>

                </button>


            </div>
            <div className="w-full  grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-3   ">
                {Tasks?.filter(item => item?.status == status).map((item, index) => (

                    <div key={item._id || index} className={`${item?.status == "done" ?
                        "bg-gray-50 p-4 rounded-xl border border-gray-200 opacity-75 hover:opacity-100 transition-opacity "
                        : " bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-violet-200 transition-all  group"}`} >

                        <div className="flex justify-between items-start mb-2">
                            <span className={`${item?.status == "done" ? "bg-emerald-50 text-emerald-600  " : "bg-red-50 text-red-600"} px-2 py-1  text-[10px] font-bold uppercase tracking-wide rounded`} >{item?.priorite}</span>

                            {item?.status !== "done" ?

                                (<div className="dropdown dropdown-end">

                                    <div tabIndex={0} role="button" className="m-1">
                                        <Ellipsis />
                                    </div>
                                    <ul className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                        <li>
                                            <button className="btn" onClick={() => {
                                                const id = document.getElementById('my_modal_5') as HTMLDialogElement;
                                                id.showModal()
                                                setUpdateTask(item)
                                            }}>Supprimer la tache
                                            </button>
                                        </li>
                                        <li>
                                            <button className="btn" onClick={() => {
                                                const id = document.getElementById('my_modal_1') as HTMLDialogElement;
                                                id.showModal()
                                                setUpdateTask(item)
                                            }}>Mettre a jour la tache
                                            </button>
                                        </li>
                                    </ul>
                                </div>

                                ) :
                                (
                                    <div className="bg-emerald-100 p-1 rounded-full">
                                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                                    </div>
                                )}
                        </div>

                        <h4 className={`${item?.status == "done" && "line-through "} font-semibold text-gray-900 mb-1`} >{item?.title}</h4>

                        <p className={`${item?.status == "done" && "hidden"} text-xs text-gray-500 mb-4 line-clamp-2 `} >{item?.notes}</p>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                            <div className="flex -space-x-2">
                                <img className="w-6 h-6 rounded-full border-2 border-white" src="/122871.jpg" alt="Avatar" />
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{item?.expiryDate}</span>
                            </div>
                        </div>
                    </div>

                ))}

            </div>
            {/* Modal for Creating Note */}
            <input type="checkbox" id="my_modal_note" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <CreatenoteEmployee />
                    <div className="modal-action hidden">
                        <label htmlFor="my_modal_note" id="my_modal_note" className="btn">Close!</label>
                    </div>
                </div>
            </div>


            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <UpdatenoteEmployee updateTask={updateTask!} />
                    <div className="modal-action hidden">
                        <form method="dialog">
                            <button id="my_modal_2" className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>



            <dialog id="my_modal_5" className="modal">
                <div className="modal-box">
                    <p className="py-4 text-xl text-center">Voulez vous vraiment supprimer ce element ? </p>
                    <div className="modal-action">
                        <form method="dialog" className="flex justify-center gap-2">
                            <button className="btn btn-error" onClick={() => deleteTask(updateTask!, Tasks, setTasks)}>Oui</button>
                            <button className="btn">Non</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    )
}

export default MyPlanEmployee
