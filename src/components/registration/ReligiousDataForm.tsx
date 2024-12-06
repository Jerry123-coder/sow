import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateReligiousData, setCurrentStep } from '../../redux/slices/registrationSlice';

export const ReligiousDataForm = () => {
  const dispatch = useDispatch();
  const religiousData = useSelector((state: any) => state.registration.religiousData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (religiousData.baptized) {
      if (!religiousData.baptismDate) {
        newErrors.baptismDate = 'Baptism date is required';
      }
      if (!religiousData.baptismPlace) {
        newErrors.baptismPlace = 'Baptism place is required';
      }
    }

    if (religiousData.firstCommunion) {
      if (!religiousData.communionDate) {
        newErrors.communionDate = 'First Communion date is required';
      }
      if (!religiousData.communionPlace) {
        newErrors.communionPlace = 'First Communion place is required';
      }
    }

    if (religiousData.confirmed) {
      if (!religiousData.confirmationDate) {
        newErrors.confirmationDate = 'Confirmation date is required';
      }
      if (!religiousData.confirmationPlace) {
        newErrors.confirmationPlace = 'Confirmation place is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: string, value: any) => {
    dispatch(updateReligiousData({ [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const { [field]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleNext = () => {
    if (validateForm()) {
      dispatch(setCurrentStep(5));
    }
  };

  const noSacramentsSelected = !religiousData.baptized && !religiousData.firstCommunion && !religiousData.confirmed;

  const inputClassName = "w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors duration-200";
  const labelClassName = "block text-sm font-medium text-gray-600 mb-1.5";
  const errorClassName = "mt-1.5 text-sm text-red-500";
  const sectionClassName = "space-y-6";
  const sectionTitleClassName = "text-lg font-medium text-gray-700/40 mb-4";

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
      {noSacramentsSelected && (
        <div className="bg-purple-50 border border-purple-200 p-4 rounded-md">
          <p className="text-gray-600 text-sm">
            If you haven't received any of these sacraments, you can proceed to the next step.
          </p>
        </div>
      )}

      {/* Baptism */}
      <div className={sectionClassName}>
        <h3 className={sectionTitleClassName}>Baptism</h3>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="baptized"
            checked={religiousData.baptized}
            onChange={(e) => handleChange('baptized', e.target.checked)}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
          <label htmlFor="baptized" className="ml-2 block text-sm text-gray-900">
            I have been baptized
          </label>
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${!religiousData.baptized ? 'opacity-50' : ''}`}>
          <div>
            <label htmlFor="baptismDate" className={labelClassName}>
              Date <span className="text-red-500">*</span>
            </label>
            <input
              id="baptismDate"
              type="date"
              value={religiousData.baptismDate}
              onChange={(e) => handleChange('baptismDate', e.target.value)}
              disabled={!religiousData.baptized}
              className={inputClassName}
            />
            {errors.baptismDate && <p className={errorClassName}>{errors.baptismDate}</p>}
          </div>

          <div>
            <label htmlFor="baptismPlace" className={labelClassName}>
              Place <span className="text-red-500">*</span>
            </label>
            <input
              id="baptismPlace"
              type="text"
              value={religiousData.baptismPlace}
              onChange={(e) => handleChange('baptismPlace', e.target.value)}
              disabled={!religiousData.baptized}
              className={inputClassName}
              placeholder="Enter baptism place"
            />
            {errors.baptismPlace && <p className={errorClassName}>{errors.baptismPlace}</p>}
          </div>
        </div>
      </div>

      {/* First Communion */}
      <div className={sectionClassName}>
        <h3 className={sectionTitleClassName}>First Communion</h3>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="firstCommunion"
            checked={religiousData.firstCommunion}
            onChange={(e) => handleChange('firstCommunion', e.target.checked)}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
          <label htmlFor="firstCommunion" className="ml-2 block text-sm text-gray-900">
            I have received First Communion
          </label>
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${!religiousData.firstCommunion ? 'opacity-50' : ''}`}>
          <div>
            <label htmlFor="communionDate" className={labelClassName}>
              Date <span className="text-red-500">*</span>
            </label>
            <input
              id="communionDate"
              type="date"
              value={religiousData.communionDate}
              onChange={(e) => handleChange('communionDate', e.target.value)}
              disabled={!religiousData.firstCommunion}
              className={inputClassName}
            />
            {errors.communionDate && <p className={errorClassName}>{errors.communionDate}</p>}
          </div>

          <div>
            <label htmlFor="communionPlace" className={labelClassName}>
              Place <span className="text-red-500">*</span>
            </label>
            <input
              id="communionPlace"
              type="text"
              value={religiousData.communionPlace}
              onChange={(e) => handleChange('communionPlace', e.target.value)}
              disabled={!religiousData.firstCommunion}
              className={inputClassName}
              placeholder="Enter First Communion place"
            />
            {errors.communionPlace && <p className={errorClassName}>{errors.communionPlace}</p>}
          </div>
        </div>
      </div>

      {/* Confirmation */}
      <div className={sectionClassName}>
        <h3 className={sectionTitleClassName}>Confirmation</h3>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="confirmed"
            checked={religiousData.confirmed}
            onChange={(e) => handleChange('confirmed', e.target.checked)}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
          <label htmlFor="confirmed" className="ml-2 block text-sm text-gray-900">
            I have been confirmed
          </label>
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${!religiousData.confirmed ? 'opacity-50' : ''}`}>
          <div>
            <label htmlFor="confirmationDate" className={labelClassName}>
              Date <span className="text-red-500">*</span>
            </label>
            <input
              id="confirmationDate"
              type="date"
              value={religiousData.confirmationDate}
              onChange={(e) => handleChange('confirmationDate', e.target.value)}
              disabled={!religiousData.confirmed}
              className={inputClassName}
            />
            {errors.confirmationDate && <p className={errorClassName}>{errors.confirmationDate}</p>}
          </div>

          <div>
            <label htmlFor="confirmationPlace" className={labelClassName}>
              Place <span className="text-red-500">*</span>
            </label>
            <input
              id="confirmationPlace"
              type="text"
              value={religiousData.confirmationPlace}
              onChange={(e) => handleChange('confirmationPlace', e.target.value)}
              disabled={!religiousData.confirmed}
              className={inputClassName}
              placeholder="Enter confirmation place"
            />
            {errors.confirmationPlace && <p className={errorClassName}>{errors.confirmationPlace}</p>}
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
        <button
          type="button"
          onClick={() => dispatch(setCurrentStep(3))}
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