import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmploymentData, setCurrentStep } from '../../redux/slices/registrationSlice';

export const EmploymentDataForm = () => {
  const dispatch = useDispatch();
  const employmentData = useSelector((state: any) => state.registration.employmentData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!employmentData.employmentStatus) {
      newErrors.employmentStatus = "Employment Status is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    dispatch(updateEmploymentData({ [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const { [name]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleNext = () => {
    if (validateForm()) {
      dispatch(setCurrentStep(4));
    }
  };

  const inputClassName = "w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors duration-200";
  const labelClassName = "block text-sm font-medium text-gray-600 mb-1.5";
  const errorClassName = "mt-1.5 text-sm text-red-500";
  const sectionClassName = "space-y-6";
  const sectionTitleClassName = "text-lg font-medium text-gray-700/40 mb-4";

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
      {/* Employment Status */}
      <div className={sectionClassName}>
        <h3 className={sectionTitleClassName}>Employment Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {['Employed', 'Self-employed', 'Unemployed', 'Student', 'Retired', 'Other'].map((status) => (
            <div key={status} className="flex items-center">
              <input
                type="radio"
                id={status}
                name="employmentStatus"
                value={status}
                checked={employmentData.employmentStatus === status}
                onChange={handleChange}
                className="h-4 w-4 border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <label htmlFor={status} className="ml-2 text-sm text-gray-700">
                {status}
              </label>
            </div>
          ))}
        </div>
        {errors.employmentStatus && <p className={errorClassName}>{errors.employmentStatus}</p>}
      </div>

      {/* Employment Details */}
      <div className={sectionClassName}>
        <h3 className={sectionTitleClassName}>Employment Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="occupation" className={labelClassName}>
              Occupation
            </label>
            <input
              id="occupation"
              type="text"
              name="occupation"
              value={employmentData.occupation}
              onChange={handleChange}
              className={inputClassName}
              placeholder="Enter your occupation"
            />
          </div>

          <div>
            <label htmlFor="profession" className={labelClassName}>
              Profession
            </label>
            <input
              id="profession"
              type="text"
              name="profession"
              value={employmentData.profession}
              onChange={handleChange}
              className={inputClassName}
              placeholder="Enter your profession"
            />
          </div>

          <div className="col-span-2">
            <label htmlFor="placeOfWork" className={labelClassName}>
              Place of Work
            </label>
            <input
              id="placeOfWork"
              type="text"
              name="placeOfWork"
              value={employmentData.placeOfWork}
              onChange={handleChange}
              className={inputClassName}
              placeholder="Enter your place of work"
            />
          </div>

          <div className="col-span-2">
            <label htmlFor="workAddress" className={labelClassName}>
              Work Address
            </label>
            <textarea
              id="workAddress"
              name="workAddress"
              value={employmentData.workAddress}
              onChange={handleChange}
              rows={3}
              className={inputClassName}
              placeholder="Enter your work address"
            />
          </div>
        </div>
      </div>

      {/* Work Contact */}
      <div className={sectionClassName}>
        <h3 className={sectionTitleClassName}>Work Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="telephone" className={labelClassName}>
              Telephone
            </label>
            <input
              id="telephone"
              type="tel"
              name="telephone"
              value={employmentData.telephone}
              onChange={handleChange}
              className={inputClassName}
              placeholder="Enter your work telephone number"
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClassName}>
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={employmentData.email}
              onChange={handleChange}
              className={inputClassName}
              placeholder="Enter your work email address"
            />
          </div>

          <div>
            <label htmlFor="fax" className={labelClassName}>
              Fax
            </label>
            <input
              id="fax"
              type="text"
              name="fax"
              value={employmentData.fax}
              onChange={handleChange}
              className={inputClassName}
              placeholder="Enter your work fax number"
            />
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
        <button
          type="button"
          onClick={() => dispatch(setCurrentStep(2))}
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