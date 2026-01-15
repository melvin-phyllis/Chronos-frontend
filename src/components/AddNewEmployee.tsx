import { useRef, useState } from "react"
import createEmployee from "../controllers/createEmployee"
import type { formDocumentsType, FormEmploymentType, FormPersonalType } from "../types"
import FormAllowancesDocuments from "./FormAllowancesDocuments"
import FormEmploymentPayrollDetails from "./FormEmploymentPayrollDetails"
import FormPersonalContactInformation from "./FormPersonalContactInformation"
import BtnSubmit from "./btnSubmit"
import { uploadToImageKit } from "../utils/uploadImageKit"
import { ToastError } from "@/toastify/react-toastify"

const InitialPersonal: FormPersonalType = {
    name: "",
    firstname: "",
    dateOfBirth: "",
    gender: "",
    email: "",
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

    // State to hold valid File objects before upload
    const [selectedFiles, setSelectedFiles] = useState<{ [key: string]: File | null }>({
        cvAndPortfolio: null,
        proofOfIdentity: null,
        signedContract: null,
        offerLetter: null
    })

    const handleReset = () => {
        setFormPersonal(InitialPersonal)
        setFormDocuments(InitialDocuments)
        setFormEmployment(InitialEmployment)
        setSelectedFiles({
            cvAndPortfolio: null,
            proofOfIdentity: null,
            signedContract: null,
            offerLetter: null
        })
        setStep(0)
    }

    const Formarray = [
        <FormPersonalContactInformation formPersonal={formPersonal} setFormPersonal={setFormPersonal} />,
        <FormAllowancesDocuments
            formDocuments={formDocuments}
            setFormDocuments={setFormDocuments}
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
        />,
        <FormEmploymentPayrollDetails FormEmployment={FormEmployment} setFormEmployment={setFormEmployment} />,
    ]

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoad(true)

        try {
            // 1. Upload files first
            const uploadedDocs = { ...formDocuments.documents }
            let uploadErrors = false

            for (const [key, file] of Object.entries(selectedFiles)) {
                if (file) {
                    const url = await uploadToImageKit(file)
                    if (url) {
                        // Dynamically set the url to the correct key
                        // @ts-ignore - Dynamic key assignment
                        uploadedDocs[key] = url
                    } else {
                        console.error(`Failed to upload ${file.name}`)
                        uploadErrors = true
                    }
                }
            }

            if (uploadErrors) {
                ToastError("Certains documents n'ont pas pu être téléversés. Veuillez réessayer.")
                setLoad(false)
                return
            }

            // 2. Prepare final payload
            const finalFormDocuments = {
                ...formDocuments,
                documents: uploadedDocs
            }

            const formEmployee: FormPersonalType & formDocumentsType & FormEmploymentType = {
                ...formPersonal,
                ...finalFormDocuments,
                ...FormEmployment,
            }

            // 3. Send to backend
            await createEmployee(e, formEmployee, setLoad, handleReset)

        } catch (error) {
            console.error(error)
            setLoad(false)
        }
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
                        <span>Étape {step + 1}/3</span>
                        <span>{Math.round(((step + 1) / 3) * 100)}%</span>
                    </div>
                    <div className="w-full bg-white/30 rounded-full h-2">
                        <div
                            className="bg-white rounded-full h-2 transition-all duration-300 ease-in-out"
                            style={{ width: `${((step + 1) / 3) * 100}%` }}
                        />
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
                    <form ref={Ref} action="" onSubmit={handleSubmit}>
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
