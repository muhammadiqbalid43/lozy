import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "../providers/auth-provider";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full h-screen flex justify-center items-center ">
      <AuthProvider>
        <Toaster />
        {children}
      </AuthProvider>
    </main>
  );
}
