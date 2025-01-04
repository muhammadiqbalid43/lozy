import { GalleryVerticalEnd } from "lucide-react";
import { Metadata } from "next";
import RegisterForm from "./sign-up-form";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Sign up",
};

export default function SignUpPage() {
  return (
    <div className="flex w-full min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Lozy
        </a>
        <RegisterForm />
      </div>
    </div>
  );
}
