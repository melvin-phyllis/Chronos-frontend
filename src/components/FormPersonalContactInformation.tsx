import { AlertCircle, Calendar, Mail, MapPin, Phone, User } from "lucide-react"
import type { FormPersonalType } from "../types"

const FormPersonalContactInformation = ({ formPersonal, setFormPersonal }: { formPersonal: FormPersonalType, setFormPersonal: React.Dispatch<React.SetStateAction<FormPersonalType>> }) => {


    const Handlechange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {

        const { name, value } = e.target

        // Vérifier si c'est un champ imbriqué (phone ou emergencyContact.phone)
        if (name === "countryCode" || name === "phoneNumber") {
            // Mise à jour pour phone
            setFormPersonal(prev => ({
                ...prev,
                phone: {
                    ...prev.phone,
                    [name]: value
                }
            }))
        } else if (name === "emergencyContact.fullname") {
            setFormPersonal(prev => ({
                ...prev,
                emergencyContact: {
                    ...prev.emergencyContact,
                    fullname: value
                }
            }))
        } else if (name === "emergencyContact.countryCode" || name === "emergencyContact.phoneNumber") {
            const fieldName = name.split(".")[1];
            setFormPersonal(prev => ({
                ...prev,
                emergencyContact: {
                    ...prev.emergencyContact,
                    phone: {
                        ...prev.emergencyContact.phone,
                        [fieldName]: value
                    }
                }
            }))
        } else {
            // Mise à jour normale pour les champs simples
            setFormPersonal(prev => ({
                ...prev,
                [name]: value
            }))
        }

        console.log(formPersonal)
    }
    return (
        <div className="space-y-6">
            {/* Personal Info Section */}
            <div className="bg-gray-50 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-violet-100 rounded-lg">
                        <User className="w-4 h-4 text-violet-600" />
                    </div>
                    <h1 className="font-bold text-gray-900">Informations personnelles</h1>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="fullname" className="block text-xs font-medium text-gray-600 mb-1.5">
                            Nom complet
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input required
                                id="fullname"
                                type="text"
                                name="fullname"
                                value={formPersonal.fullname}
                                onChange={(e) => Handlechange(e)}
                                placeholder="Entrez le nom complet"
                                className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="dateOfBirth" className="block text-xs font-medium text-gray-600 mb-1.5">
                            Date de naissance
                        </label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input required
                                id="dateOfBirth"
                                type="date"
                                name="dateOfBirth"
                                value={formPersonal.dateOfBirth}
                                onChange={(e) => Handlechange(e)}
                                className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Gender Selection */}
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Genre</label>
                    <div className="grid grid-cols-3 gap-2">
                        <label className="flex items-center justify-center gap-2 p-2.5 bg-white rounded-lg border border-gray-200 cursor-pointer hover:border-violet-300 hover:bg-violet-50 transition-all">
                            <input required type="radio" name="gender" value="Homme" checked={formPersonal.gender === "Homme"} onChange={(e) => Handlechange(e)} className="w-3.5 h-3.5 accent-violet-500" />
                            <span className="text-sm text-gray-700">Homme</span>
                        </label>
                        <label className="flex items-center justify-center gap-2 p-2.5 bg-white rounded-lg border border-gray-200 cursor-pointer hover:border-violet-300 hover:bg-violet-50 transition-all">
                            <input required type="radio" name="gender" value="Femme" checked={formPersonal.gender === "Femme"} onChange={(e) => Handlechange(e)} className="w-3.5 h-3.5 accent-violet-500" />
                            <span className="text-sm text-gray-700">Femme</span>
                        </label>
                        <label className="flex items-center justify-center gap-2 p-2.5 bg-white rounded-lg border border-gray-200 cursor-pointer hover:border-violet-300 hover:bg-violet-50 transition-all">
                            <input required type="radio" name="gender" value="Autre" checked={formPersonal.gender === "Autre"} onChange={(e) => Handlechange(e)} className="w-3.5 h-3.5 accent-violet-500" />
                            <span className="text-sm text-gray-700">Autre</span>
                        </label>
                    </div>
                </div>

                <div className="mt-3 gap-4 grid grid-cols-1 md:grid-cols-2">
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">Password</label>

                        <input required
                            id="password"
                            type="password"
                            name="password"
                            value={formPersonal.password}
                            onChange={(e) => Handlechange(e)}
                            placeholder="********"
                            className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">Password</label>

                        <input required
                            id="passwordconfirm"
                            type="password"
                            name="passwordconfirm"
                            value={formPersonal.passwordconfirm}
                            onChange={(e) => Handlechange(e)}
                            placeholder="********"
                            className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Contact Info Section */}
            <div className="bg-gray-50 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <Mail className="w-4 h-4 text-blue-600" />
                    </div>
                    <h2 className="font-bold text-gray-900">Coordonnées</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="email" className="block text-xs font-medium text-gray-600 mb-1.5">
                            Adresse email
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input required
                                id="email"
                                type="email"
                                name="email"
                                value={formPersonal.email}
                                onChange={(e) => Handlechange(e)}
                                placeholder="exemple@email.com"
                                className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">Téléphone</label>
                        <div className="flex gap-2">
                            <select name="countryCode" value={formPersonal.phone.countryCode} className="pl-3 pr-6 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 " onChange={(e) => Handlechange(e)}>
                                <option value={"+225"}>+225</option>
                                <option value={"+33"}>+33</option>
                                <option value={"+1"}>+1</option>
                            </select>
                            <div className="relative flex-1">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input required
                                    type="text"
                                    name="phoneNumber"
                                    value={formPersonal.phone.phoneNumber}
                                    onChange={(e) => Handlechange(e)}
                                    placeholder="00 00 00 00 00"
                                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <label htmlFor="address" className="block text-xs font-medium text-gray-600 mb-1.5">
                        Adresse
                    </label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <input required
                            id="address"
                            type="text"
                            name="address"
                            value={formPersonal.address}
                            onChange={(e) => Handlechange(e)}
                            placeholder="Entrez votre adresse complète"
                            className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Emergency Contact Section */}
            <div className="bg-rose-50 rounded-xl p-5 border border-rose-100">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-rose-100 rounded-lg">
                        <AlertCircle className="w-4 h-4 text-rose-600" />
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-900">Contact d'urgence</h2>
                        <p className="text-xs text-gray-500">Personne à contacter en cas d'urgence</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="emergency-name" className="block text-xs font-medium text-gray-600 mb-1.5">
                            Nom du contact
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input required
                                id="emergency-name"
                                type="text"
                                name="emergencyContact.fullname"
                                value={formPersonal.emergencyContact.fullname}
                                onChange={(e) => Handlechange(e)}
                                placeholder="Nom complet"
                                className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">Téléphone</label>
                        <div className="flex gap-2">
                            <select onChange={(e) => Handlechange(e)} name="emergencyContact.countryCode" value={formPersonal.emergencyContact.phone.countryCode} className="pl-3 pr-6 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500">
                                <option value={"+225"}>+225</option>
                                <option value={"+33"}>+33</option>
                                <option value={"+1"}>+1</option>
                            </select>
                            <div className="relative flex-1">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input required
                                    type="text"
                                    name="emergencyContact.phoneNumber"
                                    value={formPersonal.emergencyContact.phone.phoneNumber}
                                    onChange={(e) => Handlechange(e)}
                                    placeholder="00 00 00 00 00"
                                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormPersonalContactInformation
