import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useContext, useState } from 'react';
import AppContext from '@/context/AppContext';
import { OrderProvider } from '@/context/orderProvider';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { UserProvider } from '@/context/userProvider';
export default function App({ Component, pageProps }: AppProps) {
  function Greeting() {
    <div>
      <strong>Hello </strong>
    </div>;
  }
  // const { userPhoneNumber } = useContext<any>(UserProfileContext);
  const [phone, setPhone] = useState('');
  const [activeStep, setActiveStep] = useState<any>(0);
  const [isLastStep, setIsLastStep] = useState<any>(false);
  const [isFirstStep, setIsFirstStep] = useState<any>(false);
  const [isHomeStep, setIsHomeStep] = useState<any>(false);
  const handleNext = () => !isLastStep && setActiveStep((cur: any) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur: any) => cur - 1);
  const handleHome = () =>
    !isHomeStep && setActiveStep((cur: any) => isFirstStep * 0);

  return (
    <>
      <AppContext.Provider
        value={{
          phone,
          setPhone,
          activeStep,
          setActiveStep,
          isFirstStep,
          isLastStep,
          setIsFirstStep,
          setIsLastStep,
          handleNext,
          handlePrev,
          handleHome,
        }}
      >
        <UserProvider>
          <RecoilRoot>
            <OrderProvider>
              <Component {...pageProps} />
            </OrderProvider>
          </RecoilRoot>
        </UserProvider>
      </AppContext.Provider>
    </>
  );
}
