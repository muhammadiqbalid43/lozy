"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();

  const logoutHandler = () => {
    signOut({
      callbackUrl: `${window.location.origin}/sign-in`,
    });
  };
  return (
    <>
      <Button onClick={logoutHandler}>Logout</Button>
    </>
  );
}
