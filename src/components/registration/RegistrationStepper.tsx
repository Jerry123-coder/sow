import { motion } from 'framer-motion';

const steps = [
  { id: 1, title: 'Personal Information', icon: 'user' },
  { id: 2, title: 'Marital Status', icon: 'heart' },
  { id: 3, title: 'Employment', icon: 'briefcase' },
  { id: 4, title: 'Religious Background', icon: 'church' },
  { id: 5, title: 'Church Membership', icon: 'users' }
];

export const RegistrationStepper = ({ currentStep }: { currentStep: number }) => {
    return (
      <div className="h-full bg-white border border-gray-100 rounded-lg p-6 flex flex-col">
        {/* Steps Container */}
        <div className="flex-1 space-y-10">
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              <div className="flex items-center space-x-3">
                {/* Circle with Icon/Number */}
                <motion.div
                  initial={false}
                  animate={{
                    scale: currentStep >= step.id ? 1 : 0.95,
                    backgroundColor: currentStep >= step.id ? '#8B5CF6' : '#F3F4F6'
                  }}
                  className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center 
                    ${currentStep >= step.id ? 'bg-purple-500' : 'bg-gray-100'}`}
                  transition={{ duration: 0.2 }}
                >
                  <span className={`text-sm font-medium
                    ${currentStep >= step.id ? 'text-white' : 'text-gray-400'}`}
                  >
                    {step.id}
                  </span>
                </motion.div>
  
                {/* Step Title */}
                <div className="flex flex-col">
                  <span className={`text-sm ${
                    currentStep >= step.id ? 'text-gray-900 font-medium' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                  {currentStep === step.id && (
                    <span className="text-xs text-purple-500">In progress</span>
                  )}
                </div>
              </div>
  
              {/* Vertical Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-5 top-10 -ml-px h-12 w-0.5">
                  <div className="h-full w-0.5 bg-gray-200"/>
                  <motion.div 
                    className="absolute top-0 h-full w-0.5 bg-purple-500"
                    initial={{ scaleY: 0 }}
                    animate={{ 
                      scaleY: currentStep > step.id ? 1 : 0 
                    }}
                    style={{ originY: 0 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
  
        {/* Progress Indicator */}
        <div className="pt-6 mt-auto border-t border-gray-100">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{(currentStep / steps.length * 100).toFixed(0)}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full">
            <motion.div
              className="h-full bg-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>
    );
  };
  
  