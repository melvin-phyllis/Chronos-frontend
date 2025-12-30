export type FormPersonalType = {
    fullname: string;
    dateOfBirth: string;
    gender: string;
    email: string;
    password: string,
    passwordconfirm: string
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
    employeeCode?: string
    title: string;
    status: string;
    priorite: string;
    expiryDate: string;
    notes: string;
}


export type formLeaveRequestType = {
    id?: string;
    intervaltime: number
    employeeCode?: string;
    type: string;
    startDate: string;
    endDate: string;
    reason: string;
    status: string;
    requestDate: Date
}



export type PaidLeaveType = {

    PaidLeave?: number;
    SickLeaveOther?: number;
    UnpaidLeave?: number;

}


export type  formDataType = {
    bankName: string;
    accountNumber: string;
    taxIdentificationNumber: string;
}