// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import { RegistrationStepper } from '../components/registration/RegistrationStepper';
// import { PersonalDataForm } from '../components/registration/PersonalDataForm';
// import { MaritalDataForm } from '../components/registration/MaritalDataForm';
// import { useSelector } from 'react-redux';
// // import { RootState } from '@reduxjs/toolkit/query';
// // import { submitRegistration } from '../redux/slices/registrationSlice';
// import { useDispatch } from 'react-redux';
// import { EmploymentDataForm } from '../components/registration/EmploymentDataForm';
// import { ReligiousDataForm } from '../components/registration/ReligiousDataForm';
// import { MembershipDataForm } from '../components/registration/MembershipDataForm';

// const RegistrationPage = () => {
//   const currentStep = useSelector((state: any) => state.registration.currentStep);
//   const isSubmitting = useSelector((state: any) => state.registration.isSubmitting);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const renderStep = () => {
//     switch (currentStep) {
//       case 1:
//         return <PersonalDataForm />;
//       case 2:
//         return <MaritalDataForm />;
//       case 3:
//         return <EmploymentDataForm />;
//       case 4:
//         return <ReligiousDataForm />;
//       case 5:
//         return <MembershipDataForm />;
//       default:
//         return null;
//     }
//   };

//   // return (
//   //   <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
//   //     {/* Main Container */}
//   //     <div className="max-w-7xl mx-auto">
//   //       {/* Header */}
//   //       <div className="p-6 border-b border-gray-100">
//   //         <div className="flex items-center justify-between">
//   //           <div className="flex items-center space-x-3">
//   //             <span className="text-xl font-semibold text-gray-900">Church Registration</span>
//   //           </div>
//   //           <div className="text-sm text-gray-500">
//   //             Complete all steps to register
//   //           </div>
//   //         </div>
//   //       </div>

//   //       {/* Content Area */}
//   //       <div className="flex">
//   //         {/* Left Sidebar - Stepper */}
//   //         <div className="w-72 min-h-screen border-r border-gray-100 p-6">
//   //           <RegistrationStepper currentStep={currentStep} />
//   //         </div>

//   //         {/* Right Content - Form */}
//   //         <div className="flex-1 p-8">
//   //           <div className="max-w-3xl mx-auto">
//   //             {/* Step Title */}
//   //             <div className="mb-8">
//   //               <h2 className="text-2xl font-semibold text-gray-900">
//   //                 {currentStep === 1 && "Personal Information"}
//   //                 {currentStep === 2 && "Marital Status"}
//   //                 {currentStep === 3 && "Employment Details"}
//   //                 {currentStep === 4 && "Religious Background"}
//   //                 {currentStep === 5 && "Church Membership"}
//   //               </h2>
//   //               <div className="mt-1 flex items-center text-sm text-gray-500">
//   //                 <span>Step {currentStep} of 5</span>
//   //                 <div className="ml-4 w-24 bg-gray-100 rounded-full h-1.5">
//   //                   <div 
//   //                     className="h-1.5 rounded-full bg-purple-500 transition-all duration-300"
//   //                     style={{ width: `${(currentStep / 5) * 100}%` }}
//   //                   />
//   //                 </div>
//   //               </div>
//   //             </div>

//   //             {/* Form Content */}
//   //             <div className="bg-white rounded-lg shadow-sm border border-gray-100">
//   //               <div className="p-6">
//   //                 {renderStep()}
//   //               </div>
//   //             </div>
//   //           </div>
//   //         </div>
//   //       </div>
//   //     </div>
//   //   </div>
//   // );

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4">
//         {/* Header */}
//         <div className="my-10">
//           <h1 className="text-5xl font-semibold text-center">Church Registration Form</h1>
//           <p className="text-center text-gray-600 mt-2">Please complete all steps to register</p>
//         </div>
  
//         {/* Main Content */}
//         <div className="grid grid-cols-12 gap-6">
//           {/* Stepper */}
//           <div className="col-span-4">
//             <RegistrationStepper currentStep={currentStep} />
//           </div>
  
//           {/* Form */}
//           <div className="col-span-8">
//             <div className="bg-white border border-gray-100 rounded-lg p-6">
//               {renderStep()}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegistrationPage


import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  submitRegistration,
  setCurrentStep,
  resetForm
} from '../redux/slices/registrationSlice';
import { RegistrationStepper } from '../components/registration/RegistrationStepper';
import { PersonalDataForm } from '../components/registration/PersonalDataForm';
import { MaritalDataForm } from '../components/registration/MaritalDataForm';
import { EmploymentDataForm } from '../components/registration/EmploymentDataForm';
import { ReligiousDataForm } from '../components/registration/ReligiousDataForm';
import { MembershipDataForm } from '../components/registration/MembershipDataForm';
import { toast } from 'react-hot-toast'; // You'll need to install this package

const RegistrationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const currentStep = useSelector((state: any) => state.registration.currentStep);
  const isSubmitting = useSelector((state: any) => state.registration.isSubmitting);
  const submitSuccess = useSelector((state: any) => state.registration.submitSuccess);
  const submitError = useSelector((state: any) => state.registration.submitError);

  // Handle submission success
  useEffect(() => {
    if (submitSuccess) {
      toast.success('Registration submitted successfully!');
      dispatch(resetForm());
      navigate('/registration-success');
    }
  }, [submitSuccess, navigate, dispatch]);

  // Handle submission error
  useEffect(() => {
    if (submitError) {
      toast.error(submitError.message || 'Registration failed. Please try again.');
    }
  }, [submitError]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalDataForm />;
      case 2:
        return <MaritalDataForm />;
      case 3:
        return <EmploymentDataForm />;
      case 4:
        return <ReligiousDataForm />;
      case 5:
        return <MembershipDataForm />;
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (currentStep < 5) {
      dispatch(setCurrentStep(currentStep + 1));
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      dispatch(setCurrentStep(currentStep - 1));
    }
  };

  const handleSubmit = async () => {
    try {
      await dispatch(submitRegistration()).unwrap();
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="my-10">
          <h1 className="text-5xl font-semibold text-center">Church Registration Form</h1>
          <p className="text-center text-gray-600 mt-2">Please complete all steps to register</p>
        </div>
  
        {/* Main Content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Stepper */}
          <div className="col-span-4">
            <RegistrationStepper currentStep={currentStep} />
          </div>
  
          {/* Form */}
          <div className="col-span-8">
            <div className="bg-white border border-gray-100 rounded-lg p-6">
              {renderStep()}
              
              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-between">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className={`px-6 py-2 rounded-md ${
                    currentStep === 1
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-gray-600 text-white hover:bg-gray-700'
                  }`}
                >
                  Back
                </button>

                <button
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-purple-400"
                >
                  {isSubmitting 
                    ? 'Submitting...' 
                    : currentStep === 5 
                      ? 'Submit Registration' 
                      : 'Next Step'
                  }
                </button>
              </div>

              {/* Progress Indicator */}
              <div className="mt-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Step {currentStep} of 5
                  </span>
                  <span className="text-sm text-gray-600">
                    {Math.round((currentStep / 5) * 100)}% Complete
                  </span>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / 5) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;