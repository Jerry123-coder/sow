
export interface RegistrationState {
  personalData: PersonalData;
  maritalData: MaritalData;
  employmentData: EmploymentData;
  religiousData: ReligiousData;
  membershipData: MembershipData;
  currentStep: number;
  isSubmitting: boolean;
  submitError: any | null;
  submitSuccess: boolean;
  validationErrors: Record<string, string>;
}

export interface PersonalData {
  passportPhoto: any;
  surname: string;
  firstName: string;
  otherNames: string;
  sex: string;
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
}

export interface MaritalData {
  status: '' | 'Single' | 'Married' | 'Separated' | 'Divorced' | 'Widowed';
  marriageType?: '' | 'Customary' | 'Catholic Church' | 'Ordinance' | 'Other Church';
  spouseName: string;
  spouseNationality: string;
  marriageDate: string;
  marriagePlace: string;
  spouseReligion: string;
}

export interface EmploymentData {
  employmentStatus: '' | 'Employed' | 'Self-employed' | 'Unemployed' | 'Student' | 'Retired' | 'Other';
  occupation: string;
  profession: string;
  placeOfWork: string;
  workAddress: string;
  workPhone: string;
  workEmail: string;
  workFax: string;
}

export interface ReligiousData {
  baptized: boolean;
  baptismDate: string;
  baptismPlace: string;
  firstCommunion: boolean;
  communionDate: string;
  communionPlace: string;
  confirmed: boolean;
  confirmationDate: string;
  confirmationPlace: string;
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

// // src/store/slices/registrationSlice.ts
// import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// // import { RegistrationState } from '../../types/RegistrationState';

// const initialState: RegistrationState = {
//   personalData: {
//     passportPhoto: '',
//     surname: '',
//     firstName: '',
//     otherNames: '',
//     sex: '',
//     dateOfBirth: '',
//     placeOfBirth: '',
//     nationality: '',
//     homeTown: '',
//     region: '',
//     fatherName: '',
//     motherName: '',
//     residentialAddress: '',
//     telephone: '',
//     email: ''
//   },
//   maritalData: {
//     status: '', 
//     marriageType: '', 
//     spouseName: '',
//     spouseNationality: '',
//     marriageDate: '',
//     marriagePlace: '',
//     spouseReligion: ''
//   },
//   employmentData: {
//     employmentStatus: '', 
//     occupation: '',
//     profession: '',
//     placeOfWork: '',
//     workAddress: '',
//     workPhone: '',
//     workEmail: '',
//     workFax: ''
//   },
//   religiousData: {
//     baptized: false,
//     baptismDate: '',
//     baptismPlace: '',
//     firstCommunion: false,
//     communionDate: '',
//     communionPlace: '',
//     confirmed: false,
//     confirmationDate: '',
//     confirmationPlace: ''
//   },
//   membershipData: {
//     dateJoined: '',
//     previousChurch: '',
//     dayGroup: '',
//     societies: [],
//     ministries: []
//   },
//   currentStep: 1,
//   isSubmitting: false,
//   submitError: null,
//   submitSuccess: false,
//   validationErrors: {},
// };


// export const submitRegistration = createAsyncThunk<
//   any,
//   void,
//   {
//     state: { registration: RegistrationState };
//     rejectValue: any;
//   }
// >(
//   'registration/submit',
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       const state = getState().registration;
//       const formData = new FormData();

//       // Convert state to FormData, excluding metadata
//       Object.entries(state).forEach(([key, value]) => {
//         if (
//           !['currentStep', 'isSubmitting', 'submitError', 'submitSuccess', 'validationErrors'].includes(key)
//         ) {
//           formData.append(key, JSON.stringify(value));
//         }
//       });

//       // Handle passport photo
//       if (state.personalData.passportPhoto) {
//         formData.append('passportPhoto', state.personalData.passportPhoto);
//       }

//       const response = await fetch('/api/registration', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         return rejectWithValue({
//           message: errorData.message || 'Registration failed',
//           field: errorData.field,
//         });
//       }

//       return await response.json();
//     } catch (error: any) {
//       return rejectWithValue({
//         message: error.message || 'An unexpected error occurred',
//       });
//     }
//   }
// );

// const registrationSlice = createSlice({
//   name: 'registration',
//   initialState,
//   reducers: {
//     updatePersonalData: (state, action: PayloadAction<Partial<RegistrationState['personalData']>>) => {
//       state.personalData = { ...state.personalData, ...action.payload };
//       // Clear validation errors
//       if (state.validationErrors) {
//         Object.keys(action.payload).forEach((key) => {
//           delete state.validationErrors[key];
//         });
//       }
//     },
//     updateMaritalData: (state, action: PayloadAction<Partial<RegistrationState['maritalData']>>) => {
//       state.maritalData = { ...state.maritalData, ...action.payload };
//     },
//     updateEmploymentData: (state, action: PayloadAction<Partial<RegistrationState['employmentData']>>) => {
//       state.employmentData = { ...state.employmentData, ...action.payload };
//     },
//     updateReligiousData: (state, action: PayloadAction<Partial<RegistrationState['religiousData']>>) => {
//       state.religiousData = { ...state.religiousData, ...action.payload };
//     },
//     updateMembershipData: (state, action: PayloadAction<Partial<RegistrationState['membershipData']>>) => {
//       state.membershipData = { ...state.membershipData, ...action.payload };
//     },
//     setCurrentStep: (state, action: PayloadAction<number>) => {
//       state.currentStep = action.payload;
//     },
//     addMinistry: (state, action: PayloadAction<{ type: string; from: string; to: string }>) => {
//       state.membershipData.ministries.push(action.payload);
//     },
//     removeMinistry: (state, action: PayloadAction<number>) => {
//       state.membershipData.ministries = state.membershipData.ministries.filter(
//         (_, index) => index !== action.payload
//       );
//     },
//     addSociety: (state, action: PayloadAction<string>) => {
//       state.membershipData.societies.push(action.payload);
//     },
//     removeSociety: (state, action: PayloadAction<number>) => {
//       state.membershipData.societies = state.membershipData.societies.filter(
//         (_, index) => index !== action.payload
//       );
//     },
//     clearErrors: (state) => {
//       state.submitError = null;
//       state.validationErrors = {};
//     },
//     resetForm: () => initialState
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(submitRegistration.pending, (state) => {
//         state.isSubmitting = true;
//         state.submitError = null;
//         state.validationErrors = {};
//       })
//       .addCase(submitRegistration.fulfilled, (state) => {
//         state.isSubmitting = false;
//         state.submitSuccess = true;
//         state.submitError = null;
//         state.validationErrors = {};
//       })
//       .addCase(submitRegistration.rejected, (state, action) => {
//         state.isSubmitting = false;
//         state.submitError = action.payload;
//         if (action.payload?.field) {
//           state.validationErrors = {
//             ...state.validationErrors,
//             [action.payload.field]: action.payload.message,
//           };
//         }
//       });
//   },
// });

// export const {
//   updatePersonalData,
//   updateMaritalData,
//   updateEmploymentData,
//   updateReligiousData,
//   updateMembershipData,
//   setCurrentStep,
//   addMinistry,
//   removeMinistry,
//   addSociety,
//   removeSociety,
//   clearErrors,
//   resetForm,
// } = registrationSlice.actions;

// export default registrationSlice.reducer;


import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { submitRegistrationToFirebase } from '../../services/firebase';
// import { RegistrationState } from '../../types/RegistrationState';

const initialState: RegistrationState = {
  personalData: {
    passportPhoto: '',
    surname: '',
    firstName: '',
    otherNames: '',
    sex: '',
    dateOfBirth: '',
    placeOfBirth: '',
    nationality: '',
    homeTown: '',
    region: '',
    fatherName: '',
    motherName: '',
    residentialAddress: '',
    telephone: '',
    email: ''
  },
  maritalData: {
    status: '', 
    marriageType: '', 
    spouseName: '',
    spouseNationality: '',
    marriageDate: '',
    marriagePlace: '',
    spouseReligion: ''
  },
  employmentData: {
    employmentStatus: '', 
    occupation: '',
    profession: '',
    placeOfWork: '',
    workAddress: '',
    workPhone: '',
    workEmail: '',
    workFax: ''
  },
  religiousData: {
    baptized: false,
    baptismDate: '',
    baptismPlace: '',
    firstCommunion: false,
    communionDate: '',
    communionPlace: '',
    confirmed: false,
    confirmationDate: '',
    confirmationPlace: ''
  },
  membershipData: {
    dateJoined: '',
    previousChurch: '',
    dayGroup: '',
    societies: [],
    ministries: []
  },
  currentStep: 1,
  isSubmitting: false,
  submitError: null,
  submitSuccess: false,
  validationErrors: {},
};

// Firebase submission thunk
export const submitRegistration = createAsyncThunk<
  string,
  void,
  {
    state: { registration: RegistrationState };
    rejectValue: any;
  }
>(
  'registration/submit',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState().registration;

      // Validate required fields before submission
      const validationErrors: Record<string, string> = {};
      
      // Basic validation for personal data
      if (!state.personalData.surname) validationErrors.surname = 'Surname is required';
      if (!state.personalData.firstName) validationErrors.firstName = 'First name is required';
      if (!state.personalData.email) validationErrors.email = 'Email is required';
      if (!state.personalData.telephone) validationErrors.telephone = 'Telephone is required';

      // If there are validation errors, reject
      if (Object.keys(validationErrors).length > 0) {
        return rejectWithValue({
          message: 'Please fill in all required fields',
          validationErrors
        });
      }

      // Extract registration data excluding metadata
      const registrationData = {
        personalData: state.personalData,
        maritalData: state.maritalData,
        employmentData: state.employmentData,
        religiousData: state.religiousData,
        membershipData: state.membershipData
      };

      // Submit to Firebase
      const registrationId = await submitRegistrationToFirebase(registrationData);
      return registrationId;

    } catch (error: any) {
      return rejectWithValue({
        message: error.message || 'Registration failed',
        error
      });
    }
  }
);

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    updatePersonalData: (state, action: PayloadAction<Partial<RegistrationState['personalData']>>) => {
      state.personalData = { ...state.personalData, ...action.payload };
      // Clear validation errors for updated fields
      if (state.validationErrors) {
        Object.keys(action.payload).forEach((key) => {
          delete state.validationErrors[key];
        });
      }
    },
    updateMaritalData: (state, action: PayloadAction<Partial<RegistrationState['maritalData']>>) => {
      state.maritalData = { ...state.maritalData, ...action.payload };
      // Clear related validation errors
      if (state.validationErrors) {
        Object.keys(action.payload).forEach((key) => {
          delete state.validationErrors[key];
        });
      }
    },
    updateEmploymentData: (state, action: PayloadAction<Partial<RegistrationState['employmentData']>>) => {
      state.employmentData = { ...state.employmentData, ...action.payload };
      if (state.validationErrors) {
        Object.keys(action.payload).forEach((key) => {
          delete state.validationErrors[key];
        });
      }
    },
    updateReligiousData: (state, action: PayloadAction<Partial<RegistrationState['religiousData']>>) => {
      state.religiousData = { ...state.religiousData, ...action.payload };
      if (state.validationErrors) {
        Object.keys(action.payload).forEach((key) => {
          delete state.validationErrors[key];
        });
      }
    },
    updateMembershipData: (state, action: PayloadAction<Partial<RegistrationState['membershipData']>>) => {
      state.membershipData = { ...state.membershipData, ...action.payload };
      if (state.validationErrors) {
        Object.keys(action.payload).forEach((key) => {
          delete state.validationErrors[key];
        });
      }
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    addMinistry: (state, action: PayloadAction<{ type: string; from: string; to: string }>) => {
      state.membershipData.ministries.push(action.payload);
    },
    removeMinistry: (state, action: PayloadAction<number>) => {
      state.membershipData.ministries = state.membershipData.ministries.filter(
        (_: any, index: number) => index !== action.payload
      );
    },
    addSociety: (state, action: PayloadAction<string>) => {
      state.membershipData.societies.push(action.payload);
    },
    removeSociety: (state, action: PayloadAction<number>) => {
      state.membershipData.societies = state.membershipData.societies.filter(
        (_: any , index:any) => index !== action.payload
      );
    },
    clearErrors: (state) => {
      state.submitError = null;
      state.validationErrors = {};
    },
    resetForm: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitRegistration.pending, (state) => {
        state.isSubmitting = true;
        state.submitError = null;
        state.validationErrors = {};
      })
      .addCase(submitRegistration.fulfilled, (state) => {
        state.isSubmitting = false;
        state.submitSuccess = true;
        state.submitError = null;
        state.validationErrors = {};
        // Don't reset form here - let the component handle it after showing success message
      })
      .addCase(submitRegistration.rejected, (state, action) => {
        state.isSubmitting = false;
        state.submitError = action.payload;
        if (action.payload?.validationErrors) {
          state.validationErrors = action.payload.validationErrors;
        }
      });
  },
});

export const {
  updatePersonalData,
  updateMaritalData,
  updateEmploymentData,
  updateReligiousData,
  updateMembershipData,
  setCurrentStep,
  addMinistry,
  removeMinistry,
  addSociety,
  removeSociety,
  clearErrors,
  resetForm,
} = registrationSlice.actions;

export default registrationSlice.reducer;