import { createContext, useState } from 'react';

export const StepperContext = createContext<any>({});
export function Example({ children }: any) {
  const [activeStep, setActiveStep] = useState<any>(0);
  const [isLastStep, setIsLastStep] = useState<any>(false);
  const [isFirstStep, setIsFirstStep] = useState<any>(false);

  return (
    <StepperContext.Provider
      value={{
        activeStep,
        setActiveStep,
        setIsLastStep,
        setIsFirstStep,
        isFirstStep,
        isLastStep,
      }}
    >
      {children}
    </StepperContext.Provider>
  );
}
