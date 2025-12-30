import { Briefcase, Building2, Calendar, Cloud, CreditCard, DollarSign, Hash, Home, Laptop } from "lucide-react"
import type { FormEmploymentType } from "../types"

const departmentsPosts: { [key: string]: string[] } = {
    "Ressources Humaines": [
        "Responsable RH", "Chargé(e) de recrutement", "Gestionnaire de paie",
        "Chargé(e) de formation", "HR Business Partner", "Assistant RH"
    ],
    "Informatique / IT": [
        "Développeur Frontend", "Développeur Backend", "Développeur Full Stack",
        "Ingénieur Logiciel", "Administrateur Systèmes & Réseaux", "DevOps Engineer",
        "Data Analyst", "QA / Testeur logiciel"
    ],
    "Finance & Comptabilité": [
        "Comptable", "Chef Comptable", "Contrôleur de gestion", "Analyste financier",
        "Responsable financier", "Trésorier"
    ],
    "Marketing & Communication": [
        "Responsable Marketing", "Chargé(e) de communication", "Community Manager",
        "Social Media Manager", "Content Manager", "Graphic Designer", "SEO / SEA Specialist"
    ],
    "Commercial / Ventes": [
        "Commercial", "Business Developer", "Responsable commercial",
        "Account Manager", "Key Account Manager", "Customer Success Manager"
    ],
    "Production / Technique": [
        "Responsable de production", "Ingénieur production", "Chef d’équipe",
        "Technicien de maintenance", "Opérateur de production", "Responsable qualité"
    ],
    "Logistique / Supply Chain": [
        "Responsable logistique", "Gestionnaire de stock", "Responsable Supply Chain",
        "Approvisionneur", "Logisticien"
    ],
    "Service Client": [
        "Responsable Service Client", "Chargé(e) de clientèle", "Support client",
        "Call Center Agent", "Customer Care Manager"
    ]
};

const FormEmploymentPayrollDetails = ({ FormEmployment, setFormEmployment }: { FormEmployment: FormEmploymentType, setFormEmployment: React.Dispatch<React.SetStateAction<FormEmploymentType>> }) => {

    const Handlechange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target


        const moneyFields: { [key: string]: string } = {
            "monthlySalary": "monthlySalary",
            "bankName": "bankName",
            "accountNumber": "accountNumber",
            "taxIdentificationNumber": "taxIdentificationNumber"
        };


        if (Object.keys(moneyFields).includes(name)) { // Check if it matches our payroll keys
            setFormEmployment(prev => ({
                ...prev,
                payrollInformation: {
                    ...prev.payrollInformation,
                    [name]: value
                }
            }))
        } else {
            setFormEmployment(prev => ({
                ...prev,
                [name]: value
            }))
        } console.log(FormEmployment);
    }

    const handlePostChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedPost = e.target.value;
        let selectedDepartment = "";

        // On parcourt chaque département pour trouver où se trouve le poste
        for (const dept in departmentsPosts) {
            if (departmentsPosts[dept].includes(selectedPost)) {
                selectedDepartment = dept; // On a trouvé le département !
                break; // On arrête de chercher
            }
        }

        setFormEmployment(prev => ({
            ...prev,
            post: selectedPost,
            department: selectedDepartment
        }))
    }



    return (
        <div className="space-y-6">
            {/* Employment Details Section */}
            <div className="bg-gray-50 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-violet-100 rounded-lg">
                        <Briefcase className="w-4 h-4 text-violet-600" />
                    </div>
                    <h2 className="font-bold text-gray-900">Détails de l'emploi</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                            ID Employé
                        </label>
                        <div className="relative">
                            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input required
                                type="text"
                                value="EMP-0371"
                                disabled
                                className="w-full pl-9 pr-3 py-2.5 text-sm bg-gray-100 text-gray-600 border border-gray-200 rounded-lg cursor-not-allowed font-mono"
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                            Auto-généré
                        </p>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                            Date d'embauche
                        </label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input required
                                type="date"
                                onChange={(e) => {
                                    Handlechange(e)
                                }}
                                name="dateOfHire"
                                value={FormEmployment.dateOfHire}
                                className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                            Poste
                        </label>
                        <div className="relative">
                            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <select name="post"
                                value={FormEmployment.post}

                                onChange={handlePostChange}
                                className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-violet-500 focus:border-transparent cursor-pointer">
                                <option value="">Sélectionner un poste</option>
                                {Object.entries(departmentsPosts).map(([dept, posts]) => (
                                    <optgroup key={dept} label={dept}>
                                        {posts.map(post => (
                                            <option key={post} value={post}>{post}</option>
                                        ))}
                                    </optgroup>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                            Département
                        </label>
                        <div className="relative">
                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <select name="department"
                                value={FormEmployment.department}
                                 disabled={true}
                                onChange={(e) => {
                                    Handlechange(e)
                                }}
                                className="select w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-violet-500 focus:border-transparent cursor-pointer">
                                <option value="">Sélectionner un département</option>
                                <option value="Ressources Humaines">Ressources Humaines</option>
                                <option value="Informatique / IT">Informatique / IT</option>
                                <option value="Finance & Comptabilité">Finance & Comptabilité</option>
                                <option value="Marketing & Communication">Marketing & Communication</option>
                                <option value="Commercial / Ventes">Commercial / Ventes</option>
                                <option value="Production / Technique">Production / Technique</option>
                                <option value="Logistique / Supply Chain">Logistique / Supply Chain</option>
                                <option value="Service Client">Service Client</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Type de contrat
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                        <label className="flex items-center justify-center gap-2 p-2.5 rounded-lg border-2 border-emerald-500 bg-emerald-50 cursor-pointer text-sm">
                            <input required
                                onChange={(e) => {
                                    Handlechange(e)
                                }}
                                type="radio" name="contractType"
                                value={"CDI"}
                                checked={FormEmployment.contractType === 'CDI'}
                                className="w-3.5 h-3.5 accent-emerald-500" />
                            <span className="font-medium text-emerald-700">CDI</span>
                        </label>
                        <label className="flex items-center justify-center gap-2 p-2.5 rounded-lg border border-gray-200 bg-white cursor-pointer hover:border-violet-300 hover:bg-violet-50 transition-all text-sm">
                            <input required
                                onChange={(e) => {
                                    Handlechange(e)
                                }}
                                value={"CDD"}
                                checked={FormEmployment.contractType === 'CDD'}
                                type="radio" name="contractType" className="w-3.5 h-3.5 accent-violet-500" />
                            <span className="text-gray-600">CDD</span>
                        </label>
                        <label className="flex items-center justify-center gap-2 p-2.5 rounded-lg border border-gray-200 bg-white cursor-pointer hover:border-violet-300 hover:bg-violet-50 transition-all text-sm">
                            <input required
                                value={"Freelance"}
                                onChange={(e) => {
                                    Handlechange(e)
                                }}
                                checked={FormEmployment.contractType === 'Freelance'}
                                type="radio" name="contractType" className="w-3.5 h-3.5 accent-violet-500" />
                            <span className="text-gray-600">Freelance</span>
                        </label>
                        <label className="flex items-center justify-center gap-2 p-2.5 rounded-lg border border-gray-200 bg-white cursor-pointer hover:border-violet-300 hover:bg-violet-50 transition-all text-sm">
                            <input required
                                onChange={(e) => {
                                    Handlechange(e)
                                }}
                                value={"Stage"}
                                checked={FormEmployment.contractType === 'Stage'}
                                type="radio" name="contractType" className="w-3.5 h-3.5 accent-violet-500" />
                            <span className="text-gray-600">Stage</span>
                        </label>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Mode de travail
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        <label className="flex flex-col items-center gap-1 p-3 rounded-lg border-2 border-emerald-500 bg-emerald-50 cursor-pointer">
                            <Home className="w-5 h-5 text-emerald-600" />
                            <input required
                                onChange={(e) => {
                                    Handlechange(e)
                                }}
                                type="radio" name="workingMethod" value="Onsite" checked={FormEmployment.workingMethod === 'Onsite'} className="sr-only" />
                            <span className="text-sm font-medium text-emerald-700">Présentiel</span>
                        </label>
                        <label className="flex flex-col items-center gap-1 p-3 rounded-lg border border-gray-200 bg-white cursor-pointer hover:border-violet-300 hover:bg-violet-50 transition-all group">
                            <Laptop className="w-5 h-5 text-gray-400 group-hover:text-violet-500" />
                            <input required
                                onChange={(e) => {
                                    Handlechange(e)
                                }}
                                type="radio" name="workingMethod"
                                value={"Remote"}
                                checked={FormEmployment.workingMethod === 'Remote'}
                                className="sr-only" />
                            <span className="text-sm text-gray-600 group-hover:text-violet-600">Télétravail</span>
                        </label>
                        <label className="flex flex-col items-center gap-1 p-3 rounded-lg border border-gray-200 bg-white cursor-pointer hover:border-violet-300 hover:bg-violet-50 transition-all group">
                            <Cloud className="w-5 h-5 text-gray-400 group-hover:text-violet-500" />
                            <input required
                                onChange={(e) => {
                                    Handlechange(e)
                                }} type="radio" name="workingMethod"
                                value={"Hybrid"}
                                checked={FormEmployment.workingMethod === 'Hybrid'}
                                className="sr-only" />
                            <span className="text-sm text-gray-600 group-hover:text-violet-600">Hybride</span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Payroll Info Section */}
            <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                        <DollarSign className="w-4 h-4 text-emerald-600" />
                    </div>
                    <h2 className="font-bold text-gray-900">Informations de paie</h2>
                </div>

                <div className="mb-4">
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Salaire mensuel
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 font-bold">€</span>
                        <input required
                            onChange={(e) => {
                                Handlechange(e)
                            }}
                            type="text"
                            placeholder="2 800"
                            name="monthlySalary"
                            value={FormEmployment.payrollInformation.monthlySalary}
                            className="w-full pl-9 pr-20 py-2.5 text-sm border border-gray-200 rounded-lg font-semibold focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                            /mois
                        </span>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                            Nom de la banque
                        </label>
                        <div className="relative">
                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input required
                                onChange={(e) => {
                                    Handlechange(e)
                                }}
                                type="text"
                                name="bankName"
                                value={FormEmployment.payrollInformation.bankName}
                                placeholder="ex: BIAO-CI"
                                className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                            Numéro de compte
                        </label>
                        <div className="relative">
                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input required
                                onChange={(e) => {
                                    Handlechange(e)
                                }}
                                type="text"
                                name="accountNumber"
                                value={FormEmployment.payrollInformation.accountNumber}
                                placeholder="ex: 12345678"
                                className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all font-mono"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Numéro fiscal (NIF)
                    </label>
                    <div className="relative">
                        <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input required
                            onChange={(e) => {
                                Handlechange(e)
                            }}
                            type="text"
                            name="taxIdentificationNumber"
                            value={FormEmployment.payrollInformation.taxIdentificationNumber}
                            placeholder="ex: AB123456C"
                            className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all font-mono"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormEmploymentPayrollDetails
