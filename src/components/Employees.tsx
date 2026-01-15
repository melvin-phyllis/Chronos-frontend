import { ChevronDown, Filter, Search, Users } from "lucide-react"
import { useEffect, useState } from "react"
import filterSearch from "../controllers/filterSearch"
import getEmployee from "../controllers/getEmployee"
import searchemployee from "../controllers/searchemployee"
import EmployeeStore from "../Store/EmployeeStore"
import type { employeeType } from "../types"
import EmployeeCardsGrid from "./EmployeeCardsGrid"

const Employees = () => {
    const { ListEmployees, setEmployees } = EmployeeStore()

    const [search, setSearch] = useState("")
    const [status, setStatus] = useState(true)
    const [employeeSearch, setEmployeeSearch] = useState<employeeType[]>([])

    const [page, setPage] = useState(1)

    const [totalPages, setTotalPages] = useState(1)

    const [filter, setFilter] = useState("")

    const Handlechange = (e: React.ChangeEvent<HTMLSelectElement>) => {

        const { value } = e.target

        setFilter(value)


    }

    useEffect(() => {
        console.log(page)
        getEmployee(setEmployees, page, setTotalPages)

    }, [page])

    console.log(totalPages)


    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Left - Title & Search */}
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-violet-100 rounded-xl">
                            <Users className="w-6 h-6 text-violet-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
                            <p className="text-sm text-gray-500">Manage your team members</p>
                        </div>
                    </div>

                    {/* Right - Search & Add */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                onChange={(e) => setSearch(e?.target?.value)}
                                type="search"
                                placeholder="Recherche nom ou EMP-***"
                                className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"

                            />
                            <button className={`btn  btn-outline rounded-xl ${!status && "bg-red-300"}`} onClick={() => {
                                if (status) {
                                    searchemployee(search, setEmployeeSearch)
                                    setStatus(false)
                                }
                                if (!status) {
                                    setEmployeeSearch([])
                                    setStatus(true)
                                }
                            }}>{status ? "recherche" : "annuler recherche"} </button>
                        </div>

                    </div>
                </div>

                {/* Filters Row */}
                <div className="flex justify-between  items-center gap-3 mt-3 pt-3 border-t border-gray-100">
                    <div className="flex justify-center flex-wrap items-center  gap-5">


                        <div className="gap-3 md:flex hidden">
                            <div className="relative flex gap-4 ">
                                <span className="text-sm font-medium text-gray-500 flex items-center gap-2">
                                    <Filter className="w-4 h-4" />
                                    Filters:
                                </span>
                                <select name="departement"
                                    className="appearance-none pl-4 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer hover:bg-gray-100 transition-colors"
                                    onChange={(e) => Handlechange(e)}>
                                    <option value="" disabled>Sélectionner un département</option>
                                    <option value="Ressources Humaines">Ressources Humaines</option>
                                    <option value="Informatique / IT">Informatique / IT</option>
                                    <option value="Finance & Comptabilité">Finance & Comptabilité</option>
                                    <option value="Marketing & Communication">Marketing & Communication</option>
                                    <option value="Commercial / Ventes">Commercial / Ventes</option>
                                    <option value="Production / Technique">Production / Technique</option>
                                    <option value="Logistique / Supply Chain">Logistique / Supply Chain</option>
                                    <option value="Service Client">Service Client</option>
                                </select>

                                <ChevronDown className="absolute  right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />

                            </div>

                            <div className="bg-white">
                                <button className={`btn  btn-outline rounded-xl ${!status && "bg-red-300"}`}
                                    onClick={() => {
                                        if (status) {

                                            console.log(filter)
                                            filterSearch(ListEmployees, setEmployeeSearch, filter)
                                            setStatus(false)
                                        }
                                        if (!status) {
                                            setEmployeeSearch([])
                                            setStatus(true)
                                        }
                                    }}
                                >Appliquer</button>
                            </div>

                        </div>


                    </div>


                    <div className="join   ">
                        <button className="join-item btn" onClick={() => { if (page > 1) setPage(page - 1) }}>«1</button>
                        <button className="join-item btn">Page {page}</button>
                        <button className="join-item btn" onClick={() => { if (page < totalPages) setPage(page + 1) }}>{totalPages} »</button>
                    </div>
                </div>
            </div>

            {/* Employee Cards Grid */}
            <EmployeeCardsGrid ListEmployees={ListEmployees} employeeSearch={employeeSearch} />

        </div>
    )
}

export default Employees
