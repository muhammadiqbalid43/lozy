import { useOnboardingForm } from "@/context/onboarding-form";
import { steps } from "@/lib/constants";

export default function OnboardingStepTracker() {
  const { currentStep } = useOnboardingForm();
  return (
    <div className="flex justify-center items-center gap-2 w-full">
      {steps.map((step) => (
        <span
          key={step}
          className={`h-2.5 w-8 border px-6 py-1 rounded-md shadow-sm ${
            currentStep >= step ? "bg-primary" : "bg-muted"
          }`}
        ></span>
      ))}
    </div>
  );
}
