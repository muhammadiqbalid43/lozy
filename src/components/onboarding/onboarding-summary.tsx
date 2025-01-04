"use client";

import { useOnboardingForm } from "@/context/onboarding-form";
import UserAvatar from "../ui/user-avatar";

export default function OnboardingSummary() {
  const { name, profileImage, useCase, currentStep } = useOnboardingForm();
  return (
    <section className="hidden lg:w-1/2 bg-primary lg:flex justify-center items-center">
      {currentStep < 3 && (
        <div className="bg-card rounded-2xl w-96 min-h-[10rem] shadow-sm flex flex-col items-center p-4 py-8 gap-5">
          <UserAvatar
            className="w-32 h-32 shadow-sm mt-[-5rem]"
            size={40}
            profileImage={profileImage}
          />
          <div className="text-center space-y-1.5 text-3xl break-words max-w-xs font-semibold">
            {name && <p>{name}</p>}
          </div>
          {!useCase && <span className="bg-muted rounded-md w-24 h-8"></span>}
          {useCase && (
            <p>
              {useCase === "WORK" && "For work"}
              {useCase === "STUDY" && "For study"}
              {useCase === "PERSONAL_USE" && "For personal use"}
            </p>
          )}
        </div>
      )}
    </section>
  );
}
