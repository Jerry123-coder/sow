// // src/components/registration/steps/MaritalDataForm.tsx
// import { useDispatch, useSelector } from 'react-redux';
// import { updateMaritalData, setCurrentStep } from '../../redux/slices/registrationSlice';

// export const MaritalDataForm = () => {
//   const dispatch = useDispatch();
//   const maritalData = useSelector((state: any) => state.registration.maritalData);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     dispatch(updateMaritalData({ [name]: value }));
//   };

//   return (
//     <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {/* Marital Status */}
//         <div className="col-span-2">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Status (Please Tick)
//           </label>
//           <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//             {['Single', 'Married', 'Separated', 'Divorced', 'Widowed'].map((status) => (
//               <div key={status} className="flex items-center">
//                 <input
//                   type="radio"
//                   id={status}
//                   name="status"
//                   value={status}
//                   checked={maritalData.status === status}
//                   onChange={handleChange}
//                   className="h-4 w-4 border-gray-300 text-purple-600 focus:ring-purple-500"
//                 />
//                 <label htmlFor={status} className="ml-2 text-sm text-gray-700">
//                   {status}
//                 </label>
//               </div>
//             ))}
//           </div>
//         </div>

//         {maritalData.status === 'Married' && (
//           <>
//             <div className="col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Type (Please if Married)
//               </label>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 {[
//                   'Customary',
//                   'Catholic Church',
//                   'Ordinance',
//                   'Other Church'
//                 ].map((type) => (
//                   <div key={type} className="flex items-center">
//                     <input
//                       type="radio"
//                       id={type}
//                       name="marriageType"
//                       value={type}
//                       checked={maritalData.marriageType === type}
//                       onChange={handleChange}
//                       className="h-4 w-4 border-gray-300 text-purple-600 focus:ring-purple-500"
//                     />
//                     <label htmlFor={type} className="ml-2 text-sm text-gray-700">
//                       {type}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Date</label>
//               <input
//                 type="date"
//                 name="marriageDate"
//                 value={maritalData.marriageDate}
//                 onChange={handleChange}
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Place</label>
//               <input
//                 type="text"
//                 name="marriagePlace"
//                 value={maritalData.marriagePlace}
//                 onChange={handleChange}
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Name of Spouse</label>
//               <input
//                 type="text"
//                 name="spouseName"
//                 value={maritalData.spouseName}
//                 onChange={handleChange}
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Spouse Nationality</label>
//               <input
//                 type="text"
//                 name="spouseNationality"
//                 value={maritalData.spouseNationality}
//                 onChange={handleChange}
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
//               />
//             </div>

//             <div className="col-span-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 Religious Denomination of Spouse
//               </label>
//               <input
//                 type="text"
//                 name="religiousDenomination"
//                 value={maritalData.religiousDenomination}
//                 onChange={handleChange}
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
//               />
//             </div>
//           </>
//         )}
//       </div>

//       <div className="flex justify-between pt-6">
//         <button
//           type="button"
//           onClick={() => dispatch(setCurrentStep(1))}
//           className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
//         >
//           Previous
//         </button>
//         <button
//           type="button"
//           onClick={() => dispatch(setCurrentStep(3))}
//           className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
//         >
//           Next
//         </button>
//       </div>
//     </form>
//   );
// };
import { useState } from 'react';
import { updateMaritalData, setCurrentStep } from '../../redux/slices/registrationSlice';
import { useDispatch, useSelector } from 'react-redux';

export const MaritalDataForm = () => {
  const dispatch = useDispatch();
  const maritalData = useSelector((state: any) => state.registration.maritalData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (maritalData.status === 'Married') {
      const requiredFields = ['marriageType', 'marriageDate', 'marriagePlace', 'spouseName', 'spouseNationality', 'religiousDenomination'];

      requiredFields.forEach(field => {
        if (!maritalData[field as keyof typeof maritalData]) {
          newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    dispatch(updateMaritalData({ [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const { [name]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleNext = () => {
    if (validateForm()) {
      dispatch(setCurrentStep(3));
    }
  };

  const isDisabled = maritalData.status !== 'Married';

  const inputClassName = "w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors duration-200";
  const labelClassName = "block text-sm font-medium text-gray-600 mb-1.5";
  const errorClassName = "mt-1.5 text-sm text-red-500";
  const sectionClassName = "space-y-6";
  const sectionTitleClassName = "text-lg font-medium text-gray-700/40 mb-4";

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
      {/* Marital Status */}
      <div className={sectionClassName}>
        <h3 className={sectionTitleClassName}>Marital Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {['Single', 'Married', 'Separated', 'Divorced', 'Widowed'].map((status) => (
            <div key={status} className="flex items-center">
              <input
                type="radio"
                id={status}
                name="status"
                value={status}
                checked={maritalData.status === status}
                onChange={handleChange}
                className="h-4 w-4 border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <label htmlFor={status} className="ml-2 text-sm text-gray-700">
                {status}
              </label>
            </div>
          ))}
        </div>
      </div>

      {isDisabled && (
        <div className="bg-purple-50 border border-purple-200 p-4 rounded-md">
          <p className="text-gray-600 text-sm">
            Since you are not married, the following fields are disabled. You can proceed to the next step.
          </p>
        </div>
      )}

      {/* Marriage Details */}
      <div className={`${sectionClassName} ${isDisabled ? 'opacity-50' : ''}`}>
        <h3 className={sectionTitleClassName}>Marriage Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="marriageType" className={labelClassName}>
              Marriage Type <span className="text-red-500">*</span>
            </label>
            <select
              id="marriageType"
              name="marriageType"
              value={maritalData.marriageType}
              onChange={handleChange}
              className={inputClassName}
              disabled={isDisabled}
            >
              <option value="">Select marriage type</option>
              <option value="Customary">Customary</option>
              <option value="Catholic Church">Catholic Church</option>
              <option value="Ordinance">Ordinance</option>
              <option value="Other Church">Other Church</option>
            </select>
            {errors.marriageType && <p className={errorClassName}>{errors.marriageType}</p>}
          </div>

          <div>
            <label htmlFor="marriageDate" className={labelClassName}>
              Marriage Date <span className="text-red-500">*</span>
            </label>
            <input
              id="marriageDate"
              type="date"
              name="marriageDate"
              value={maritalData.marriageDate}
              onChange={handleChange}
              className={inputClassName}
              disabled={isDisabled}
            />
            {errors.marriageDate && <p className={errorClassName}>{errors.marriageDate}</p>}
          </div>

          <div className="col-span-2">
            <label htmlFor="marriagePlace" className={labelClassName}>
              Marriage Place <span className="text-red-500">*</span>
            </label>
            <input
              id="marriagePlace"
              type="text"
              name="marriagePlace"
              value={maritalData.marriagePlace}
              onChange={handleChange}
              className={inputClassName}
              placeholder="Enter marriage place"
              disabled={isDisabled}
            />
            {errors.marriagePlace && <p className={errorClassName}>{errors.marriagePlace}</p>}
          </div>
        </div>
      </div>

      {/* Spouse Details */}
      <div className={`${sectionClassName} ${isDisabled ? 'opacity-50' : ''}`}>
        <h3 className={sectionTitleClassName}>Spouse Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2">
            <label htmlFor="spouseName" className={labelClassName}>
              Spouse Name <span className="text-red-500">*</span>
            </label>
            <input
              id="spouseName"
              type="text"
              name="spouseName"
              value={maritalData.spouseName}
              onChange={handleChange}
              className={inputClassName}
              placeholder="Enter spouse name"
              disabled={isDisabled}
            />
            {errors.spouseName && <p className={errorClassName}>{errors.spouseName}</p>}
          </div>

          <div>
            <label htmlFor="spouseNationality" className={labelClassName}>
              Spouse Nationality <span className="text-red-500">*</span>
            </label>
            <input
              id="spouseNationality"
              type="text"
              name="spouseNationality"
              value={maritalData.spouseNationality}
              onChange={handleChange}
              className={inputClassName}
              placeholder="Enter spouse nationality"
              disabled={isDisabled}
            />
            {errors.spouseNationality && <p className={errorClassName}>{errors.spouseNationality}</p>}
          </div>

          <div>
            <label htmlFor="religiousDenomination" className={labelClassName}>
              Religious Denomination <span className="text-red-500">*</span>
            </label>
            <input
              id="religiousDenomination"
              type="text"
              name="religiousDenomination"
              value={maritalData.religiousDenomination}
              onChange={handleChange}
              className={inputClassName}
              placeholder="Enter religious denomination"
              disabled={isDisabled}
            />
            {errors.religiousDenomination && <p className={errorClassName}>{errors.religiousDenomination}</p>}
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
        <button
          type="button"
          onClick={() => dispatch(setCurrentStep(1))}
          className="px-6 py-2.5 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-all duration-200"
        >
          Previous
        </button>
        <div className="flex items-center space-x-4">
          <p className="text-sm text-red-500">
            {Object.keys(errors).length > 0 && "Please fill in all required fields correctly"}
          </p>
          <button
            type="button"
            onClick={handleNext}
            disabled={Object.keys(errors).length > 0}
            className="px-6 py-2.5 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Next Step
          </button>
        </div>
      </div>
    </form>
  );
};