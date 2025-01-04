import React, { ReactNode } from "react";

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen w-full">
      <div className="w-full flex">{children}</div>
    </main>
  );
}
