import { useState } from 'react';
import { updatePersonalData, setCurrentStep } from '../../redux/slices/registrationSlice';
import { useDispatch, useSelector } from 'react-redux';

export const PersonalDataForm = () => {
  const dispatch = useDispatch();
  const personalData = useSelector((state:any) => state.registration.personalData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const requiredFields = [
      'surname',
      'firstName',
      'sex',
      'dateOfBirth',
      'placeOfBirth',
      'nationality',
      'homeTown',
      'region',
      'fatherName',
      'motherName',
      'residentialAddress',
      'telephone',
      'email'
    ];

    requiredFields.forEach(field => {
      if (!personalData[field as keyof typeof personalData]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
      }
    });

    if (personalData.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(personalData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (personalData.telephone && !/^\+?[\d\s-]{10,}$/.test(personalData.telephone)) {
      newErrors.telephone = 'Invalid phone number format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    dispatch(updatePersonalData({ [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const { [name]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleNext = () => {
    if (validateForm()) {
      dispatch(setCurrentStep(2));
    }
  };

  const inputClassName = "w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors duration-200";
  const labelClassName = "block text-sm font-medium text-gray-600 mb-1.5";
  const errorClassName = "mt-1.5 text-sm text-red-500";
  const sectionClassName = "space-y-6";
  const sectionTitleClassName = "text-lg font-medium text-gray-700/40 mb-4";

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
      {/* Basic Information */}
      <div className={sectionClassName}>
        <h3 className={sectionTitleClassName}>Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="surname" className={labelClassName}>
              Surname <span className="text-red-500">*</span>
            </label>
            <input
              id="surname"
              type="text"
              name="surname"
              value={personalData.surname}
              onChange={handleChange}
              className={inputClassName}
              placeholder="Enter your surname"
            />
            {errors.surname && <p className={errorClassName}>{errors.surname}</p>}
          </div>

          <div>
            <label htmlFor="firstName" className={labelClassName}>
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              value={personalData.firstName}
              onChange={handleChange}
              className={inputClassName}
              placeholder="Enter your first name"
            />
            {errors.firstName && <p className={errorClassName}>{errors.firstName}</p>}
          </div>

          <div>
            <label htmlFor="otherNames" className={labelClassName}>Other Names</label>
            <input
              id="otherNames"
              type="text"
              name="otherNames"
              value={personalData.otherNames}
              onChange={handleChange}
              className={inputClassName}
              placeholder="Enter other names (if any)"
            />
          </div>

          <div>
            <label htmlFor="sex" className={labelClassName}>
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              id="sex"
              name="sex"
              value={personalData.sex}
              onChange={handleChange}
              className={inputClassName}
            >
              <option value="">Select gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
            {errors.sex && <p className={errorClassName}>{errors.sex}</p>}
          </div>
        </div>
      </div>

      {/* Birth Information */}
      <div className={sectionClassName}>
        <h3 className={sectionTitleClassName}>Birth Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="dateOfBirth" className={labelClassName}>
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              id="dateOfBirth"
              type="date"
              name="dateOfBirth"
              value={personalData.dateOfBirth}
              onChange={handleChange}
              className={inputClassName}
            />
            {errors.dateOfBirth && <p className={errorClassName}>{errors.dateOfBirth}</p>}
          </div>

          <div>
            <label htmlFor="placeOfBirth" className={labelClassName}>
              Place of Birth <span className="text-red-500">*</span>
            </label>
            <input
              id="placeOfBirth"
              type="text"
              name="placeOfBirth"
              value={personalData.placeOfBirth}
              onChange={handleChange}
              className={inputClassName}
              placeholder="Enter place of birth"
            />
            {errors.placeOfBirth && <p className={errorClassName}>{errors.placeOfBirth}</p>}
          </div>

          <div>
            <label htmlFor="nationality" className={labelClassName}>
              Nationality <span className="text-red-500">*</span>
            </label>
            <input
              id="nationality"
              type="text"
              name="nationality"
              value={personalData.nationality}
              onChange={handleChange}
              className={inputClassName}
              placeholder="Enter your nationality"
            />
            {errors.nationality && <p className={errorClassName}>{errors.nationality}</p>}
          </div>

          <div>
            <label htmlFor="homeTown" className={labelClassName}>
              Home Town <span className="text-red-500">*</span>
            </label>
            <input
              id="homeTown"
              type="text"
              name="homeTown"
              value={personalData.homeTown}
              onChange={handleChange}
              className={inputClassName}
              placeholder="Enter your home town"
            />
            {errors.homeTown && <p className={errorClassName}>{errors.homeTown}</p>}
          </div>

          <div>
            <label htmlFor="region" className={labelClassName}>
              Region <span className="text-red-500">*</span>
            </label>
            <input
              id="region"
              type="text"
              name="region"
              value={personalData.region}
              onChange={handleChange}
              className={inputClassName}
              placeholder="Enter your region"
            />
            {errors.region && <p className={errorClassName}>{errors.region}</p>}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className={sectionClassName}>
        <h3 className={sectionTitleClassName}>Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2">
            <label htmlFor="residentialAddress" className={labelClassName}>
              Residential Address <span className="text-red-500">*</span>
            </label>
            <textarea
              id="residentialAddress"
              name="residentialAddress"
              value={personalData.residentialAddress}
              onChange={handleChange}
              rows={3}
              className={inputClassName}
              placeholder="Enter your residential address"
            />
            {errors.residentialAddress && <p className={errorClassName}>{errors.residentialAddress}</p>}
          </div>

          <div>
            <label htmlFor="telephone" className={labelClassName}>
              Telephone <span className="text-red-500">*</span>
            </label>
            <input
              id="telephone"
              type="tel"
              name="telephone"
              value={personalData.telephone}
              onChange={handleChange}
              className={inputClassName}
              placeholder="+XXX-XXX-XXXX"
            />
            {errors.telephone && <p className={errorClassName}>{errors.telephone}</p>}
          </div>

          <div>
            <label htmlFor="email" className={labelClassName}>
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={personalData.email}
              onChange={handleChange}
              className={inputClassName}
              placeholder="example@email.com"
            />
            {errors.email && <p className={errorClassName}>{errors.email}</p>}
          </div>
        </div>
      </div>

      {/* Family Information */}
      <div className={sectionClassName}>
        <h3 className={sectionTitleClassName}>Family Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="fatherName" className={labelClassName}>
              Father's Name <span className="text-red-500">*</span>
            </label>
            <input
              id="fatherName"
              type="text"
              name="fatherName"
              value={personalData.fatherName}
              onChange={handleChange}
              className={inputClassName}
              placeholder="Enter father's name"
            />
            {errors.fatherName && <p className={errorClassName}>{errors.fatherName}</p>}
          </div>

          <div>
            <label htmlFor="motherName" className={labelClassName}>
              Mother's Name <span className="text-red-500">*</span>
            </label>
            <input
              id="motherName"
              type="text"
              name="motherName"
              value={personalData.motherName}
              onChange={handleChange}
              className={inputClassName}
              placeholder="Enter mother's name"
            />
            {errors.motherName && <p className={errorClassName}>{errors.motherName}</p>}
          </div>
        </div>
      </div>

      {/* Profile Photo */}
      <div className={sectionClassName}>
        <h3 className={sectionTitleClassName}>Profile Photo</h3>
        <div>
          <label htmlFor="passportPhoto" className={labelClassName}>Upload Passport Photo</label>
          <input
            id="passportPhoto"
            type="file"
            name="passportPhoto"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                dispatch(updatePersonalData({ passportPhoto: e.target.files[0] }));
              }
            }}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 transition-all duration-200"
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
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
    </form>
  );
};