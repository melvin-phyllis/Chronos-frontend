export type formaddemployeeType = {
    fullname: string,
    date_of_birth: string,
    sexe: string,
    email: string,
    phone: string,
    adress: string,

    fullname_urgent: string,
    phone_urgent: string,

    Date_of_hire: string,
    post: string,
    département: string,
    Contract_type: string,
    Working_method: string,

    Payroll_information: {
        Monthly_Salary: string,
        Bank_Name: string,
        Account_Number: string,
        Tax_Identification_Number: string
    }
    ,

    Allowances: string,
    Benefits: string,

    Documents: {
        CV_and_portfolio: string,
        Proof_of_identity: string,
        Signed_contract: string,
        Offer_letter: string
    },

    Employee_status: string
}
