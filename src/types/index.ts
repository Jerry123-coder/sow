export interface PersonalData {
    surname: string;
    firstName: string;
    otherNames: string;
    sex: 'M' | 'F' | '';
    dateOfBirth: string;
    placeOfBirth: string;
    nationality: string;
    homeTown: string;
    region: string;
    fatherName: string;
    motherName: string;
    residentialAddress: string;
    telephone: string;
    email: string;
    passportPhoto?: File;
  }
  
  export interface MaritalData {
    status: 'Single' | 'Married' | 'Separated' | 'Divorced' | 'Widowed' | '';
    marriageType?: 'Customary' | 'Catholic Church' | 'Ordinance' | 'Other Church';
    marriageDates?: {
      date: string;
      place: string;
    }[];
    spouseName: string;
    spouseNationality: string;
    religiousDenomination: string;
  }
  
  export interface EmploymentData {
    employmentStatus: 'Employed' | 'Self-employed' | 'Unemployed' | 'Student' | 'Retired' | 'Other' | '';
    occupation: string;
    profession: string;
    placeOfWork: string;
    workAddress: string;
    telephone: string;
    email: string;
    fax: string;
    status: string;
  }
  
  export interface ReligiousData {
    baptized: {
      status: boolean;
      date: string;
      place: string;
    };
    firstCommunion: {
      status: boolean;
      date: string;
      place: string;
    };
    confirmed: {
      status: boolean;
      date: string;
      place: string;
    };
  }
  
  export interface MembershipData {
    dateJoined: string;
    previousChurch: string;
    dayGroup: string;
    societies: string[];
    ministries: Array<{
      type: string;
      from: string;
      to: string;
    }>;
  }
  
  export interface RegistrationState {
    personalData: PersonalData;
    maritalData: MaritalData;
    employmentData: EmploymentData;
    religiousData: ReligiousData;
    membershipData: MembershipData;
    currentStep: number;
    isSubmitting: boolean;
    submitError: string | null;
    submitSuccess: boolean;
  }