export type FormPersonalType = {
    name: string;
    firstname: string;
    dateOfBirth: string;
    gender: string;
    email: string;
    phone: {
        countryCode: string;
        phoneNumber: string;
    };
    address: string;
    emergencyContact: {
        fullname: string;
        phone: {
            countryCode: string;
            phoneNumber: string;
        };
    };
}

export type ForminputType = {
    email: string;
    password: string;
}

export type formDocumentsType = {
    allowances: string;
    employeeBenefits: string[];
    documents: {
        cvAndPortfolio: string;
        proofOfIdentity: string;
        signedContract: string;
        offerLetter: string;
    };
}

export type FormEmploymentType = {
    dateOfHire: string;
    post: string;
    department: string;
    contractType: string;
    workingMethod: string;
    payrollInformation: {
        monthlySalary: string;
        bankName: string;
        accountNumber: string;
        taxIdentificationNumber: string;
    };
}


export type employeeType = {
    _id?: string
    fullname: string,

    dateOfBirth: Date,

    employeeCode: string,

    gender: string,

    email: string,

    phone: {
        countryCode: string,
        phoneNumber: string
    },

    address: string,

    emergencyContact: {
        fullname: string,
        phone: {
            countryCode: string,
            phoneNumber: string

        }
    },

    allowances: string,

    employeeBenefits: [string],

    documents: {
        cvAndPortfolio: string,
        proofOfIdentity: string,
        signedContract: string,
        offerLetter: string
    },

    dateOfHire: Date,

    post: string,

    department: string,

    contractType: string,

    workingMethod: string,

    payrollInformation: {
        monthlySalary: string,
        bankName: string,
        accountNumber: string,
        taxIdentificationNumber: string
    },

    date: Date
}

export type formAddTAskType = {
    _id?: string,
    id?: string,
    employeeCode?: string
    title: string;
    status: string;
    priorite: string;
    expiryDate: string;
    notes: string;
}


export type formLeaveRequestType = {
    _id?: string;
    type_conge: string;
    date_debut: string;
    date_fin: string;
    justificatif_texte?: string;
    statut?: string;
    // Legacy fields for backwards compatibility
    type?: string;
    startDate?: string;
    endDate?: string;
    intervaltime?: number;
}

export type LeaveBalanceType = {
    conges_payes_total: number;
    conges_payes_pris: number;
    conges_payes_restants: number;
    conges_maladie_pris: number;
    autres_conges_pris: number;
}


export type formDataType = {
    bankName: string;
    accountNumber: string;
    taxIdentificationNumber: string;
}

export type PresenceType = {
    _id: string;
    user_id: string;
    date: string;
    check_in?: string; // Date ISO
    check_out?: string; // Date ISO
    duree_travail?: number;
    statut: "present" | "absent" | "retard";
    employeeDetails?: employeeType;
}

export type PaidLeaveType = {
    PaidLeave?: number;
    totalDays?: number;
    usedDays?: number;
    remainingDays?: number;
}