import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useOnboardingForm } from "@/context/onboarding-form";
import { useCases } from "@/lib/constants";
import {
  secondOnboardingSchema,
  SecondOnboardingSchema,
} from "@/schema/second-onboarding-schema";
import { ActionType } from "@/types/onboarding";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";

export default function SecondStep() {
  const { currentStep, dispatch } = useOnboardingForm();

  const form = useForm<SecondOnboardingSchema>({
    resolver: zodResolver(secondOnboardingSchema),
  });

  const onSubmit = (data: SecondOnboardingSchema) => {
    dispatch({ type: ActionType.USECASE, payload: data.useCase });
    dispatch({ type: ActionType.CHANGE_SITE, payload: currentStep + 1 });
  };
  return (
    <>
      {" "}
      <div className="flex flex-col justify-center items-center gap-4 w-full mt-10 text-center">
        <h2 className="font-bold text-4xl md:text-5xl  max-w-xs">
          How will you use <span>Lozy?</span>{" "}
        </h2>
        <p className="max-w-lg text-muted-foreground">
          We use this information to personalize your experience
        </p>
      </div>
      <div className="max-w-md w-full space-y-8 mt-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="useCase"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {useCases.map((useCase) => (
                        <FormItem
                          key={useCase.case}
                          className={`flex items-center space-x-3 space-y-0 p-3 rounded-md transition-colors duration-200 relative overflow-hidden ${
                            form.getValues("useCase") === useCase.case
                              ? "bg-primary/40"
                              : "hover:bg-primary/10"
                          }`}
                        >
                          <FormControl
                            onClick={(e) => {
                              const target = e.target as HTMLInputElement;
                              dispatch({
                                type: ActionType.USECASE,
                                payload: target.value,
                              });
                            }}
                          >
                            <RadioGroupItem value={useCase.case} />
                          </FormControl>
                          <FormLabel className="font-normal lg:text-lg h-full left-9 flex items-center absolute w-full cursor-pointer">
                            {useCase.title}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="mt-10 w-full max-w-md dark:text-white font-semibold"
              //   disabled={!form.formState.isValid}
              type="submit"
            >
              Continue
              <ArrowRight width={18} height={18} />
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
