import { createContext, useContext, useState } from 'react';
import { Stepper, Step, Button } from '@material-tailwind/react';
import { StepperContext } from '@/context/StepperContext';
import AppContext from '@/context/AppContext';
export default function StepperComponents() {
  const text = useContext<any>(AppContext);

  return (
    <div className="w-full py-4 px-8">
      <Stepper
        activeStep={text?.activeStep}
        isLastStep={(e) => text?.setIsLastStep(e)}
        isFirstStep={(e) => text?.setIsFirstStep(e)}
      >
        <Step onClick={() => text?.setActiveStep(0)}>1</Step>
        <Step onClick={() => text?.setActiveStep(1)}>2</Step>
        <Step onClick={() => text?.setActiveStep(2)}>3</Step>
        <Step onClick={() => text?.setActiveStep(3)}>4</Step>
        <Step onClick={() => text?.setActiveStep(5)}>5</Step>
      </Stepper>
    </div>
  );
}
