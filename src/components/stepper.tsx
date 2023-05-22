import { createContext, useContext, useState } from 'react';
import { Stepper, Step, Button } from '@material-tailwind/react';
import { StepperContext } from '@/context/StepperContext';
import AppContext from '@/context/AppContext';
import { BsCheckLg } from 'react-icons/bs';
export default function StepperComponents() {
  const text = useContext<any>(AppContext);

  return (
    <div className="w-full py-4 px-8">
      <Stepper
        activeStep={text?.activeStep}
        isLastStep={(e) => text?.setIsLastStep(e)}
        isFirstStep={(e) => text?.setIsFirstStep(e)}
      >
        <Step>1</Step>
        <Step>2</Step>
        <Step>3</Step>
        <Step>4</Step>
        <Step>5</Step>
        <Step className="active:bg-green-400">
          <BsCheckLg className="w-5 h-5" />
        </Step>
      </Stepper>
    </div>
  );
}
