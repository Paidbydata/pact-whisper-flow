import { useOnboardingStore } from '@/store/useOnboardingStore';
import { WizardLayout } from '@/components/WizardLayout';
import { Step1AlphaEntry } from '@/components/steps/Step1AlphaEntry';
import { Step2LeadCapture } from '@/components/steps/Step2LeadCapture';
import { Step3Verification } from '@/components/steps/Step3Verification';
import { Step4Consent } from '@/components/steps/Step4Consent';
import { Step5Upload } from '@/components/steps/Step5Upload';
import { Step6Success } from '@/components/steps/Step6Success';

const Index = () => {
  const { currentStep } = useOnboardingStore();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1AlphaEntry />;
      case 2:
        return <Step2LeadCapture />;
      case 3:
        return <Step3Verification />;
      case 4:
        return <Step4Consent />;
      case 5:
        return <Step5Upload />;
      case 6:
        return <Step6Success />;
      default:
        return <Step1AlphaEntry />;
    }
  };

  return (
    <WizardLayout>
      {renderStep()}
    </WizardLayout>
  );
};

export default Index;
