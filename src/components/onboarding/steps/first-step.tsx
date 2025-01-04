import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useOnboardingForm } from "@/context/onboarding-form";
import {
  firstOnboardingSchema,
  FirstOnboardingSchema,
} from "@/schema/first-onboarding-schema";
import { ActionType } from "@/types/onboarding";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { useForm } from "react-hook-form";

export default function FirstStep() {
  const { currentStep, name, dispatch } = useOnboardingForm();

  const form = useForm<FirstOnboardingSchema>({
    resolver: zodResolver(firstOnboardingSchema),
    defaultValues: {
      name: name ? name : "",
    },
  });

  const onSubmit = (data: FirstOnboardingSchema) => {
    console.log(data);
    dispatch({ type: ActionType.NAME, payload: data.name! });
    dispatch({ type: ActionType.CHANGE_SITE, payload: currentStep + 1 });
  };
  return (
    <>
      <h2 className="font-bold text-4xl md:text-5xl flex flex-col items-center my-10">
        <span>Let&apos;s get you ready</span>
      </h2>
      <div className="max-w-md w-full space-y-8">
        <div className="w-full flex flex-col justify-center items-center gap-2">
          <p>First Step Photo</p>
          <div>
            <User />
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-muted"
                        placeholder="Enter the name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="w-full max-w-md font-semibold">Continue</Button>
          </form>
        </Form>
      </div>
    </>
  );
}
