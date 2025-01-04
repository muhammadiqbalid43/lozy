import OnboardingSteps from "@/components/onboarding/onboarding-steps";
import OnboardingSummary from "@/components/onboarding/onboarding-summary";
import { OnboardingFormProvider } from "@/context/onboarding-form";
import { checkOnboarding } from "@/lib/check-onboarding";
import React from "react";

export default async function Onboarding() {
  const session = await checkOnboarding("/onboarding");
  return (
    <OnboardingFormProvider session={session}>
      <OnboardingSteps />
      <OnboardingSummary />
    </OnboardingFormProvider>
  );
}
