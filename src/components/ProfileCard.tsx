import { Calendar, Edit, Github, Linkedin, Mail, MapPin, Phone, Twitter, User } from "lucide-react"
import type { employeeType } from "../types"

const ProfileCard = ({ employee }: { employee: employeeType | undefined }) => {
    return (
        <>
            <div className="flex md:flex-row flex-col lg:flex-col gap-6 lg:w-80">
                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    {/* Header gradient */}
                    <div className="h-20 bg-linear-to-br from-violet-500 via-purple-500 to-pink-500"></div>

                    <div className="px-6 pb-6 -mt-12">
                        <div className="flex flex-col items-center ">
                            <img
                                src="/122871.jpg"
                                alt="Profile"
                                className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white shadow-lg"
                            />
                            <h2 className="text-md font-bold text-gray-900 mt-4">{employee?.fullname} </h2>
                            <p className="text-sm text-gray-500">{employee?.post}</p>

                            <div className="flex items-center gap-3 mt-4">
                                <span className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-mono rounded-lg">
                                    {employee?.employeeCode}
                                </span>
                                <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-lg flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                                    Active
                                </span>
                            </div>
                        </div>

                        {/* Employment Info */}
                        <div className="mt-6 bg-gray-50 rounded-xl divide-y divide-gray-100">
                            <div className="flex items-center justify-between px-4 py-3">
                                <span className="text-sm text-gray-500">Employment Type</span>
                                <span className="text-sm font-semibold text-gray-800">{employee?.contractType}</span>
                            </div>
                            <div className="flex items-center justify-between px-4 py-3">
                                <span className="text-sm text-gray-500">Work Model</span>
                                <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-lg">{employee?.workingMethod}</span>
                            </div>
                            <div className="flex items-center justify-between px-4 py-3">
                                <span className="text-sm text-gray-500">Join Date</span>
                                <span className="text-sm font-semibold text-gray-800">{employee?.dateOfHire ? new Date(employee?.dateOfHire).toLocaleDateString() : "Date non disponible"}</span>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                            <span className="text-sm text-gray-500">Social Media</span>
                            <div className="flex gap-2">
                                <button className="p-2 bg-gray-100 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-colors">
                                    <Linkedin className="w-4 h-4" />
                                </button>
                                <button className="p-2 bg-gray-100 rounded-lg hover:bg-sky-100 hover:text-sky-500 transition-colors">
                                    <Twitter className="w-4 h-4" />
                                </button>
                                <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                                    <Github className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Personal Info Card */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-gray-900">Personal Info</h2>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Edit className="w-4 h-4 text-gray-400" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-violet-100 rounded-lg">
                                <User className="w-4 h-4 text-violet-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Gender</p>
                                <p className="text-sm font-semibold text-gray-800">Female</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-blue-100 rounded-lg">
                                <Calendar className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Date of Birth</p>
                                <p className="text-sm font-semibold text-gray-800">{employee?.dateOfBirth ? new Date(employee?.dateOfBirth).toLocaleDateString() : "Date non disponible"}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-emerald-100 rounded-lg">
                                <Mail className="w-4 h-4 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Email</p>
                                <p className="text-sm font-semibold text-gray-800">{employee?.email} </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-amber-100 rounded-lg">
                                <Phone className="w-4 h-4 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Phone</p>
                                <p className="text-sm font-semibold text-gray-800">{employee?.phone?.countryCode} {employee?.phone?.phoneNumber}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-rose-100 rounded-lg">
                                <MapPin className="w-4 h-4 text-rose-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Address</p>
                                <p className="text-sm font-semibold text-gray-800">{employee?.address}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileCard
