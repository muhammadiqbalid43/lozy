"use client";

import {
  Action,
  ActionType,
  OnboardingFormContext,
  OnboardingFormReducer,
  UseCase,
} from "@/types/onboarding";
import { Session } from "next-auth";
import React, { createContext, useContext, useReducer } from "react";

export const onBoardingFormContext =
  createContext<OnboardingFormContext | null>(null);

function onBoardingFormReducer(state: OnboardingFormReducer, action: Action) {
  const { type, payload } = action;

  switch (type) {
    case ActionType.CHANGE_SITE: {
      return {
        ...state,
        currentStep: payload as 1 | 2 | 3,
      };
    }

    case ActionType.NAME:
      return {
        ...state,
        name: payload as string,
      };

    case ActionType.USECASE:
      return {
        ...state,
        useCase: payload as UseCase,
      };
    default:
      return state;
  }
}

interface Props {
  children: React.ReactNode;
  session: Session;
}

const initialFormState: OnboardingFormReducer = {
  currentStep: 1,
  name: null,
  profileImage: null,
  useCase: null,
  workspaceName: "",
  workspaceImage: null,
};

export const OnboardingFormProvider = ({ children, session }: Props) => {
  const [state, dispatch] = useReducer(onBoardingFormReducer, {
    ...initialFormState,
    name: session.user.name,
    profileImage: session.user.image,
  });

  return (
    <onBoardingFormContext.Provider value={{ ...state, dispatch }}>
      {children}
    </onBoardingFormContext.Provider>
  );
};

export const useOnboardingForm = () => {
  const context = useContext(onBoardingFormContext);
  if (!context) throw new Error("invalid use");

  return context;
};
