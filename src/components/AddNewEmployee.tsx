import { useRef, useState } from "react"
import createEmployee from "../controllers/createEmployee"
import type { formDocumentsType, FormEmploymentType, FormPersonalType } from "../types"
import FormAllowancesDocuments from "./FormAllowancesDocuments"
import FormEmploymentPayrollDetails from "./FormEmploymentPayrollDetails"
import FormPersonalContactInformation from "./FormPersonalContactInformation"
import BtnSubmit from "./btnSubmit"
const InitialPersonal: FormPersonalType = {
    fullname: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    password: "",
    passwordconfirm:"",
    phone: {
        countryCode: "+225",
        phoneNumber: "",
    },
    address: "",
    emergencyContact: {
        fullname: "",
        phone: {
            countryCode: "+225",
            phoneNumber: "",
        }
    }
}

const InitialDocuments: formDocumentsType = {
    allowances: "",
    employeeBenefits: [],
    documents: {
        cvAndPortfolio: "",
        proofOfIdentity: "",
        signedContract: "",
        offerLetter: "",
    },
}

const InitialEmployment: FormEmploymentType = {
    dateOfHire: "",
    post: "",
    department: "",
    contractType: "",
    workingMethod: "",
    payrollInformation: {
        monthlySalary: "",
        bankName: "",
        accountNumber: "",
        taxIdentificationNumber: "",
    }
}

const AddNewEmployee = () => {

    const Ref = useRef<HTMLFormElement>(null)
    const [load, setLoad] = useState(false)
    const [step, setStep] = useState(0)

    const [formPersonal, setFormPersonal] = useState<FormPersonalType>(InitialPersonal)
    const [formDocuments, setFormDocuments] = useState<formDocumentsType>(InitialDocuments)
    const [FormEmployment, setFormEmployment] = useState<FormEmploymentType>(InitialEmployment)

    const handleReset = () => {
        setFormPersonal(InitialPersonal)
        setFormDocuments(InitialDocuments)
        setFormEmployment(InitialEmployment)
        setStep(0)
    }

    const Formarray = [
        <FormPersonalContactInformation formPersonal={formPersonal} setFormPersonal={setFormPersonal} />,
        <FormAllowancesDocuments formDocuments={formDocuments} setFormDocuments={setFormDocuments} />,
        <FormEmploymentPayrollDetails FormEmployment={FormEmployment} setFormEmployment={setFormEmployment} />,

    ]

    const formEmployee: FormPersonalType & formDocumentsType & FormEmploymentType = {
        ...formPersonal,

        ...formDocuments,
        ...FormEmployment,
    }

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-40px)] bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Sidebar Steps */}
            <div className="lg:w-72 bg-linear-to-b from-violet-600 to-purple-700 p-6 text-white shrink-0">
                <div className="mb-8">
                    <h1 className="text-xl font-bold mb-2">Nouvel employé</h1>
                    <p className="text-violet-200 text-sm">Complétez les informations</p>
                </div>



                {/* Progress bar mobile */}
                <div className="lg: mt-4">
                    <div className="flex justify-between text-xs mb-2">
                        <span>Étape 1/3</span>
                        <span>33%</span>
                    </div>
                    <div className="w-full bg-white/30 rounded-full h-2">
                        <div className="bg-white rounded-full h-2 w-1/3" />
                    </div>
                </div>
            </div>

            {/* Form Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 shrink-0">
                    <h2 className="text-xl font-bold text-gray-900">Informations personnelles</h2>
                    <p className="text-sm text-gray-500">Coordonnées et contacts</p>
                </div>
                {/* Form Content - Scrollable */}
                <div className="flex-1 overflow-y-auto p-6">
                    {/* Affiche un seul formulaire à la fois - à gérer avec state */}
                    <form ref={Ref} action="" onSubmit={(e) => { createEmployee(e, formEmployee, setLoad, handleReset) }}>
                        {Formarray[step]}
                        {/* Footer Navigation */}
                        <BtnSubmit step={step} setStep={setStep} load={load} handleReset={handleReset} />
                    </form>
                </div>
            </div>
        </div >
    )
}

export default AddNewEmployee
