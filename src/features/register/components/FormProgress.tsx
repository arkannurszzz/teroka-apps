import { Check } from 'lucide-react';

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
  steps: Array<{
    number: number;
    title: string;
    description: string;
  }>;
}

export function FormProgress({ currentStep, totalSteps, steps }: FormProgressProps) {
  return (
    <div className="mb-8">
      {/* Progress Bar */}
      <div className="relative">
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200">
          <div
            className="h-full bg-red-600 transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step) => {
            const isCompleted = step.number < currentStep;
            const isCurrent = step.number === currentStep;
            const isUpcoming = step.number > currentStep;

            return (
              <div key={step.number} className="flex flex-col items-center">
                {/* Circle */}
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    font-semibold text-sm transition-all duration-300
                    ${
                      isCompleted
                        ? 'bg-red-600 text-white'
                        : isCurrent
                        ? 'bg-red-600 text-white ring-4 ring-red-100'
                        : 'bg-gray-200 text-gray-400'
                    }
                  `}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : step.number}
                </div>

                {/* Label */}
                <div className="mt-2 text-center hidden sm:block">
                  <div
                    className={`
                      text-sm font-medium
                      ${isCurrent ? 'text-red-600' : isCompleted ? 'text-gray-900' : 'text-gray-400'}
                    `}
                  >
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{step.description}</div>
                </div>

                {/* Mobile label (only current step) */}
                <div className="mt-2 text-center sm:hidden">
                  {isCurrent && (
                    <>
                      <div className="text-sm font-medium text-red-600">{step.title}</div>
                      <div className="text-xs text-gray-500 mt-1">{step.description}</div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Counter (Mobile) */}
      <div className="mt-4 text-center sm:hidden">
        <span className="text-sm text-gray-600">
          Langkah {currentStep} dari {totalSteps}
        </span>
      </div>
    </div>
  );
}
