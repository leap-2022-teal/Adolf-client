import { createContext, useContext, useState } from 'react';
import { Stepper, Step, Button } from '@material-tailwind/react';
import { StepperContext } from '@/context/StepperContext';
import AppContext from '@/context/AppContext';
import { BsCheckLg } from 'react-icons/bs';
import { FaCarSide } from 'react-icons/fa';
export default function StepperComponents() {
  const text = useContext<any>(AppContext);

  return (
    <div className="w-full py-4 px-8">
      <Stepper
        activeStep={text?.activeStep}
        isLastStep={(e) => text?.setIsLastStep(e)}
        isFirstStep={(e) => text?.setIsFirstStep(e)}
      >
        <Step>
          {text?.activeStep === 0 ? <FaCarSide className="w-5 h-5" /> : 1}
        </Step>
        <Step>
          {text?.activeStep === 1 ? <FaCarSide className="w-5 h-5" /> : 2}
        </Step>
        <Step>
          {text?.activeStep === 2 ? <FaCarSide className="w-5 h-5" /> : 3}
        </Step>
        <Step>
          {text?.activeStep === 3 ? <FaCarSide className="w-5 h-5" /> : 4}
        </Step>
        <Step>
          {text?.activeStep === 4 ? <FaCarSide className="w-5 h-5" /> : 5}
        </Step>
        <Step className="active:bg-green-400">
          <BsCheckLg className="w-5 h-5" />
        </Step>
      </Stepper>
    </div>
  );
}
