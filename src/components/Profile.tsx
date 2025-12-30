import { Briefcase, Building, Calendar, Mail, MapPin, Phone, Shield, User } from "lucide-react"
import EmployeeStore from "../Store/EmployeeStore"

const Profile = () => {

    const { Employee } = EmployeeStore()



    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                    <img
                        src="/122871.jpg"
                        alt={Employee?.fullname?.toString() || "Profile"}
                        className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
                    />
                    <div className="absolute bottom-0 right-0 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></div>
                </div>
                <div className="text-center md:text-left flex-1">
                    <h1 className="text-2xl font-bold text-gray-900">{Employee?.fullname}</h1>
                    <p className="text-gray-500 flex items-center justify-center md:justify-start gap-2 mt-1">
                        <Briefcase className="w-4 h-4" />
                        {Employee?.post} • {Employee?.department}
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
                        <span className="px-3 py-1 bg-violet-50 text-violet-700 text-xs font-medium rounded-full border border-violet-100">
                            {Employee?.contractType}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full border border-gray-200">
                            {Employee?.workingMethod}
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <User className="w-5 h-5 text-violet-600" />
                            Informations Personnelles
                        </h2>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-gray-50 rounded-lg text-gray-500 shrink-0">
                                <Mail className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Email Professionnel</p>
                                <p className="text-sm font-medium text-gray-900">{Employee?.email}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-gray-50 rounded-lg text-gray-500 shrink-0">
                                <Phone className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Téléphone</p>
                                <p className="text-sm font-medium text-gray-900">{Employee?.phone?.phoneNumber || "Non renseigné"}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-gray-50 rounded-lg text-gray-500 shrink-0">
                                <MapPin className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Adresse</p>
                                <p className="text-sm font-medium text-gray-900">{Employee?.address || "Non renseignée"}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-gray-50 rounded-lg text-gray-500 shrink-0">
                                <Calendar className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Date de Naissance</p>
                                <p className="text-sm font-medium text-gray-900">
                                    {Employee?.dateOfBirth ? new Date(Employee?.dateOfBirth).toLocaleDateString('fr-FR') : "N/A"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Professional Information */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <Building className="w-5 h-5 text-blue-600" />
                            Poste & Entreprise
                        </h2>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between py-2 border-b border-gray-50">
                            <span className="text-sm text-gray-500">Matricule</span>
                            <span className="text-sm font-medium text-gray-900 font-mono bg-gray-50 px-2 py-1 rounded">{Employee?.employeeCode || "N/A"}</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-gray-50">
                            <span className="text-sm text-gray-500">Département</span>
                            <span className="text-sm font-medium text-gray-900">{Employee?.department}</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-gray-50">
                            <span className="text-sm text-gray-500">Date d'embauche</span>
                            <span className="text-sm font-medium text-gray-900">
                                {Employee?.dateOfHire ? new Date(Employee?.dateOfHire).toLocaleDateString('fr-FR') : "N/A"}
                            </span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-gray-50">
                            <span className="text-sm text-gray-500">Ancienneté</span>
                            <span className="text-sm font-medium text-gray-900">Calcul en cours...</span>
                        </div>
                    </div>
                </div>

                {/* Emergency Contact */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-red-500" />
                            Contact d'Urgence
                        </h2>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-8">
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Nom Complet</p>
                            <p className="text-sm font-medium text-gray-900 mt-1">{Employee?.emergencyContact?.fullname || "Non renseigné"}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Téléphone</p>
                            <p className="text-sm font-medium text-gray-900 mt-1">{Employee?.emergencyContact?.phone?.phoneNumber || "Non renseigné"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
