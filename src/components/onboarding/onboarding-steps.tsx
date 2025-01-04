"use client";

import { useOnboardingForm } from "@/context/onboarding-form";
import FirstStep from "./steps/first-step";
import SecondStep from "./steps/second-step";
import ThirdStep from "./steps/third-step";
import OnboardingStepTracker from "./onboarding-step-tracker";

export default function OnboardingSteps() {
  const { currentStep } = useOnboardingForm();

  return (
    <section className="w-full lg:w-1/2 h-screen p-4 md:p-6">
      <div className="mt-10 mb-5 w-full flex flex-col items-center">
        <div>
          <h1 className="text-4xl font-semibold">Lozy</h1>
        </div>

        {currentStep === 1 && <FirstStep />}
        {currentStep === 2 && <SecondStep />}
        {currentStep === 3 && <ThirdStep />}
        {currentStep === 4 && <p>step 4</p>}
      </div>
      <OnboardingStepTracker />
    </section>
  );
}
