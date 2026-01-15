import { Bus, FileText, Heart, Shield, Upload, CheckCircle, XCircle } from "lucide-react"
import type { formDocumentsType } from "../types"

interface Props {
    formDocuments: formDocumentsType;
    setFormDocuments: React.Dispatch<React.SetStateAction<formDocumentsType>>;
    selectedFiles: { [key: string]: File | null };
    setSelectedFiles: React.Dispatch<React.SetStateAction<{ [key: string]: File | null }>>;
}

const FormAllowancesDocuments = ({ formDocuments, setFormDocuments, selectedFiles, setSelectedFiles }: Props) => {

    const Handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked, type } = e.target

        if (type === "checkbox") {
            // Pour les checkboxes, on gère différemment
            if (name === "employeeBenefits") {
                setFormDocuments(prev => {
                    const currentBenefits = Array.isArray(prev.employeeBenefits) ? prev.employeeBenefits : []
                    if (checked) {
                        return { ...prev, employeeBenefits: [...currentBenefits, value] }
                    } else {
                        return { ...prev, employeeBenefits: currentBenefits.filter(b => b !== value) }
                    }
                })
            } else {
                // Pour allowances ou autres checkboxes simples
                setFormDocuments(prev => ({
                    ...prev, [name]: checked ? value : ""
                }))
            }
        } else {
            // Pour les inputs texte normaux
            setFormDocuments(prev => ({
                ...prev, [name]: value
            }))
        }
    }

    // Liste de tous les avantages disponibles
    const allBenefits = ["Santé", "Vie", "Formation", "Salle de sport"]

    // Fonction pour sélectionner/désélectionner tous les avantages
    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setFormDocuments(prev => ({ ...prev, employeeBenefits: allBenefits }))
        } else {
            setFormDocuments(prev => ({ ...prev, employeeBenefits: [] }))
        }
    }

    // Vérifier si tous les avantages sont sélectionnés
    const allSelected = allBenefits.every(benefit => formDocuments.employeeBenefits.includes(benefit))

    // Fonction pour gérer la sélection locale de documents
    const handleDocumentSelect = (documentKey: string) => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = '.pdf,.doc,.docx,.png,.jpg,.jpeg'

        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0]
            if (file) {
                // On stocke le fichier localement pour l'upload final
                setSelectedFiles(prev => ({
                    ...prev,
                    [documentKey]: file
                }))
            }
        }
        input.click()
    }

    // Pour retirer un fichier sélectionné
    const handleRemoveFile = (e: React.MouseEvent, documentKey: string) => {
        e.stopPropagation(); // Empêcher l'ouverture du sélecteur
        setSelectedFiles(prev => {
            const newState = { ...prev };
            newState[documentKey] = null;
            return newState;
        });
    }

    // Mapping des labels vers les clés du state
    const documentMapping: { [key: string]: keyof formDocumentsType['documents'] } = {
        "CV & Portfolio": "cvAndPortfolio",
        "Pièce d'identité": "proofOfIdentity",
        "Contrat signé": "signedContract",
        "Lettre d'offre": "offerLetter",
    }


    return (
        <div className="space-y-6">
            {/* Allowances Section */}
            <div className="bg-gray-50 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-amber-100 rounded-lg">
                        <Bus className="w-4 h-4 text-amber-600" />
                    </div>
                    <h2 className="font-bold text-gray-900">Indemnités</h2>
                </div>

                <div className="grid sm:grid-cols-3 gap-3">
                    <label className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-violet-300 hover:bg-violet-50/50 cursor-pointer transition-all group">
                        <input required onChange={(e) => { Handlechange(e) }} type="checkbox" name="allowances" value={"Transport"} className="w-4 h-4 accent-violet-600 rounded" />
                        <Bus className="w-4 h-4 text-gray-400 group-hover:text-violet-500" />
                        <span className="text-sm text-gray-700">Transport</span>
                    </label>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="bg-gray-50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                            <Heart className="w-4 h-4 text-emerald-600" />
                        </div>
                        <h2 className="font-bold text-gray-900">Avantages sociaux</h2>
                    </div>
                    <label className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-lg cursor-pointer hover:bg-emerald-100 transition-colors">
                        <input required type="checkbox" checked={allSelected} onChange={handleSelectAll} className="w-3.5 h-3.5 accent-emerald-500 rounded" />
                        <span className="text-xs font-medium text-emerald-700">Tout sélectionner</span>
                    </label>
                </div>

                <div className="grid md:grid-cols-3 gap-4 p-4 bg-white rounded-lg">
                    {/* Insurance */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Shield className="w-4 h-4 text-blue-500" />
                            <h3 className="text-xs font-semibold text-gray-700">Assurances</h3>
                        </div>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer text-sm">
                                <input required type="checkbox" name="employeeBenefits" value="Santé" checked={formDocuments.employeeBenefits.includes("Santé")} onChange={(e) => Handlechange(e)} className="w-3.5 h-3.5 accent-violet-600 rounded" />
                                <span className="text-gray-600">Santé</span>
                            </label>
                            <label className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer text-sm">
                                <input required name="employeeBenefits" type="checkbox" value="Vie" checked={formDocuments.employeeBenefits.includes("Vie")} onChange={(e) => Handlechange(e)} className="w-3.5 h-3.5 accent-violet-600 rounded" />
                                <span className="text-gray-600">Vie</span>
                            </label>
                        </div>
                    </div>

                    {/* Wellness */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Heart className="w-4 h-4 text-rose-500" />
                            <h3 className="text-xs font-semibold text-gray-700">Bien-être</h3>
                        </div>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer text-sm">
                                <input required type="checkbox" name="employeeBenefits" value="Formation" checked={formDocuments.employeeBenefits.includes("Formation")} onChange={(e) => Handlechange(e)} className="w-3.5 h-3.5 accent-violet-600 rounded" />
                                <span className="text-gray-600">Formation</span>
                            </label>
                            <label className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer text-sm">
                                <input required type="checkbox" name="employeeBenefits" value="Salle de sport" checked={formDocuments.employeeBenefits.includes("Salle de sport")} onChange={(e) => Handlechange(e)} className="w-3.5 h-3.5 accent-violet-600 rounded" />
                                <span className="text-gray-600">Salle de sport</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Documents Section */}
            <div className="bg-gray-50 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <FileText className="w-4 h-4 text-blue-600" />
                    </div>
                    <h2 className="font-bold text-gray-900">Documents</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                    {Object.entries(documentMapping).map(([label, key]) => {
                        const file = selectedFiles[key]

                        return (
                            <div key={label} className="flex items-center gap-4 p-3 bg-white rounded-lg border border-gray-200 hover:border-violet-300 transition-colors">
                                <p className="text-sm font-medium text-gray-700 w-32">{label}</p>
                                <div
                                    onClick={() => handleDocumentSelect(key)}
                                    className={`flex-1 border-2 border-dashed rounded-lg p-3 text-center transition-all group ${file ? "border-green-300 bg-green-50/30 cursor-pointer hover:bg-green-50" :
                                            "border-gray-300 hover:border-violet-400 hover:bg-violet-50/30 cursor-pointer"
                                        }`}
                                >
                                    {file ? (
                                        <div className="relative group/file">
                                            <div className="flex flex-col items-center justify-center py-1">
                                                <CheckCircle className="w-5 h-5 text-green-500 mb-1" />
                                                <p className="text-xs font-medium text-green-700 truncate max-w-[120px]">{file.name}</p>
                                            </div>
                                            {/* Hover to delete/change */}
                                            <div className="absolute inset-0 bg-white/90 flex items-center justify-center opacity-0 group-hover/file:opacity-100 transition-opacity gap-2">
                                                <button
                                                    onClick={(e) => handleRemoveFile(e, key)}
                                                    className="p-1 hover:bg-red-50 rounded text-red-500"
                                                    title="Supprimer"
                                                >
                                                    <XCircle className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <Upload className="w-5 h-5 text-gray-400 mx-auto mb-1 group-hover:text-violet-500" />
                                            <p className="text-xs font-medium text-gray-500 group-hover:text-violet-600">Cliquer pour choisir</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default FormAllowancesDocuments
