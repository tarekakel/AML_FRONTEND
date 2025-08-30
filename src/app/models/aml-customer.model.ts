// models/aml-customer.model.ts
export interface AmlCustomer {
    id?: string;
    customerType: number;         // 1 = Individual, 2 = Corporate
    basicInfo: BasicInfo;
    identification: { idType: number; idNumber: string; dateOfBirth?: string; };
    address: { street: string; city: string; postalCode: string; country: string };
    kyc: { sourceOfFunds: string; employmentStatus?: string; beneficialOwners?: any[] };
    status: 'DRAFT' | 'COMPLETED';
}

export interface BasicInfo {
    // Personal Name
    firstName: string;
    middleName?: string;
    lastName: string;

    // Demographics
    dateOfBirth: string;      // ISO date string (e.g. "1980-12-31")
    gender: 'Male' | 'Female' | 'Other';
    nationality: string;      // Country name or ISO code

    // Identification Document
    idType: 'Passport' | 'National ID' | 'Driver’s License';
    idNumber: string;
    idIssueDate?: string;     // Optional ISO date
    idExpiryDate: string;     // ISO date

    // Contact Details
    email: string;
    phone: string;            // E.164 format recommended

    // Address
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;          // Country name or ISO code
}

export interface FuzzySearchResult {
    audit_id: number;
    matches: PersonMatch[];
}

export interface PersonMatch {
    id: number;
    first_name: string;
    last_name: string;
    date_of_birth?: string;
    nationality?: string;
    total_score: number;
    auto_reject: boolean;
    status: string;
    details:string;
    details_dict:string;
}
export type PersonDecisionStatus = 'Pending' | 'accepted' | 'rejected';


export interface PersonDecision {
    id: number;
    person: number;
    audit_id?: number;
    status: PersonDecisionStatus;
    total_score: number;
    note: string;
    create_dt: string;
    created_by: number;
}

export interface PersonDecisionRequest {

    person: number;
    audit_id?: number;
    action: PersonDecisionStatus;
    total_score: number;
    note: string;
}


