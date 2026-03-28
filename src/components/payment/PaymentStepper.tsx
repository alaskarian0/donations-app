import { cn } from "@/lib/utils";

interface PaymentStepperProps {
  currentStep: number;
}

const steps = ["اختيار التبرع", "الدفع", "التأكيد"];

export default function PaymentStepper({ currentStep }: PaymentStepperProps) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8">
      {steps.map((step, index) => {
        const stepNum = index + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;

        return (
          <div key={step} className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all",
                  isActive && "bg-gold text-shrine-blue-dark shadow-md shadow-gold/30",
                  isCompleted && "bg-shrine-green text-white",
                  !isActive && !isCompleted && "bg-gray-200 text-gray-400"
                )}
              >
                {isCompleted ? "✓" : stepNum}
              </div>
              <span
                className={cn(
                  "text-xs sm:text-sm font-medium hidden sm:block",
                  isActive ? "text-shrine-blue-dark" : "text-gray-400"
                )}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "w-8 sm:w-16 h-0.5",
                  isCompleted ? "bg-shrine-green" : "bg-gray-200"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
