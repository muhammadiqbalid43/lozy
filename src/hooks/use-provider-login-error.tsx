import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "./use-toast";
import { useEffect } from "react";

export const useProviderLoginError = (showLoggedInfo: boolean) => {
  const params = useSearchParams();
  const session = useSession();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const error = params.get("error");
    if (error && session.status === "unauthenticated") {
      switch (error) {
        case "OAuthAccountNotLinked":
          toast({
            title: "This email is already in use...",
            variant: "destructive",
          });
          break;
        case "OAuthCreateAccount":
          toast({
            title: "This username is already taken",
            variant: "destructive",
          });
          break;
        case "Callback":
          toast({
            title: "Oh no..Something went wrong. Please try again",
            variant: "destructive",
          });
          break;
        default:
          toast({
            title: "Oh no..Something went wrong. Please try again",
            variant: "destructive",
          });
      }

      const timer = setTimeout(() => {
        router.replace("/sign-in");
      });

      return () => {
        clearTimeout(timer);
      };
    }

    if (session.status === "authenticated" && showLoggedInfo) {
      toast({
        title: "You have been logged in!",
      });
    }
  }, [params, toast, session, router, showLoggedInfo]);
};
