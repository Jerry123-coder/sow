import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  updateMembershipData, 
  setCurrentStep, 
  addMinistry,
  removeMinistry,
  submitRegistration 
} from '../../redux/slices/registrationSlice';
import { PlusCircle, XCircle, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const AVAILABLE_SOCIETIES = [
  'St. Anthony\'s Guild',
  'Legion of Mary',
  'Catholic Men Organization (CMO)',
  'Catholic Women Organization (CWO)',
  'Catholic Youth Organization (CYO)',
  'Sacred Heart of Jesus',
  'Blue Army',
  'Block Rosary',
  'Charismatic Renewal',
  'St. Jude Society',
  'Divine Mercy',
  'Altar Servers',
  'Church Choir',
  'Lectors Guild'
];

const DAY_GROUPS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

interface Ministry {
  name: string;
  role: string;
  startDate: string;
  endDate: string;
}

const SuccessModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="flex flex-col items-center">
          <div className="bg-green-100 p-3 rounded-full">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-gray-900">Registration Successful!</h3>
          <p className="mt-2 text-center text-gray-600">
            Thank you for registering with our church. We're glad to have you as part of our community.
          </p>
          <button
            onClick={onClose}
            className="mt-6 bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-purple-700 transition-all duration-200"
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};

export const MembershipDataForm = () => {
  const dispatch = useDispatch();
  const membershipData = useSelector((state: any) => state.registration.membershipData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [newMinistry, setNewMinistry] = useState<Ministry>({ 
    name: '', 
    role: '',
    startDate: '', 
    endDate: '' 
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!membershipData.dateJoined) {
      newErrors.dateJoined = 'Date joined is required';
    }

    if (!membershipData.dayGroup) {
      newErrors.dayGroup = 'Day group is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      // await dispatch(submitRegistration()).unwrap();
      setIsSuccessModalOpen(true);
    } catch (error) {
      toast.error('Failed to submit registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddMinistry = () => {
    const { name, role, startDate, endDate } = newMinistry;

    if (name && role && startDate) {
      // dispatch(addMinistry(newMinistry));
      setNewMinistry({ name: '', role: '', startDate: '', endDate: '' });
      toast.success('Ministry added successfully');
    } else {
      toast.error('Please fill in all required ministry fields');
    }
  };

  const handleChange = (field: string, value: any) => {
    dispatch(updateMembershipData({ [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const { [field]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const inputClassName = "w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors duration-200";
  const labelClassName = "block text-sm font-medium text-gray-600 mb-1.5";
  const errorClassName = "mt-1.5 text-sm text-red-500";
  const sectionClassName = "space-y-6";
  const sectionTitleClassName = "text-lg font-medium text-gray-700/40 mb-4";

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
        {/* Church Membership */}
        <div className={sectionClassName}>
          <h3 className={sectionTitleClassName}>Church Membership</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="dateJoined" className={labelClassName}>
                Date Joined <span className="text-red-500">*</span>
              </label>
              <input
                id="dateJoined"
                type="date"
                value={membershipData.dateJoined}
                onChange={(e) => handleChange('dateJoined', e.target.value)}
                className={inputClassName}
              />
              {errors.dateJoined && <p className={errorClassName}>{errors.dateJoined}</p>}
            </div>

            <div>
              <label htmlFor="previousChurch" className={labelClassName}>
                Previous Church
              </label>
              <input
                id="previousChurch"
                type="text"
                value={membershipData.previousChurch}
                onChange={(e) => handleChange('previousChurch', e.target.value)}
                className={inputClassName}
                placeholder="Enter previous church (if any)"
              />
            </div>

            <div>
              <label htmlFor="dayGroup" className={labelClassName}>
                Day Group <span className="text-red-500">*</span>
              </label>
              <select
                id="dayGroup"
                value={membershipData.dayGroup}
                onChange={(e) => handleChange('dayGroup', e.target.value)}
                className={inputClassName}
              >
                <option value="">Select a day group</option>
                {DAY_GROUPS.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
              {errors.dayGroup && <p className={errorClassName}>{errors.dayGroup}</p>}
            </div>
          </div>
        </div>

        {/* Church Societies */}
        <div className={sectionClassName}>
          <h3 className={sectionTitleClassName}>Church Societies</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {AVAILABLE_SOCIETIES.map((society) => (
              <div key={society} className="flex items-center">
                <input
                  type="checkbox"
                  id={society}
                  checked={membershipData.societies.includes(society)}
                  onChange={() => {
                    const updated = membershipData.societies.includes(society)
                      ? membershipData.societies.filter((s:any) => s !== society)
                      : [...membershipData.societies, society];
                    handleChange('societies', updated);
                  }}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor={society} className="ml-2 text-sm text-gray-700">
                  {society}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Ministry of Service */}
        <div className={sectionClassName}>
          <h3 className={sectionTitleClassName}>Ministry of Service</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="ministryName" className={labelClassName}>
                  Ministry Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="ministryName"
                  type="text"
                  value={newMinistry.name}
                  onChange={(e) => setNewMinistry(prev => ({ ...prev, name: e.target.value }))}
                  className={inputClassName}
                  placeholder="Enter ministry name"
                />
              </div>
              <div>
                <label htmlFor="ministryRole" className={labelClassName}>
                  Role <span className="text-red-500">*</span>
                </label>
                <input
                  id="ministryRole"
                  type="text"
                  value={newMinistry.role}
                  onChange={(e) => setNewMinistry(prev => ({ ...prev, role: e.target.value }))}
                  className={inputClassName}
                  placeholder="Enter your role"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="ministryStartDate" className={labelClassName}>
                  Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  id="ministryStartDate"
                  type="date"
                  value={newMinistry.startDate}
                  onChange={(e) => setNewMinistry(prev => ({ ...prev, startDate: e.target.value }))}
                  className={inputClassName}
                />
              </div>
              <div>
                <label htmlFor="ministryEndDate" className={labelClassName}>
                  End Date
                </label>
                <input
                  id="ministryEndDate"
                  type="date"
                  value={newMinistry.endDate}
                  onChange={(e) => setNewMinistry(prev => ({ ...prev, endDate: e.target.value }))}
                  className={inputClassName}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddMinistry}
              className="flex items-center text-purple-600 hover:text-purple-700"
            >
              <PlusCircle className="w-5 h-5 mr-1.5" />
              Add Ministry
            </button>

            {membershipData.ministries.map((ministry:any, index:any) => (
              <div key={index} className="flex justify-between items-center bg-gray-50 p-4 rounded-md border">
                <div>
                  <p className="font-medium">{ministry.name}</p>
                  <p className="text-sm text-gray-500">{ministry.role}</p>
                  <p className="text-sm text-gray-500">
                    {ministry.startDate} - {ministry.endDate || 'Present'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => dispatch(removeMinistry(index))}
                  className="text-red-500 hover:text-red-700"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
          <button
            type="button"
            onClick={() => dispatch(setCurrentStep(4))}
            className="px-6 py-2.5 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-all duration-200"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || Object.keys(errors).length > 0}
            className="px-6 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Registration'}
          </button>
        </div>
      </form>
      
      <SuccessModal 
        isOpen={isSuccessModalOpen} 
        onClose={() => {
          setIsSuccessModalOpen(false);
          // Optionally reset form or redirect
        }} 
      />
    </>
  );
};