import { Building2, CreditCard, Hash, X, Save, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import EmployeeStore from "../Store/EmployeeStore";
import submitBankingInformations from "@/controllers/submitBankingInformations";
import type { formDataType } from "@/types";

interface EditBankingInformationsProps {
    isOpen: boolean;
    onClose: () => void;
}

const EditBankingInformations = ({ isOpen, onClose }: EditBankingInformationsProps) => {

    const ref = useRef<HTMLFormElement>(null)
    const { Employee, setEmployee } = EmployeeStore();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState<formDataType>({
        bankName: "",
        accountNumber: "",
        taxIdentificationNumber: ""
    });

    // Initialize form with current data


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };



    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300 border border-gray-100">
                {/* Decorative Header Gradient */}
                <div className="h-2 bg-linear-to-r from-violet-600 via-fuchsia-500 to-violet-600"></div>

                {/* Header */}
                <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-violet-50 rounded-2xl text-violet-600 ring-4 ring-violet-50/50">
                            <CreditCard className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Coordonnées Bancaires</h2>
                            <p className="text-sm text-gray-500">Mettez à jour vos informations de paiement</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-all group"
                    >
                        <X className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:rotate-90 transition-all duration-300" />
                    </button>
                </div>

                <form ref={ref} onSubmit={(e) => submitBankingInformations(e, setLoading, formData, Employee, setEmployee, onClose, ref)}>
                    <div className="p-8 space-y-6">
                        {/* Bank Name Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 ml-1">
                                Nom de l'établissement
                            </label>
                            <div className="relative group">
                                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-violet-500 transition-colors" />
                                <input
                                    required
                                    name="bankName"
                                    value={formData.bankName}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="ex: Banque Populaire, BNP Paribas..."
                                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all outline-hidden text-gray-900 font-medium"
                                />
                            </div>
                        </div>

                        {/* IBAN / Account Number Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 ml-1">
                                Numéro de compte (IBAN)
                            </label>
                            <div className="relative group">
                                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-violet-500 transition-colors" />
                                <input
                                    required
                                    name="accountNumber"
                                    value={formData.accountNumber}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="FR76 0000 0000 0000 0000 0000 000"
                                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all outline-hidden text-gray-900 font-mono tracking-wider"
                                />
                            </div>
                            <p className="text-[10px] text-gray-400 ml-1">Le format doit être conforme aux standards SEPA</p>
                        </div>

                        {/* NIF / Tax ID Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 ml-1">
                                Numéro d'identification fiscale (NIF)
                            </label>
                            <div className="relative group">
                                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-violet-500 transition-colors" />
                                <input
                                    required
                                    name="taxIdentificationNumber"
                                    value={formData.taxIdentificationNumber}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="ex: 1 23 45 67 890 123"
                                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all outline-hidden text-gray-900 font-medium"
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-6 py-4 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-2xl transition-all active:scale-95"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-[1.5] px-6 py-4 text-sm font-bold text-white bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 rounded-2xl transition-all shadow-xl shadow-violet-200 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70"
                            >
                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <Save className="w-5 h-5" />
                                )}
                                <span>{loading ? "Enregistrement..." : "Enregistrer"}</span>
                            </button>
                        </div>
                    </div>
                </form>

                {/* Footer Info */}
                <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
                    <p className="text-[11px] text-gray-400 text-center leading-relaxed">
                        Vos transactions sont sécurisées. Ces informations sont uniquement utilisées pour le virement de votre salaire mensuel.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EditBankingInformations;